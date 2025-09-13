import { AuthResponse, LoginFormStt } from "../dataInterfaces";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User, { IUser } from "../models/user";

export async function Login(body: LoginFormStt): Promise<AuthResponse> {
  try {
    const email= body.email as string;
    const password= body.password as string;
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return {
        success: false,
        message: "User do not exist",
      };
    } 
    const user:IUser = userDoc

    const validPassword = await bcrypt.compare(password, user.password as string)
    if (!validPassword) {
        return  {
            success: false,
            message: 'Email or password incorrect'
        }
    }
    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET as string, { expiresIn: '7d' })
    return {
        success:true,
        message:'Successfully Authenticated',
        token
    }
} catch (error) {
    console.log("Error in Login " + error);
    return {
        success:false,
        message:'Error in Login'
    }
  }
}
