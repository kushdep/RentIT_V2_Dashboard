import mongoose, { Model, Schema, Types } from "mongoose";

export interface IUser {
  _id: String;
  username: String;
  email: String;
  password: String;
  address: String;
  primaryPhNo: String;
  sndryPhNo: String;
  userImg: {
    url: String;
    filename: String;
  };
  locations: {
    Categories: {
      Appartment: String[];
      Villa: String[];
      Penthouse: String[];
    };
  };
  savedLoc: Types.ObjectId[];
  userType: {
    propertier: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
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
      categories: {
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
  },
  { timestamps: true }
);

const user: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default user;
