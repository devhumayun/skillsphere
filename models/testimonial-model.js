import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema(
  {
    content: {
      type: String,
      requried: true,
    },
    rating: {
      type: Number,
      requried: true,
    },
    courseId: {
      type: String,
      requried: true,
    },
    user: {
      type: String,
      requried: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Testimonial =
  mongoose.models?.Testimonial ??
  mongoose.model("Testimonial", testimonialSchema);
