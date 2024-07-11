import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.Config";
import { User } from "./models/user-model";
import mongoClientPromise from "./services/mongoClientPromise";

const refreshAccessToken = async (token) => {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token?.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshTokens = await response.json();

    if (!response.ok) {
      throw refreshTokens;
    }

    return {
      ...token,
      accessToken: refreshTokens?.access_token,
      accessTokenExpireIn: Date.now() + refreshTokens?.expires_in * 1000,
      refreshToken: refreshTokens?.refresh_token,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const {
  handlers: { GET, POST },
  signIn,
  auth,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.DATABASE_NAME,
  }),
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, account, user }) {
  //     if (account && user) {
  //       return {
  //         user,
  //         accessToken: account?.access_token,
  //         accessTokenExpireIn: Date.now() + account?.expires_in * 1000,
  //         refreshToken: account?.refresh_token,
  //       };
  //     }

  //     if (Date.now() < token?.accessTokenExpireIn) {
  //       return token;
  //     }

  //     return refreshAccessToken(token);
  //   },
  //   async session({ token, session }) {
  //     session.user = token?.user;
  //     (session.accessToken = token?.access_token),
  //       (session.error = token?.error);

  //     return session;
  //   },
  // },
  trustHost: true,
  // trustHostedDomain: true,
});
