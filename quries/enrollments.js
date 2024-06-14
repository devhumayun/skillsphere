import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "@/models/enrollment-model";

export const getEnrollmentForCourse = async (courseId) => {
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
};
