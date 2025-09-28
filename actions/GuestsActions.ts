"use server";

import { getCookieToken } from "@/controllers/authController";
import Location from "../models/rent-loc";
import "@/models/booking"
import "@/models/payment"
import { AuthResponse, LocBookingType } from "@/dataInterfaces";


export const getGuestsData = async ():Promise<AuthResponse> => {
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
    const locDoc = await Location.find(query).populate({path:"bookings.bookingDetails",populate:{path:'payment'}})
    console.log(locDoc)
    const bookingData = locDoc.filter((e)=> e.bookings.length>0?true:false )
    console.log(bookingData) 
    return {
      success: true,
      message: "Something went wrong",
      payload:bookingData
    };
  } catch (error) {
    console.log("Error in getUpcomingGuests() " + error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
