"use server";

import { signIn } from "@/auth";

export const credentailsLogin = async (formData) => {
  try {
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
  const action = formData.get("action");

  await signIn(action, { redirectTo: "/courses" });
};
