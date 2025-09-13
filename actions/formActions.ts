import { AuthResponse } from "./../dataInterfaces";
import { Login } from "@/controllers/authController";
import { LoginFormStt } from "@/dataInterfaces";
import { useRouter } from "next/router";

export async function submitLogin(
  prevState: LoginFormStt,
  formData: FormData
): Promise<LoginFormStt> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const route = useRouter();

  if (email === null || email === "" || password === null || password === "") {
    return {
      ...prevState,
      error: "Invalid Email or Password",
    };
  }

  if (
    (email !== null && email.trim() === "") ||
    (password !== null && password.trim() === "")
  ) {
    return {
      ...prevState,
      error: "Invalid Email or Password",
    };
  }

  const res: AuthResponse = await Login({ email, password });
  if (!res.success) {
    const { message } = res;
    return {
      email: "",
      password: "",
      error: message,
    };
  }
  route.push("/dashboard");
  return {
    email: "",
    password: "",
    error: "",
  };
}
