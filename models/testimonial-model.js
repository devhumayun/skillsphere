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
      type: Schema.ObjectId,
      ref: "Course",
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Testimonial =
  mongoose.models?.Testimonial ??
  mongoose.model("Testimonial", testimonialSchema);
