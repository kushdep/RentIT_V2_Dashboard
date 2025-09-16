import { Types } from "mongoose";

export interface LoginFormStt {
  email: String;
  password: String;
  error?: String;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

export interface Error {
  message: string;
}

export enum LOC_ENUM {
  APPARTMENT_TYPE = "A01",
  VILLA_TYPE = "V01",
  PENTHOUSE_TYPE = "P01",
}

export type ImgType = {
  url: string;
  filenmae: string;
};

export type LocPhtsType = {
  title: string;
  images: [ImgType];
};

export type LocAmmType = {
  id: Number;
  name: string;
};

export type LocCoordType = {
  longitude: Number;
  latitude: Number;
};

export type LocAuthorType = {
  email: string;
  username: string;
};

export type LocFaciType = {
  id: string;
  title: string;
  ammenities: [LocAmmType];
};

export type DescDataType = {
  bedrooms: Number;
  bathrooms: Number;
  beds: Number;
  others: string;
};

export type LocAddsType = {
  address: string;
  placeId: string;
  plusCode: { compound_code?: string; global_code?: string };
  coordinates: LocCoordType;
};

export type LocDtlType = {
  title: string;
  imgTtlData: [LocPhtsType];
  price: Number;
  guestCap: Number;
  desc: DescDataType;
  facilities: [LocFaciType];
  location: LocAddsType;
  author: LocAuthorType;
  reviews: Types.ObjectId[];
};

export interface RentLocIfc {
  Sno: Number;
  locType: LOC_ENUM;
  locDtl: LocDtlType;
  stars?: Number | 0;
}

export interface IUserIfc {
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
