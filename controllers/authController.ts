"use server";

import { AuthResponse, LoginFormStt } from "../dataInterfaces";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user";

export async function Login(body: LoginFormStt): Promise<AuthResponse> {
  try {
    const email = body.email as string;
    const password = body.password as string;

    const userDoc = await User.findOne({ email });

    console.log(userDoc);

    if (!userDoc) {
      return {
        success: false,
        message: "User do not exist",
      };
    }
    const user: IUser = userDoc;
    console.log(user);
    if(!user.userType.propertier){
      return{
        success:false,
        message:'Not a propertier (Unauthorized)'
      }
    }
    const validPassword = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!validPassword) {
      return {
        success: false,
        message: "Email or password incorrect",
      };
    }
    const token = jwt.sign(
      { _id: user._id, email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    console.log(token);
    return {
      success: true,
      message: "Successfully Authenticated",
      token,
    };
  } catch (error) {
    console.log("Error in Login " + error);
    return {
      success: false,
      message: "Error in Login",
    };
  }
}
