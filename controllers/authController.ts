import "server-only";

import { AuthResponse, IUserIfc, JwtTokenVrfType } from "./../dataInterfaces";
import { LoginFormStt } from "../dataInterfaces";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import { cookies } from "next/headers";

export async function getCookieToken(): Promise<
  JwtTokenVrfType | null | undefined
> {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("sessionToken")?.value ??
      cookieStore.get("next-auth.session-token")?.value ??
      null;
    if (token === undefined || token === null) {
      return null;
    }
    const decoded = jwt.verify(
      token!,
      process.env.JWT_SECRET as string
    ) as JwtTokenVrfType;
    return decoded;
  } catch (error) {
    console.log("Error in getToken() " + error);
  }
}

export async function Login(body: LoginFormStt): Promise<AuthResponse> {
  try {
    const email = body.email;
    const password = body.password;

    const userDoc = await User.findOne({ email });

    console.log(userDoc);

    if (!userDoc) {
      return {
        success: false,
        message: "User do not exist",
      };
    }
    const user: IUserIfc = userDoc;
    console.log(user);
    if (!user.userType.propertier) {
      return {
        success: false,
        message: "Not a propertier (Unauthorized)",
      };
    }
    if ((user && user.password === undefined) || user.password === null) {
      return {
        success: false,
        message: "Login with Google Credentials",
      };
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return {
        success: false,
        message: "Email or password incorrect",
      };
    }

    return await tokenGen(String(user._id), email);
  } catch (error) {
    console.log("Error in Login " + error);
    return {
      success: false,
      message: "Error in Login",
    };
  }
}

export async function tokenGen(
  id: string,
  email: string
): Promise<AuthResponse> {
  try {
    const token = jwt.sign(
      { _id: id, email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    const cookieStore = await cookies();
    cookieStore.set("sessionToken", token, {
      httpOnly: true,
      maxAge: 24 * 3600,
    });

    return {
      success: true,
      message: "Successfully Authenticated",
    };
  } catch (error) {
    console.log("Error in Gemerating Token");
    return {
      success: false,
      message: "Error in Gemerating Token",
    };
  }
}

export async function LogOut(): Promise<AuthResponse> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sessionToken");

    if (sessionCookie !== undefined && sessionCookie !== null) {
      cookieStore.delete("sessionToken");
      return {
        success: true,
        message: "Logout Sucessfully",
      };
    }
    return {
      success: false,
      message: "Unable to Get Token",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unable to Logout",
    };
  }
}
