"use server";

import { signIn } from "@/auth";
import { dbConnect } from "@/services/mongo";

export const credentailsLogin = async (formData) => {
  try {
    await dbConnect();
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const doSocialLogin = async (formData) => {
  await dbConnect();
  const action = formData.get("action");

  await signIn(action, { redirectTo: "/courses" });
};
