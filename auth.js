import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.Config";
import { User } from "./models/user-model";

export const {
  handlers: { GET, POST },
  signIn,
  auth,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("Invalid email!");
          } else {
            const isMatchPass = await bcrypt.compare(
              credentials?.password,
              user?.password
            );

            if (!isMatchPass) {
              throw new Error("Wrong Password!");
            } else {
              return user;
            }
          }
        } catch (error) {
          console.log(error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
});
