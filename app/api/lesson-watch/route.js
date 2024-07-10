import { getLoggedInUser } from "@/lib/loggedInUser";
import { Watch } from "@/models/watch-model";
import { getLesson } from "@/quries/lession";
import { getModuleBySlug } from "@/quries/modules";
import { NextResponse } from "next/server";

const STARTED = "started";
const COMPLETED = "completed";

export async function POST(request) {
  const { courseId, moduleSlug, lessonId, state, lastTime } =
    await request.json();
  const loggedInUser = await getLoggedInUser();
  const lesson = await getLesson(lessonId);
  const moduled = await getModuleBySlug(moduleSlug);

  console.log(loggedInUser);

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
      } else {
        if (found.state === STARTED) {
          watchEntry["modified_at"] = Date.now();
          await Watch.findByIdAndUpdate(found._id, {
            state: COMPLETED,
          });
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

  // try {
  //   const found = await Watch.findOne({
  //     user: loggedInUser.id,
  //     lesson: lesson.id,
  //     module: moduled.id,
  //   }).lean();

  //   if (state === STARTED) {
  //     if (!found) {
  //       watchEntry["created_at"] = Date.now();
  //       await Watch.create(watchEntry);
  //     }
  //   } else if (state === COMPLETED) {
  //     if (!found) {
  //       watchEntry["created_at"] = Date.now();
  //       await Watch.create(watchEntry);
  //     } else {
  //       if (state === STARTED) {
  //         watchEntry["modified_at"] = Date.now();
  //         console.log("completed process...");
  //         await Watch.findByIdAndUpdate(found._id, {
  //           state: COMPLETED,
  //         });
  //       }
  //     }
  //   }

  //   return new NextResponse("Watch record updated successfully.", {
  //     status: 200,
  //   });
  // } catch (error) {
  //   return NextResponse(error, {
  //     status: 500,
  //   });
  // }
}
