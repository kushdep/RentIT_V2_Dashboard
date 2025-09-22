"use server";

import { LocPhtsType } from "@/dataInterfaces";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function imageUpload(
  imgTtlData: LocPhtsType[]
): Promise<{ success: boolean; imgTtlData: LocPhtsType[] }> {
  try {
    for (const e of imgTtlData) {
      const uploadResults = await Promise.all(
        e.images.map(async (i) => {
          if (typeof i !== "object") {
            const result = await cloudinary.uploader.upload(i as string, {
              folder: "Rent-IT_V2",
            });
            const path = result.url.split("Rent-IT_V2/");
            const id = "Rent-IT_V2/" + path[1].replace(/\.[^/.]+$/, "");
            return {
              url: result.url,
              public_id: id,
            };
          } else {
            return i;
          }
        })
      );
      e.images = uploadResults;
      console.log(e.title + " " + JSON.stringify(e.images));
    }
    return { success: true, imgTtlData };
  } catch (error) {
    console.log("ERROR IN imageUpload()- " + error);
    console.log(error)
    return { success: false, imgTtlData };
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function deleteUploadedImage(delImgId: string) {
  try {
    const result = await cloudinary.uploader.destroy(delImgId);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
export async function dltUplImgArr(pubIdArr: string[]) {
  try {
    const result = await cloudinary.api.delete_resources(pubIdArr);
    console.log(result)
  } catch (err) {
    console.error(err);
  }
}

