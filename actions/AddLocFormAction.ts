"use server";

import { AuthResponse, LOC_ENUM, RentLocIfc } from "@/dataInterfaces";
import { imageUpload } from "@/utils/server-utils/cloudinary";
import { RentLocSchema } from "@/zod-validations";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "../models/user";
import Location from "../models/rent-loc";

export const addLocationAction = async (
  payload: RentLocIfc
): Promise<AuthResponse> => {
  try {
    const res = RentLocSchema.safeParse(payload);
    if (!res.success) {
      return {
        success: false,
        message: "Data validation failed",
      };
    }
    const uplRes = await imageUpload(payload.locDtl.imgTtlData);
    if (!uplRes.success) {
      return {
        success: false,
        message: "image upload failed",
      };
    }
    payload.locDtl.imgTtlData = uplRes.imgTtlData;
    const cookieStore = await cookies();
    const token =
      cookieStore.get("sessionToken")?.value ??
      cookieStore.get("next-auth.session-token")?.value ??
      null;
    if (token === null) {
      return {
        success: false,
        message: "Unable to get user token",
      };
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
      email: string;
      iat: number;
      exp: number;
    };
    const user = await User.findById({ _id: decoded._id as string });
    const author = {
      username: user.username,
      email: user.email,
    };
    const Sno = await Location.countDocuments();
    payload.locDtl["author"] = author;
    payload["Sno"] = Sno + 3;
    console.log(payload);
    const locRes = await Location.create(payload);
    if (locRes === undefined || locRes === null) {
      return {
        success: false,
        message: "Unable to add Location",
      };
    }
    let locTypeName =
      payload.locType === LOC_ENUM.APPARTMENT_TYPE
        ? "Appartment"
        : payload.locType === LOC_ENUM.PENTHOUSE_TYPE
        ? "Penthouse"
        : "Villa";

    const userUpdRes = await User.findByIdAndUpdate(
      { _id: decoded._id },
      { $push: { [`locations.${locTypeName}`]: locRes._id } },
      { new: true }
    );
    if (userUpdRes === undefined || userUpdRes === null) {
      return {
        success: false,
        message: "Unable to add location in user profile",
      };
    }
    return {
      success: true,
      message: "Location Added Successfully",
      payload: locRes._id.toString(),
    };
  } catch (error) {
    console.log("Error in addLocationAction() " + error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
