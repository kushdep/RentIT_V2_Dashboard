"use server";

import { NotificationType } from "./../dataInterfaces";
import { getCookieToken } from "@/controllers/authController";
import { AuthResponse } from "@/dataInterfaces";
import User from "../models/user";
import user from "../models/user";

export async function markNotiRead(
  noti: string | string[] | []
): Promise<AuthResponse> {
  try {
    const decoded = await getCookieToken();
    if (decoded === undefined || decoded === null) {
      return {
        success: false,
        message: "User token issue",
      };
    }
    let query: Record<string, any> = decoded._id
      ? { _id: decoded._id }
      : { email: decoded.email };
    if (Array.isArray(noti) && noti.length > 0) {
      const userDoc = await User.findOne(query);
      if (!userDoc) {
        return {
          success: false,
          message: "Marking Notification as read failed",
        };
      }
      userDoc.notifications.forEach((n: NotificationType) => {
        if (noti.includes(n._id.toString())) {
          n.isVwd = true;
          console.log(n.message);
        }
      });

      const updUserDoc = await userDoc.save();
      if (!updUserDoc) {
        return {
          success: false,
          message: "Marking Notification as read failed",
        };
      }
    } else if (typeof noti === "string") {
      console.log(noti)
      const updDoc = await User.findOneAndUpdate(
        query,
        { $set: { "notifications.$[elem].isVwd": true } },
        { arrayFilters: [{ "elem._id":noti }] }
      );
      console.log(updDoc);
      if (!updDoc) {
        return {
          success: false,
          message: "Marking Notification as read failed",
        };
      }
    }
    query["new"] = true;

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
    let notiLen: number = 0;
    const notifications: NotificationType[] = user.notifications || [];
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
