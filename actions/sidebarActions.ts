'use server'

import { getCookieToken } from "@/controllers/authController";
import { AuthResponse } from "@/dataInterfaces";
import User from "../models/user";

export const getNotification = async (): Promise<AuthResponse> => {
  try {
    const decoded = await getCookieToken();
    console.log(decoded)
    if (decoded === undefined || decoded === null) {
      return {
        success: false,
        message: "User token issue",
      };
    }
    let query = decoded._id ? { _id: decoded._id } : { email: decoded.email };
    const user = await User.findOne(query);
    console.log(user)
    console.log(user.notifications)
    if(!user){
        return {
            success:false,
            message:'UnAuthorized'
        }
    }
    const len = user.notifications.length
    console.log(len)
    return {
      success: true,
      message: "New Notification",
      payload:len||0
    };
  } catch (error) {
    console.log("Error in getNotification" + error);
    return {
      success: false,
      message: "Error while getting Notifications",
    };
  }
};
