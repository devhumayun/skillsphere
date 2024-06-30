import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
  enrollmentDate: {
    type: Date,
    requried: false,
  },
  status: {
    type: String,
    requried: true,
  },
  completionDate: {
    type: Date,
    requried: false,
  },
  method: {
    type: String,
    requried: true,
  },
  course: {
    type: Schema.ObjectId,
    ref: "Course",
  },
  student: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

export const Enrollment =
  mongoose.models?.Enrollment ?? mongoose.model("Enrollment", enrollmentSchema);
