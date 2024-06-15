import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema(
  {
    title: {
      type: String,
      requried: true,
    },
    description: {
      type: String,
      requried: true,
    },
    status: {
      type: String,
      requried: true,
    },
    slug: {
      type: String,
      requried: true,
    },
    course: {
      type: String,
      requried: true,
    },
    lessonIds: {
      type: [String],
      requried: true,
    },
    duration: {
      type: Number,
      requried: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Module =
  mongoose.models?.Module ?? mongoose.model("Module", moduleSchema);
