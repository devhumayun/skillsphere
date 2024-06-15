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
      requried: false,
    },
    role: {
      type: String,
      requried: true,
    },
    bio: {
      type: String,
      requried: false,
    },
    profilePicture: {
      type: String,
      requried: false,
    },
    socialMedia: {
      type: Object,
      requried: false,
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
