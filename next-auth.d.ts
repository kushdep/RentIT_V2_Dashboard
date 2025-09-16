// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    sessionToken?: string; // your custom property
  }

  interface User {
    id?: string; // if you want to add custom user fields
  }

  interface JWT {
    accessToken?: string; // for JWT callback
  }
}