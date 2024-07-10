import mongoose, { Schema } from "mongoose";

const watchSchema = new Schema({
  state: {
    required: true,
    type: String,
    default: "started",
  },

  created_at: {
    required: false,
    type: Date,
  },

  modified_at: {
    required: false,
    type: Date,
  },

  lastTime: {
    type: Number,
    default: 0,
  },

  lesson: { type: Schema.ObjectId, ref: "Lesson" },
  user: { type: Schema.ObjectId, ref: "User" },
  module: { type: Schema.ObjectId, ref: "Module" },
});

export const Watch =
  mongoose.models.Watch ?? mongoose.model("Watch", watchSchema);
