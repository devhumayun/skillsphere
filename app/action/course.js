"use server";
import { getLoggedInUser } from "@/lib/loggedInUser";
import { Course } from "@/models/course-model";
import { created } from "@/quries/course";
import { dbConnect } from "@/services/mongo";
import mongoose from "mongoose";

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
    await dbConnect();
    const updatedData = await Course.findByIdAndUpdate(courseId, updatedValue, {
      new: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCourseStatus = async (courseId) => {
  try {
    await dbConnect();
    const course = await Course.findById(courseId);
    const res = await Course.findByIdAndUpdate(
      courseId,
      {
        active: !course?.active,
      },
      { lean: true }
    );

    return res.active;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCourse = async (courseId) => {
  try {
    await dbConnect();
    await Course.findByIdAndDelete(courseId);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateQuizIdForAcourse = async (courseId, data) => {
  try {
    await dbConnect();
    let payload = {};
    payload["quizSet"] = new mongoose.Types.ObjectId(data.quizSetId);

    console.log(payload);

    await Course.findByIdAndUpdate(courseId, payload);
  } catch (error) {
    throw new error(error);
  }
};
