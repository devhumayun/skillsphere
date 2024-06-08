import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      requried: true,
    },
    description: {
      type: String,
      requried: true,
    },
    thumbnail: {
      type: String,
      requried: true,
    },
    price: {
      type: Number,
      requried: true,
    },
    active: {
      type: Boolean,
      requried: true,
    },
    modules: [
      {
        type: Schema.ObjectId,
        ref: "Module",
      },
    ],
    category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    instructor: {
      type: Schema.ObjectId,
      ref: "User",
    },
    testimonials: [
      {
        type: Schema.ObjectId,
        ref: "Testimonial",
      },
    ],

    quizSet: {
      type: Schema.ObjectId,
      requried: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Course =
  mongoose.models?.Course ?? mongoose.model("Course", courseSchema);
