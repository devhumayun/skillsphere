import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Module } from "@/models/module-models";
import { Testimonial } from "@/models/testimonial-model";

import { Lesson } from "@/models/lession-model";
import { Quizset } from "@/models/quizset-model";
import { Quiz } from "@/models/quizzes-model";
import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import { getEnrollmentForCourse } from "./enrollments";
import { getTestimonialForCourse } from "./testimonials";

export const getCourseList = async () => {
  await dbConnect();
  const courses = await Course.find({ active: true })
    .select([
      "title",
      "subtitle",
      "price",
      "category",
      "instructor",
      "modules",
      "testimonials",
      "thumbnail",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .lean();

  return replaceMongoIdInArray(courses);
};

export const getCourseDetails = async (id) => {
  await dbConnect();
  const course = await Course.findById(id)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "modules",
      model: Module,
      populate: {
        path: "lessonIds",
        model: Lesson,
      },
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: "User",
      },
    })
    .populate({
      path: "quizSet",
      model: Quizset,
      populate: {
        path: "quizIds",
        model: Quiz,
      },
    })
    .lean();

  return replaceMongoIdInObject(course);
};

export const getCourseDetailsByInstructor = async (instructorId, expand) => {
  await dbConnect();
  const publishedCourse = await Course.find({
    instructor: instructorId,
    active: true,
  }).lean();

  // calculate total Instructor course's enrollments
  const enrollments = await Promise.all(
    publishedCourse?.map(async (course) => {
      const enrollment = await getEnrollmentForCourse(course._id.toString());
      return enrollment;
    })
  );

  const groupByCourse = Object.groupBy(
    enrollments.flat(),
    ({ course }) => course
  );

  const totalRevenue = publishedCourse.reduce((acc, course) => {
    const quantity = groupByCourse[course._id]
      ? acc + groupByCourse[course._id].length
      : 0;
    return acc + quantity * course?.price;
  }, 0);

  const totalEnrollment = enrollments.reduce((acc, obj) => {
    return acc + obj.length;
  }, 0);

  // calculate total courses rating and review
  const testimonials = await Promise.all(
    publishedCourse?.map(async (course) => {
      const testimonial = await getTestimonialForCourse(course?._id.toString());
      return testimonial;
    })
  );
  const totalTestimonials = testimonials.flat();
  const avgRating =
    totalTestimonials.reduce((acc, obj) => {
      return acc + obj.rating;
    }, 0) / totalTestimonials.length;

  if (expand) {
    const allCourses = await Course.find({ instructor: instructorId }).lean();
    return {
      course: allCourses.flat(),
      enrollments: enrollments.flat(),
      reviews: totalTestimonials,
    };
  }

  return {
    course: publishedCourse.length,
    enrollments: totalEnrollment,
    reviews: totalTestimonials.length,
    rating: avgRating.toPrecision(2),
    revenue: totalRevenue,
  };
};

export const created = async (courseData) => {
  try {
    await dbConnect();
    const course = await Course.create(courseData);
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    throw new Error(error.message);
  }
};
