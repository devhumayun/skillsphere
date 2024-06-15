import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Module } from "@/models/module-models";
import { Testimonial } from "@/models/testimonial-model";

import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import { getEnrollmentForCourse } from "./enrollments";
import { getTestimonialForCourse } from "./testimonials";

export const getCourseList = async () => {
  await dbConnect();
  const courses = await Course.find({})
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
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: "User",
      },
    })
    .lean();

  return replaceMongoIdInObject(course);
};

export const getCourseDetailsByInstructor = async (instructorId) => {
  await dbConnect();
  const courses = await Course.find({ instructor: instructorId }).lean();

  // calculate total Instructor course's enrollments
  const enrollments = await Promise.all(
    courses?.map(async (course) => {
      const enrollment = await getEnrollmentForCourse(course._id.toString());
      return enrollment;
    })
  );
  const totalEnrollment = enrollments.reduce((item, currentValue) => {
    return item.length + currentValue.length;
  });

  // calculate total courses rating and review
  const testimonials = await Promise.all(
    courses?.map(async (course) => {
      const testimonial = await getTestimonialForCourse(course?._id.toString());
      return testimonial;
    })
  );
  const totalTestimonials = testimonials.flat();
  const avgRating =
    totalTestimonials.reduce((acc, obj) => {
      return acc + obj.rating;
    }, 0) / totalTestimonials.length;

  return {
    course: courses.length,
    enrollments: totalEnrollment,
    reviews: totalTestimonials.length,
    rating: avgRating.toPrecision(2),
  };
};
