import { replaceMongoIdInArray } from "@/lib/convertData";
import { Course } from "@/models/course-model";
import { Enrollment } from "@/models/enrollment-model";
import { dbConnect } from "@/services/mongo";

export const getEnrollmentForCourse = async (courseId) => {
  await dbConnect();
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
};

export const getLoggedInUserAllEnrollments = async (userId) => {
  await dbConnect();
  const enrollments = await Enrollment.find({ student: userId })
    .populate({
      path: "course",
      model: Course,
    })
    .lean();
  return replaceMongoIdInArray(enrollments);
};

export const enrollInCourse = async (courseId, userId, paymentMethod) => {
  const newData = {
    status: "not-started",
    enrollmentDate: Date.now(),
    method: paymentMethod,
    course: courseId,
    student: userId,
  };

  try {
    const res = await Enrollment.create(newData);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
