import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/models/lession-model";
import { dbConnect } from "@/services/mongo";

export const getLesson = async (lessionId) => {
  dbConnect();
  const lessons = await Lesson.findById(lessionId).lean();

  return replaceMongoIdInObject(lessons);
};

export const created = async (lessonData) => {
  try {
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
