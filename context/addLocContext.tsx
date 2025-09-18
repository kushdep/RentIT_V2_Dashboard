"use client";

import { LocAddsType, LocFaciType, LocPhtsType } from "@/dataInterfaces";
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
  handleFacStt: (val: LocFaciType, id: number) => void;
};

const AddLocContext = createContext<AddLocContextType | undefined>(undefined);

export const AddLocProvider = ({ children }: { children: React.ReactNode }) => {
  const [locName, setLocName] = useState("");
  const [locType, setLocType] = useState("");
  const [locDesc, setLocDesc] = useState("");
  const [rentPrice, setRentPrice] = useState(null);
  const [gstPlcCp, setGstPlcCp] = useState(null);
  const [bedCap, setBedCap] = useState(null);
  const [roomsCap, setBedroomsCap] = useState(null);
  const [bathCap, setBathCap] = useState(null);
  const [locAddr, setLocAddr] = useState<LocAddsType>({
    address: "",
    placeId: "",
    plusCode: {},
    coordinates: { longitude: null, latitude: null },
  });
  const [imgTtlStt, setImgTtlStt] = useState<LocPhtsType[]>([
    { title: "", images: [""] },
  ]);
  const [facStt, setFacStt] = useState<LocFaciType[]>([
    { id: null, title: "", ammenities: [{ id: null, name: "" }] },
  ]);

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

  function handleFacStt(val: LocFaciType, id: number) {
    setFacStt((prev) => {
      let updFccStt = [...prev];
      const ind = facStt.findIndex((f) => (f.id as any) === id);
      if (ind !== null) {
        if (val.ammenities.length === 0) {
          updFccStt = updFccStt.filter((f) => (f.id as any) === id);
        } else {
          updFccStt[ind].ammenities = val.ammenities;
        }
      } else {
        facStt.push(val);
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
