"use server";

import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateUserInfo(email, updatedData) {
  try {
    await dbConnect();
    const filter = { email: email };
    const update = { $set: updatedData };
    await User.findOneAndUpdate(filter, update, { new: true });

    revalidatePath("/account");
  } catch (error) {
    throw new Error(error);
  }
}

export const updateProfilePhoto = async (email, profileData) => {
  try {
    await dbConnect();
    const filter = { email: email };
    await User.findOneAndUpdate(
      filter,
      {
        image: profileData,
      },
      { new: true }
    );
    revalidatePath("/");
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserPassword = async (email, passwordData) => {
  try {
    await dbConnect();
    const { oldPassword, newPassword } = passwordData;

    const filter = { email: email };
    const user = await User.findOne(filter).lean();

    const hashPassword = await bcrypt.hash(newPassword, 5);

    if (oldPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        throw new Error("Please type your old valid password!");
      }
    }

    const dataToUpdate = {
      password: hashPassword,
    };

    await User.findOneAndUpdate(filter, dataToUpdate);
    revalidatePath("/account");
  } catch (error) {
    throw new Error(error.message);
  }
};
