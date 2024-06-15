import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "@/models/enrollment-model";
import { dbConnect } from "@/services/mongo";

export const getEnrollmentForCourse = async (courseId) => {
  await dbConnect();
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
};
