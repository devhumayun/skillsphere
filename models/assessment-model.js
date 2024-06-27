import mongoose, { Schema } from "mongoose";

const assessmentModel = new Schema(
  {
    assessments: {
      required: true,
      type: Array,
    },

    otherMarks: {
      required: false,
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Assessment =
  mongoose.models.Assessment ?? mongoose.model("Assessment", assessmentModel);
