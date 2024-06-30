"use server";
import { getLoggedInUser } from "@/lib/loggedInUser";
import { Course } from "@/models/course-model";
import { created } from "@/quries/course";
import { dbConnect } from "@/services/mongo";

export const createCourse = async (data) => {
  try {
    await dbConnect();

    // get instructor for integrating instructor id while creating new course
    const instructor = await getLoggedInUser();
    data["instructor"] = instructor?.id;

    const course = await created(data);

    return course;
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error(error);
  }
};

export const courseUpdate = async (courseId, updatedValue) => {
  try {
    const updatedData = await Course.findByIdAndUpdate(courseId, updatedValue, {
      new: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};
