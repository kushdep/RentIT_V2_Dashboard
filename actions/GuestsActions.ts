"use server";

import { getCookieToken } from "@/controllers/authController";
import Location from "../models/rent-loc";
import User from "../models/user";


export const getUpcomingGuests = async () => {
  try {
    const decoded = await getCookieToken();
    if (decoded === undefined || decoded === null) {
      return {
        success: false,
        message: "User token issue",
      };
    }
    let query:any ={}
    query["locDtl.author.email"]=decoded.email ;
    console.log(query)
    const locDocBook = await Location.find(query).populate("bookings");
    const locDoc = await Location.find(query).populate({path:"bookings",select:"user start end"});
    console.log(locDocBook)
    console.log(locDoc)
  } catch (error) {
    console.log("Error in getUpcomingGuests() " + error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
