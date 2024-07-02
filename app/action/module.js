"use server";

import { replaceMongoIdInObject } from "@/lib/convertData";
import { Course } from "@/models/course-model";
import { Lesson } from "@/models/lession-model";
import { Module } from "@/models/module-models";
import { created } from "@/quries/modules";

export const createModule = async (data) => {
  try {
    const title = data.get("title");
    const slug = data.get("slug");
    const courseId = data.get("courseId");
    const order = data.get("order");

    const moduleCreated = await created({
      title,
      slug,
      course: courseId,
      order,
    });

    const course = await Course.findById(courseId);

    // push the moduleCreated id in course => modules array
    course?.modules.push(moduleCreated?._id);

    course.save();
  } catch (error) {
    throw new Error(error);
  }
};

export const reOrderModules = async (data) => {
  console.log(data);
  try {
    await Promise.all(
      data?.map(async (ele) => {
        await Module.findByIdAndUpdate(ele.id, {
          order: ele.position,
        });
      })
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const getModule = async (moduleId) => {
  try {
    const moduleDetails = await Module.findById(moduleId)
      .populate({
        path: "lessonIds",
        modell: Lesson,
      })
      .lean();
    return replaceMongoIdInObject(moduleDetails);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateModule = async (moduleId, data) => {
  try {
    const title = data.get("title");
    const slug = data.get("slug");
    await Module.findByIdAndUpdate(moduleId, {
      title,
      slug,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
