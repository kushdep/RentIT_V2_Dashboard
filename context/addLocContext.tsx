"use client";

import {
  formValError,
  LocAddsType,
  LocFaciType,
  LocPhtsType,
} from "@/dataInterfaces";
import React, { createContext, useContext, useState } from "react";

type AddLocContextType = {
  locType: string;
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
  handleImgTtlErr: (val: { index: number; message: string }[]) => void;
  handleErrStt: () => void;
  handleLocTypeVal: (val: string) => void;
  handleLocTtlVal: (val: string) => void;
  handleLocPriceVal: (val: number) => void;
  handleGstCapVal: (val: number) => void;
  handleImgTtlStt: (val: LocPhtsType, ind: number, del?: boolean) => void;
  handleBedroomCap: (val: number) => void;
  handleBathCapVal: (val: number) => void;
  handleBedCapVal: (val: number) => void;
  handleLocDesc: (val: string) => void;
  handleLocAddr: (val: LocAddsType) => void;
  handleFacStt: (val: LocFaciType, id: number,del?:boolean) => void;
};

const AddLocContext = createContext<AddLocContextType | undefined>(undefined);

export const AddLocProvider = ({ children }: { children: React.ReactNode }) => {
  const [locName, setLocName] = useState("");
  const [locType, setLocType] = useState("");
  const [locDesc, setLocDesc] = useState("");
  const [rentPrice, setRentPrice] = useState<number | null>(null);
  const [gstPlcCp, setGstPlcCp] = useState<number | null>(null);
  const [bedCap, setBedCap] = useState<number | null>(null);
  const [roomsCap, setBedroomsCap] = useState<number | null>(null);
  const [bathCap, setBathCap] = useState<number | null>(null);
  const [err, setErr] = useState({});
  const [imgTtlErr, setimgTtlErr] = useState<
    { index: number; message: string }[]
  >([]);
  const [locAddr, setLocAddr] = useState<LocAddsType>({
    address: "",
    placeId: "",
    plusCode: {},
    coordinates: { longitude: null, latitude: null },
  });
  const [imgTtlStt, setImgTtlStt] = useState<LocPhtsType[]>([]);
  const [facStt, setFacStt] = useState<LocFaciType[]>([]);

  function handleLocTypeVal(val: string) {
    setLocType(val);
  }

  function handleLocTtlVal(val: string) {
    setLocName(val);
  }

  function handleLocPriceVal(val: number) {
    setRentPrice(val as any);
  }

  function handleGstCapVal(val: number) {
    setGstPlcCp(val as any);
  }

  function handleBedCapVal(val: number) {
    setBedCap(val as any);
  }

  function handleBedroomCap(val: number) {
    setBedroomsCap(val as any);
  }

  function handleBathCapVal(val: number) {
    setBathCap(val as any);
  }

  function handleLocDesc(val: string) {
    setLocDesc(val);
  }

  function handleLocAddr(val: LocAddsType) {
    setLocAddr(val);
  }

  function handleImgTtlErr(err: { index: number; message: string }[]) {
    setimgTtlErr(() => err);
  }

  function handleErrStt() {
    setErr((prev) => {
      let errs: any = {};
      if (locName.trim() === "" || locName.trim() === null) {
        errs["locName"] = "Enter Valid Location Name";
      }
      if (locType === "" || locType === null) {
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
        errs["facilities"] = "Select Atleast two facilities of your Location";
      }

      return errs;
    });
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
        console.log("inside index")
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
