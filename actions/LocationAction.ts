"use server";

import { AuthResponse, LOC_ENUM, RentLocIfc } from "@/dataInterfaces";
import { imageUpload } from "@/utils/server-utils/cloudinary";
import { RentLocSchema } from "@/zod-validations";
import User from "../models/user";
import Location from "../models/rent-loc";
import { getCookieToken } from "@/controllers/authController";

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
    const decoded = await getCookieToken();
    if (decoded === undefined || decoded === null) {
      return {
        success: false,
        message: "User token issue",
      };
    }
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

export const getUserLocs = async (): Promise<AuthResponse> => {
  try {
    const decoded = await getCookieToken();
    if (decoded === undefined || decoded === null) {
      return {
        success: false,
        message: "User token issue",
      };
    }
    const userDoc = await User.findById(decoded._id).populate([
      "locations.Appartment",
      "locations.Villa",
      "locations.Penthouse",
    ]);
    if (userDoc === undefined || userDoc === null) {
      return {
        success: false,
        message: "Unable to get Location",
      };
    }
    const { locations } = userDoc;
    const payload = locations.map((l: any) => {
    const  loc = l.map((t: any) => {
        return {
          type: t.locType,
          title: t.locDtl.title,
          image: t.locDtl.imgTtldata[0].images[0].url,
          price: t.locDtl.price,
          address: t.locDtl.location.address,
          reviews: t.locDtl.reviews.length,
        };
      });
      return loc;
    });
    return {
      success: true,
      message: "User Location fetched",
      payload,
    };
  } catch (error) {
    console.log("Error in getUserLocs() " + error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
