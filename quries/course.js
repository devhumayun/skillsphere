import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Module } from "@/models/module-models";
import { Testimonial } from "@/models/testimonial-model";

import { User } from "@/models/user-model";

export const getCourseList = async () => {
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
