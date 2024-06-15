import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/models/lession-model";
import { dbConnect } from "@/services/mongo";

export const getLesson = async (lessionId) => {
  dbConnect();
  const lessons = await Lesson.findById(lessionId).lean();

  return replaceMongoIdInObject(lessons);
};
