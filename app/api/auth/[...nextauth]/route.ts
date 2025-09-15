"use server";

import { tokenGen } from "@/controllers/authController";
import User, { IUser } from "@/models/user";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;

      const userDoc = await User.findOne({ email: user.email });
      if (!userDoc) {
        return false;
      }
      const exsUser = userDoc as any;

      const res = await tokenGen(exsUser._id as string, user.email);
      return res.success;
    },
  },
});

export { handler as GET, handler as POST };
