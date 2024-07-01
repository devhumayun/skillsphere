import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema(
  {
    title: {
      type: String,
      requried: true,
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
      requried: true,
    },
    slug: {
      type: String,
      requried: true,
    },
    course: {
      type: Schema.ObjectId,
      requried: true,
    },
    lessonIds: {
      type: [Schema.ObjectId],
    },
    duration: {
      type: Number,
    },
    order: {
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
