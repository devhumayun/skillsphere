import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/models/user-model";

export const getUserByEmail = async (email) => {
  const user = await User?.findOne({ email: email }).lean();

  return replaceMongoIdInObject(user);
};
