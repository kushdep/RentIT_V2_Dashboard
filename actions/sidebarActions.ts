'use server'

import { NotificationType } from './../dataInterfaces';
import { getCookieToken } from "@/controllers/authController";
import { AuthResponse } from "@/dataInterfaces";
import User from "../models/user";

export async function getNotification (): Promise<AuthResponse> {
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
    const user = await User.findOne(query).lean();
    if(!user){
      return {
        success:false,
        message:'UnAuthorized'
      }
    }
    console.log(user)
    console.log(user.notifications)
    let notiLen = 0
    let bkg:NotificationType[]=[]
    let rvw:NotificationType[]=[]
  const notifications = user.notifications || [];
    notifications.forEach((n:NotificationType) => {
      if(!n.isVwd) notiLen++
      switch (n.ntfType) {
        case "BKG":
          bkg.push(n)
          break;
          case "RVW":
          rvw.push(n)
          break;
      }  
    });
    console.log(notiLen)

    return {
      success: true,
      message: "New Notification",
      payload:{
        bkgNoti:JSON.stringify(bkg),
        rvwNOti:JSON.stringify(bkg),
        notiLen
      }
    };
  } catch (error) {
    console.log("Error in getNotification" + error);
    return {
      success: false,
      message: "Error while getting Notifications",
    };
  }
};
