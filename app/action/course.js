"use server";
import { created } from "@/quries/course";
import { dbConnect } from "@/services/mongo";

export const createCourse = async (data) => {
  try {
    await dbConnect();
    console.log("Data before creating course:", data);
    const course = await created(data);

    console.log("Course created:", course);

    return course;
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error(error);
  }
};
