import { LOC_ENUM, LocPhtsType, RentLocIfc } from "@/dataInterfaces";
import mongoose, { Schema } from "mongoose";
import Review from "./review";
import User from "../models/user";
import { dltUplImgArr } from "@/utils/server-utils/cloudinary";
import { Types } from "mongoose";

const locSchema: Schema<RentLocIfc> = new Schema(
  {
    Sno: {
      type: Number,
      required: true,
      unique: true,
    },
    locType: {
      type: String,
      required: true,
      enum: ["A01", "V01", "P01"],
    },
    locDtl: {
      title: {
        type: String,
        required: true,
      },
      imgTtlData: [
        {
          title: {
            type: String,
            required: true,
          },
          images: [
            {
              url: {
                type: String,
                required: true,
              },
              public_id: {
                type: String,
                required: true,
              },
            },
          ],
        },
      ],
      price: {
        type: Number,
        required: true,
      },
      guestsCap: {
        type: Number,
        required: true,
      },
      desc: {
        bedrooms: {
          type: Number,
          required: true,
        },
        bathrooms: {
          type: Number,
          required: true,
        },
        beds: {
          type: Number,
          required: true,
        },
        others: {
          type: String,
          required: true,
        },
      },
      facilities: [
        {
          id: {
            type: Number,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          ammenities: [
            {
              id: {
                type: Number,
                required: true,
              },
              name: String,
            },
          ],
        },
      ],
      location: {
        address: {
          type: String,
          required: true,
        },
        placeId: {
          type: String,
          required: true,
        },
        plusCode: {
          compound_code: {
            type: String,
          },
          global_code: {
            type: String,
          },
        },
        coordinates: {
          longitude: {
            type: Number,
            required: true,
          },
          latitude: {
            type: Number,
            required: true,
          },
        },
      },
      author: {
        email: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
      },
      reviews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
    },
    stars: {
      type: Number,
      default: 0,
    },
    bookings: [
      {
        start: {
          type: String,
          required: true,
        },
        end: {
          type: String,
          required: true,
        },
        bookingDetails: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bookings",
          },
        ],
      },
    ],
    stats: { type: Map, of: Object },
  },
  { timestamps: true }
);

locSchema.pre("findOneAndDelete", async function (next) {
  try {
    const docToFind = await this.model.findOne(this.getFilter());
    if (docToFind) {
      const authorEmail = docToFind.locDtl.author.email;
      const locationId = docToFind._id;
      const imgData = docToFind.locDtl.imgTtlData;
      const pubIdArr = imgData.flatMap((i: LocPhtsType) =>
        i.images.map((p: any, ind: number) => {
          console.log(ind + " " + p.public_id);
          return p.public_id;
        })
      );
      await dltUplImgArr(pubIdArr);
      const type: string | null =
        docToFind.locType === LOC_ENUM.APPARTMENT_TYPE
          ? "Appartment"
          : docToFind.locType === LOC_ENUM.VILLA_TYPE
          ? "Villa"
          : "Penthouse";
      if (type) {
        await User.findOneAndUpdate(
          { email: authorEmail },
          { $pull: { [`locations.${type}`]: locationId } }
        );
      }
      if (
        docToFind.locDtl &&
        docToFind.locDtl.reviews &&
        docToFind.locDtl.reviews.length > 0
      ) {
        const reviewIds = docToFind.locDtl.reviews;
        await Review.deleteMany({ _id: { $in: reviewIds } });
      }
    }
  } catch (error) {
    console.error("Error in findOneAndDelete pre-hook:", error);
  }
  next();
});

export default mongoose.models.Location ||
  mongoose.model<RentLocIfc>("Location", locSchema);
