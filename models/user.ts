import { IUserIfc } from "@/dataInterfaces";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema<IUserIfc> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
    },
    primaryPhNo: {
      type: String,
    },
    sndryPhNo: {
      type: String,
    },
    userImg: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    locations: {
      Appartment: [
        {
          type: Schema.Types.ObjectId,
          ref: "Location",
        },
      ],
      Villa: [
        {
          type: Schema.Types.ObjectId,
          ref: "Location",
        },
      ],
      Penthouse: [
        {
          type: Schema.Types.ObjectId,
          ref: "Location",
        },
      ],
    },
    savedLoc: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
    userType: {
      propertier: {
        type: Boolean,
        default: false,
      },
      idProof: {
        id: {
          type: String,
        },
        refId: {
          type: Number,
        },
      },
    },
    trips: [
      {
        booking: {
          type: mongoose.Types.ObjectId,
          ref: "Bookings",
          required:true
        },
        locationDetails: {
          type: mongoose.Types.ObjectId,
          ref: "Location",
          required:true
        },
        review: {
          type: mongoose.Types.ObjectId,
          ref: "Review",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUserIfc>("User", UserSchema);
