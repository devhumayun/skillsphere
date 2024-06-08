import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export const Category =
  mongoose.models?.Category ?? mongoose.model("Category", categorySchema);
