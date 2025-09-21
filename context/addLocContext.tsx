"use client";

import {
  LOC_ENUM,
  LocAddsType,
  LocFaciType,
  LocPhtsType,
  RentLocIfc,
} from "@/dataInterfaces";
import React, { createContext, useContext, useState } from "react";

type AddLocContextType = {
  locType: LOC_ENUM;
  title: string;
  price: number | null;
  guestCap: number | null;
  imgTtlData: LocPhtsType[];
  bedrooms: number | null;
  bathrooms: number | null;
  beds: number | null;
  others: string;
  location: LocAddsType;
  facilities: LocFaciType[];
  Errors: any;
  imgTtlErr: { index: number; message: string }[];
  isSubm: boolean;
  handleImgTtlErr: (val: { index: number; message: string }[]) => void;
  handleErrStt: () => object;
  handleIsSubm: (val: boolean) => void;
  handleLocTypeVal: (val: LOC_ENUM) => void;
  handleLocTtlVal: (val: string) => void;
  handleLocPriceVal: (val: number) => void;
  handleGstCapVal: (val: number) => void;
  handleImgTtlStt: (val: LocPhtsType, ind: number, del?: boolean) => void;
  handleBedroomCap: (val: number) => void;
  handleBathCapVal: (val: number) => void;
  handleBedCapVal: (val: number) => void;
  handleLocDesc: (val: string) => void;
  handleLocAddr: (val: LocAddsType) => void;
  handleFacStt: (val: LocFaciType, id: number, del?: boolean) => void;
  populateLocStt: (val: RentLocIfc) => void;
};

const AddLocContext = createContext<AddLocContextType | undefined>(undefined);

export const AddLocProvider = ({ children }: { children: React.ReactNode }) => {
  const [id, setLocId] = useState<string | undefined>("");
  const [locName, setLocName] = useState("");
  const [locType, setLocType] = useState<LOC_ENUM>(LOC_ENUM.NONE);
  const [locDesc, setLocDesc] = useState("");
  const [rentPrice, setRentPrice] = useState<number | null>(null);
  const [gstPlcCp, setGstPlcCp] = useState<number | null>(null);
  const [bedCap, setBedCap] = useState<number | null>(null);
  const [roomsCap, setBedroomsCap] = useState<number | null>(null);
  const [bathCap, setBathCap] = useState<number | null>(null);
  const [err, setErr] = useState<object>({});
  const [isSubm, setIsSubm] = useState(false);
  const [imgTtlErr, setimgTtlErr] = useState<{ index: number; message: string }[]>([]);
  const [locAddr, setLocAddr] = useState<LocAddsType>({
    address: "",
    placeId: "",
    plusCode: {},
    coordinates: { longitude: null, latitude: null },
  });
  const [imgTtlStt, setImgTtlStt] = useState<LocPhtsType[]>([]);
  const [facStt, setFacStt] = useState<LocFaciType[]>([]);

  function handleLocTypeVal(val: LOC_ENUM) {
    setLocType(val);
  }

  function handleLocTtlVal(val: string) {
    setLocName(val);
  }

  function handleLocPriceVal(val: number) {
    setRentPrice(val);
  }

  function handleGstCapVal(val: number) {
    setGstPlcCp(val);
  }

  function handleBedCapVal(val: number) {
    setBedCap(val);
  }

  function handleBedroomCap(val: number) {
    setBedroomsCap(val);
  }

  function handleBathCapVal(val: number) {
    setBathCap(val);
  }

  function handleLocDesc(val: string) {
    setLocDesc(val);
  }
  function handleIsSubm(val: boolean) {
    setIsSubm(val);
  }

  function handleLocAddr(val: LocAddsType) {
    setLocAddr(val);
  }

  function handleImgTtlErr(err: { index: number; message: string }[]) {
    setimgTtlErr(() => err);
  }

  function handleErrStt() {
    let errs: any = {};
    if (locName.trim() === "" || locName.trim() === null) {
      errs["locName"] = "Enter Valid Location Name";
    }
    if (locType === null) {
      errs["locType"] = "Select Location Type";
    }
    if (rentPrice === null || rentPrice < 1) {
      errs["price"] = "Enter Valid Rent Price";
    }
    if (gstPlcCp === null || gstPlcCp < 1) {
      errs["guests"] = "Enter Valid Guest Capacity";
    }
    if (roomsCap === null || roomsCap < 1) {
      errs["rooms"] = "Enter Valid Rooms Capacity";
    }
    if (bedCap === null || bedCap < 1) {
      errs["beds"] = "Enter Valid No of Beds";
    }
    if (bathCap === null || bathCap < 1) {
      errs["bathrooms"] = "Enter Valid No of Bathrooms";
    }
    if (locAddr.address === "") {
      errs["address"] = "Enter Address of Your Location";
    }
    if (locDesc.trim() === "" || locDesc === null) {
      errs["locDesc"] = "Enter Desc of Your Location";
    }
    if (facStt.length === 0 || facStt[0].id === null) {
      errs["facilities"] = "Select Atleast 2 facilities of your Location";
    }
    if (imgTtlStt.length < 3) {
      errs["imgTtl"] = "atleast 3 places image of Location";
    }

    setErr(errs);
    return errs;
  }

  function handleImgTtlStt(val: LocPhtsType, ind: number, del?: boolean) {
    setImgTtlStt((prev: LocPhtsType[]): LocPhtsType[] => {
      let updStt: LocPhtsType[] = [...prev];
      if (ind <= imgTtlStt.length) {
        if (del) {
          updStt = updStt.filter((e, i) => i !== ind);
        } else {
          updStt[ind] = val;
        }
      } else {
        updStt.push(val);
      }
      return updStt;
    });
  }

  function handleFacStt(val: LocFaciType, id: number, del?: boolean) {
    setFacStt((prev) => {
      let updFccStt = [...prev];
      const ind = prev.findIndex((f) => (f.id as any) === id);
      console.log(ind);
      if (ind !== -1) {
        console.log("inside index");
        if (del) {
          console.log("inside del");
          console.log(val.ammenities.length);
          updFccStt = updFccStt.filter((f) => (f.id as any) !== id);
        } else {
          updFccStt[ind].ammenities = val.ammenities;
        }
      } else {
        if (val.ammenities.length > 0) {
          updFccStt.push(val);
        }
      }
      return updFccStt;
    });
  }

  function populateLocStt(val: RentLocIfc) {
    const { locDtl } = val;
    setLocId(val._id?.toString());
    setImgTtlStt(locDtl.imgTtlData);
    setFacStt(locDtl.facilities);
    setLocAddr(locDtl.location);
    setBathCap(locDtl.desc.bathrooms);
    setBedroomsCap(locDtl.desc.bedrooms);
    setBedCap(locDtl.desc.beds);
    setLocDesc(locDtl.desc.others);
    setLocName(locDtl.title);
    setLocType(val.locType!);
    setRentPrice(locDtl.price)
    setGstPlcCp(locDtl.guestCap)
  }

  const ctxVal = {
    locType: locType,
    handleLocTypeVal,
    title: locName,
    handleLocTtlVal,
    price: rentPrice,
    handleLocPriceVal,
    guestCap: gstPlcCp,
    handleGstCapVal,
    imgTtlData: imgTtlStt,
    handleImgTtlStt,
    bedrooms: roomsCap,
    handleBedroomCap,
    bathrooms: bathCap,
    handleBathCapVal,
    beds: bedCap,
    handleBedCapVal,
    others: locDesc,
    handleLocDesc,
    location: locAddr,
    handleLocAddr,
    facilities: facStt,
    handleFacStt,
    Errors: err,
    handleErrStt,
    imgTtlErr,
    handleImgTtlErr,
    isSubm,
    handleIsSubm,
    populateLocStt,
  };

  return (
    <AddLocContext.Provider value={ctxVal}>{children}</AddLocContext.Provider>
  );
};

export const useAddLoc = () => {
  const ctx = useContext(AddLocContext);
  if (!ctx) {
    throw new Error("useAddLoc must be used inside AddLocProvider");
  }
  return ctx;
};
