import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";

export const getUserByEmail = async (email) => {
  try {
    await dbConnect();

    const user = await User?.findOne({ email: email }).lean();

    return replaceMongoIdInObject(user);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserById = async (userId) => {
  try {
    await dbConnect();
    const user = await User?.findById(userId).select("-password").lean();
    return replaceMongoIdInObject(user);
  } catch (error) {
    throw new Error(error);
  }
};
