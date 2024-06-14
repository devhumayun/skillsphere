import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      requried: true,
    },
    lastName: {
      type: String,
      requried: true,
    },
    password: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      requried: true,
    },
    phone: {
      type: String,
      requried: true,
    },
    role: {
      type: String,
      requried: true,
    },
    bio: {
      type: String,
      requried: true,
    },
    profilePicture: {
      type: String,
      requried: true,
    },
    socialMedia: {
      type: Object,
      requried: true,
    },
    designation: {
      required: false,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models?.User ?? mongoose.model("User", userSchema);
