import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { firstName, lastName, email, password, userRole } =
    await request.json();

  console.log(firstName, lastName, email, password, userRole);

  await dbConnect();
  const hashPass = await bcrypt.hash(password, 5);

  const newUser = {
    firstName,
    lastName,
    email,
    password: hashPass,
    role: userRole,
  };

  console.log(newUser);

  try {
    const user = await User.create(newUser);

    console.log(user);

    return new NextResponse("User created successfull", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
