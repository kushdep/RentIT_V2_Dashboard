"use server";

import { getCookieToken } from "@/controllers/authController";
import Location from "../models/rent-loc";
import User from "@/models/user";
import Bookings from "@/models/booking";
import "@/models/payment";
import { AuthResponse } from "@/dataInterfaces";

export const getGuestsData = async (): Promise<AuthResponse> => {
  try {
    const decoded = await getCookieToken();
    if (decoded === undefined || decoded === null) {
      return {
        success: false,
        message: "User token issue",
      };
    }
    let query: any = {};
    query["locDtl.author.email"] = decoded.email;
    const locDoc = await Location.find(query).populate({
      path: "bookings.bookingDetails",
      populate: { path: "payment" },
    });
    const bookingData = locDoc.filter((e) =>
      e.bookings.length > 0 ? true : false
    );
    return {
      success: true,
      message: "Something went wrong",
      payload: bookingData,
    };
  } catch (error) {
    console.log("Error in getUpcomingGuests() " + error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const setCheckInTime = async (
  id: string,
  checkIntime: Date,
  locId:string
): Promise<AuthResponse> => {
  try {
    if (id === undefined && id === null) {
      return {
        success: false,
        message: "Booking id missing",
      };
    }


    const updBkngDoc = await Bookings.findByIdAndUpdate(
      { _id: id },
      { $set: { checkIn: checkIntime } },
      { new: true }
    );
    if (updBkngDoc === undefined || updBkngDoc === null) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }

    const { user } = updBkngDoc;
    const body = {
      booking:id,
      locationDetails:locId,
    };
    const userDoc = await User.findOneAndUpdate(
      { email: user.email },
      { $push: { trips: body } },
      { new: true }
    );

    if (userDoc === undefined || userDoc === null) {
      return {
        success: false,
        message: "Unable to update User Trips",
      };
    }

    return {
      success: true,
      message: "Guests checked-in",
    };
  } catch (error) {
    console.log("Error in getUpcomingGuests() " + error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
