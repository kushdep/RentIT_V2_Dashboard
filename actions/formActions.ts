"use server";

import { AuthResponse } from "./../dataInterfaces";
import { Login } from "@/controllers/authController";
import { LoginFormStt } from "@/dataInterfaces";


export async function loginBridge(
  loginData: LoginFormStt
): Promise<AuthResponse> {
  const res: AuthResponse = await Login({
    email: loginData.email,
    password: loginData.password,
  });
  return res;
}
