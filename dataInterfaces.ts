import { Types } from "mongoose";

export interface LoginFormStt {
  email: string;
  password: string;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  payload?: any;
}

export interface formValError {
  title?: string;
  message: string;
}

export enum LOC_ENUM {
  APPARTMENT_TYPE = "A01",
  VILLA_TYPE = "V01",
  PENTHOUSE_TYPE = "P01",
  NONE = "",
}

export type ImgType = {
  url: string;
  public_id: string;
};

export type LocPhtsType = {
  title: string;
  images: (ImgType | string)[];
};

export type LocAmmType = {
  id?: number | null;
  name?: string;
};

export type LocCoordType = {
  longitude: number | null;
  latitude: number | null;
};

export type LocAuthorType = {
  email: string;
  username: string;
};

export type LocFaciType = {
  id: number | null;
  title: string;
  ammenities: LocAmmType[];
};

export type DescDataType = {
  bedrooms: number | null;
  bathrooms: number | null;
  beds: number | null;
  others: string;
};

export type LocAddsType = {
  address: string;
  placeId: string;
  plusCode: { compound_code?: string; global_code?: string } | undefined;
  coordinates: LocCoordType;
};

export type LocDtlType = {
  title: string;
  imgTtlData: LocPhtsType[];
  price: number | null;
  guestsCap: number | null;
  desc: DescDataType;
  facilities: LocFaciType[];
  location: LocAddsType;
  author?: LocAuthorType;
  reviews?: Types.ObjectId[];
};

export interface BookingStatsType {
  totalRevenue: number;
  totalBookings: number;
}
export interface BookingPaymentType {
  userId: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  amount: number;
  receiptNo:number,
  status:string,
  createdAt?: Date;
}
export interface LocBookingType {
  location: string;
  user: LocAuthorType;
  start: string;
  end: string;
  payment: BookingPaymentType;
  stayDuration: number;
  totalGuests: number;
  checkIn: Date;
}

export interface RentLocIfc {
  _id?: string;
  Sno?: number;
  locType: LOC_ENUM | null;
  locDtl: LocDtlType;
  stars?: number | 0;
  bookings?: {
    start: string;
    end: string;
    bookingDetails: LocBookingType[];
  };
  stats?: Map<string, BookingStatsType>;
}

export interface BookedTripsType {
  location: string;
  start: number;
  end: number;
  payment: string;
  checkIn: boolean;
}
export interface IUserIfc {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  address: string;
  primaryPhNo: string;
  sndryPhNo: string;
  userImg: {
    url: string;
    filename: string;
  };
  locations: {
    Categories: {
      Appartment: string[];
      Villa: string[];
      Penthouse: string[];
    };
  };
  savedLoc: Types.ObjectId[];
  userType: {
    propertier: boolean;
  };
  trips: BookedTripsType[];
  createdAt: Date;
  updatedAt: Date;
}

export type AddressValDataType = {
  address: {
    regionCode: string;
    administrativeArea: string;
    locality: string;
    postalCode: string;
    addressLines: string[];
  };
};

export type JwtTokenVrfType = {
  _id?: string;
  email: string;
  iat: number;
  exp: number;
};

export type PropertyCardDataType = {
  _id: string;
  type: string;
  title: string;
  image: string;
  price: number;
  address: string;
  reviews: number;
  bookings?: number;
};
