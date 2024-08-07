import { getLoggedInUser } from "@/lib/loggedInUser";
import { Watch } from "@/models/watch-model";
import { getLesson } from "@/quries/lession";
import { getModuleBySlug } from "@/quries/modules";
import { createAReport } from "@/quries/report";
import { dbConnect } from "@/services/mongo";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const STARTED = "started";
const COMPLETED = "completed";

async function updateReport(courseId, userId, lessonId, moduleId) {
  try {
    await dbConnect();
    await createAReport({ courseId, userId, lessonId, moduleId });
  } catch (error) {
    throw new Error(error);
  }
}

export async function POST(request) {
  await dbConnect();
  const { courseId, moduleSlug, lessonId, state, lastTime } =
    await request.json();
  const loggedInUser = await getLoggedInUser();
  const lesson = await getLesson(lessonId);
  const moduled = await getModuleBySlug(moduleSlug);

  if (!loggedInUser) {
    return NextResponse("You are not authenticated!", {
      status: 401,
    });
  }

  if (STARTED !== state && COMPLETED == !state) {
    return NextResponse("Invalid type, we can not move forward", {
      status: 500,
    });
  }

  if (!lesson) {
    return NextResponse("Invalid lesson, we can not move forward", {
      status: 500,
    });
  }

  const watchEntry = {
    lastTime,
    state,
    lesson: lesson.id,
    user: loggedInUser.id,
    module: moduled.id,
  };

  try {
    const found = await Watch.findOne({
      lesson: lessonId,
      module: moduled.id,
      user: loggedInUser.id,
    }).lean();

    if (state === STARTED) {
      if (!found) {
        watchEntry["created_at"] = Date.now();
        await Watch.create(watchEntry);
      }
    } else if (state === COMPLETED) {
      if (!found) {
        watchEntry["created_at"] = Date.now();
        await Watch.create(watchEntry);
        await updateReport(courseId, loggedInUser.id, lesson.id, moduled.id);
      } else {
        if (found.state === STARTED) {
          watchEntry["modified_at"] = Date.now();
          await Watch.findByIdAndUpdate(found._id, {
            state: COMPLETED,
          });
          await updateReport(courseId, loggedInUser.id, lesson.id, moduled.id);
        }
      }
    }
    return new NextResponse("Watch Record added Successfully.", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
