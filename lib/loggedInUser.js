import { auth } from "@/auth";
import { getUserByEmail } from "@/quries/user";
import { dbConnect } from "@/services/mongo";
import "server-only";

export const getLoggedInUser = async () => {
  try {
    await dbConnect();
    const session = await auth();

    if (!session?.user) return null;

    return getUserByEmail(session?.user?.email);
  } catch (error) {
    throw new Error(error);
  }
};
