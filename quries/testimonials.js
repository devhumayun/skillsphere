import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "@/models/testimonial-model";
import { dbConnect } from "@/services/mongo";

export const getTestimonialForCourse = async (courseId) => {
  await dbConnect();
  const testimonials = await Testimonial.find({
    courseId: courseId,
  }).lean();

  return replaceMongoIdInArray(testimonials);
};
