"use server";

import { AuthResponse } from "../dataInterfaces";
import { Login, LogOut } from "@/controllers/authController";
import { LoginFormStt } from "@/dataInterfaces";


export async function loginBridge(
  loginData: LoginFormStt
): Promise<AuthResponse> {
  try {
    const res: AuthResponse = await Login({
      email: loginData.email,
      password: loginData.password,
    });
    return res;
  } catch (error) {
    console.log(error)
    return {
      success:false,
      message:'Error in LogIn Bridge'
    }
  }
}

export async function logoutBridge(): Promise<AuthResponse> {
  try{
  const res: AuthResponse = await LogOut();
  return res;
  } catch (error) {
    console.log(error)
    return {
      success:false,
      message:'Error in LogOut Bridge'
    }
  }
}




