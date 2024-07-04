"use server";

import { Lesson } from "@/models/lession-model";
import { Module } from "@/models/module-models";
import { created } from "@/quries/lession";

export const createLesson = async (data) => {
  try {
    const title = data.get("title");
    const slug = data.get("slug");
    const order = data.get("order");
    const moduleId = data.get("moduleId");

    const createdLesson = await created({ title, slug, order });

    // get the module for pushing lession id in modules' lessonIds array
    const moduled = await Module.findById(moduleId);

    moduled?.lessonIds?.push(createdLesson?._id);

    moduled.save();
    return createdLesson;
  } catch (error) {
    throw new Error(error);
  }
};

// Lesson Re orderd
export const reOrderLesson = async (data) => {
  try {
    await Promise.all(
      data?.map(
        async (ele) =>
          await Lesson.findByIdAndUpdate(ele.id, {
            order: ele.position,
          })
      )
    );
  } catch (error) {
    throw new Error(error);
  }
};

// update lesson
export const updateCourseLesson = async (lessonId, data) => {
  try {
    await Lesson.findByIdAndUpdate(lessonId, data);
  } catch (error) {
    throw new Error(error);
  }
};

// update lesson status published or unpublished
export const updateLessonStatus = async (lessonId) => {
  try {
    const lesson = await Lesson.findById(lessonId);

    const res = await Lesson.findByIdAndUpdate(
      lessonId,
      {
        active: !lesson?.active,
      },
      { lean: true }
    );

    return res.active;
  } catch (error) {
    throw new Error(error);
  }
};

// delete lesson
export const deleteLesson = async (lessonId, moduleId) => {
  try {
    const modules = await Module.findById(moduleId);
    modules?.lessonIds.pull(lessonId);

    await Lesson.findByIdAndDelete(lessonId);

    modules?.save();
  } catch (error) {
    throw new Error(error);
  }
};
