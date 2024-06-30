import { courseUpdate } from "@/app/action/course";
import fs from "fs";
import { NextResponse } from "next/server";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);

export async function POST(request, response) {
  try {
    const formData = await request.formData();

    const file = formData.get("files");
    const destination = formData.get("destination");
    const courseId = formData.get("courseId");

    if (!destination) {
      return new NextResponse("Destination not shown", {
        status: 500,
      });
    }

    const filePath = `${destination}/${file.name}`;

    await pump(file.stream(), fs.createWriteStream(filePath));

    await courseUpdate(courseId, { thumbnail: file?.name });

    return new NextResponse(`File ${file.name} uploaded`, {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
