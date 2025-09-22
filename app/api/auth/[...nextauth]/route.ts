"use server";

import { cookies } from "next/headers";
import User from "@/models/user";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;

      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get("sessionToken");
      if (sessionCookie !== undefined && sessionCookie !== null) {
        cookieStore.delete("sessionToken");
      }

      const userDoc = await User.findOne({ email: user.email });
      if (!userDoc) {
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return "/dashboard";
    },
  },
});



export { handler as GET, handler as POST };
