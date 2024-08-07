import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/models/lession-model";
import { dbConnect } from "@/services/mongo";

export const getLesson = async (lessionId) => {
  try {
    dbConnect();
    const lessons = await Lesson.findById(lessionId).lean();

    return replaceMongoIdInObject(lessons);
  } catch (error) {
    throw new Error(error);
  }
};

export const created = async (lessonData) => {
  try {
    await dbConnect();
    const existingLesson = await Lesson.findOne({ slug: lessonData?.slug });
    if (existingLesson) {
      throw new Error("This lesson already exists");
    }

    const lesson = await Lesson.create(lessonData);

    return JSON.parse(JSON.stringify(lesson));
  } catch (error) {
    throw new Error(error);
  }
};

export const getLessonBySlug = async (slug) => {
  try {
    await dbConnect();
    const lesson = await Lesson.findOne({ slug: slug }).lean();

    return replaceMongoIdInObject(lesson);
  } catch (error) {
    throw new Error(error);
  }
};
