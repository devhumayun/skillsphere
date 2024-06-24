import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";

export async function updateUserInfo(email, updatedData) {
  try {
    await dbConnect();

    const filter = { email: email };
    const update = { $set: updatedData };
    await User.findOneAndUpdate(filter, update, { new: true });
  } catch (error) {
    throw new Error(error);
  }
}
