import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/models/lession-model";

export const getLesson = async (lessionId) => {
  const lessons = await Lesson.findById(lessionId).lean();

  return replaceMongoIdInObject(lessons);
};
