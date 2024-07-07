import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
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

  learning: {
    type: [String],
  },
  quizSet: { type: Schema.ObjectId, ref: "Quizset" },
  createdOn: {
    required: true,
    default: Date.now(),
    type: Date,
  },

  modifiedOn: {
    required: true,
    default: Date.now(),
    type: Date,
  },
});

export const Course =
  mongoose.models?.Course ?? mongoose.model("Course", courseSchema);
