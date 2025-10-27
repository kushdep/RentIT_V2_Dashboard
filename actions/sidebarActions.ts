"use server";

import { NotificationType } from "./../dataInterfaces";
import { getCookieToken } from "@/controllers/authController";
import { AuthResponse } from "@/dataInterfaces";
import User from "../models/user";

export async function markNotiRead({noti}:{noti:string|string[]|[]}): Promise<AuthResponse> {
  try {
    const decoded = await getCookieToken();
    console.log(decoded);
    if (decoded === undefined || decoded === null) {
      return {
        success: false,
        message: "User token issue",
      };
    }
    let query: Record<string, any> = decoded._id ? { _id: decoded._id } : { email: decoded.email };
    const userDoc = await User.findOne(query)
    if(!userDoc){
      return {
        success: false,
        message: "Marking Notification as read failed",
      };
    }
    if(Array.isArray(noti)){
      
    }else{
    }
    query["new"] = true

    return {
      success: true,
      message: "Marking Notification As read",
    };
  } catch (error) {
    console.log("Error in getNotification" + error);
    return {
      success: false,
      message: "Error while getting Notifications",
    };
  }
}
export async function getNotification(): Promise<AuthResponse> {
  try {
    const decoded = await getCookieToken();
    console.log(decoded);
    if (decoded === undefined || decoded === null) {
      return {
        success: false,
        message: "User token issue",
      };
    }
    let query = decoded._id ? { _id: decoded._id } : { email: decoded.email };
    const user = await User.findOne(query).lean();
    if (!user) {
      return {
        success: false,
        message: "UnAuthorized",
      };
    }
    let notiLen:number = 0;
    const notifications:NotificationType[] = user.notifications || [];
    notifications.forEach((n: NotificationType) => {
      if (!n.isVwd) notiLen++;
    });
    console.log(notiLen);

    return {
      success: true,
      message: "New Notification",
      payload: {
        notifications: JSON.stringify(notifications),
        notiLen,
      },
    };
  } catch (error) {
    console.log("Error in getNotification" + error);
    return {
      success: false,
      message: "Error while getting Notifications",
    };
  }
}


