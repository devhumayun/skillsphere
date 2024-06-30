import { auth } from "@/auth";
import { getUserByEmail } from "@/quries/user";
import "server-only";

export const getLoggedInUser = async () => {
  try {
    const session = await auth();

    if (!session?.user) return null;

    return getUserByEmail(session?.user?.email);
  } catch (error) {
    throw new Error(error);
  }
};
