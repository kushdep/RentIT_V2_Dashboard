"use client";

import { RefObject, useState } from "react";
import { useAddLoc } from "@/context/addLocContext";
import { Ammentities } from "@/config";
import { LocAmmType } from "@/dataInterfaces";

function AddAmmModal({
  reference,
  selAmmId,
}: {
  selAmmId: number | null;
  reference: RefObject<HTMLDialogElement> | null;
}) {
  const { facilities, handleFacStt } = useAddLoc();
  const ammenityData = Ammentities.find((e) => e.id === selAmmId);
  const options = facilities.find((f) => f.id === selAmmId)?.ammenities;
  const [optStt, setOptStt] = useState<LocAmmType[]>(options ?? []);

  return (
    <>
      <dialog
        ref={reference}
        className="p-3 rounded-xl border shadow-2xl max-w-lg w-96
             backdrop:bg-black/40
             fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex justify-center">
          <p className="text-xl font-medium">{ammenityData?.title}</p>
        </div>
        <div className="mt-4 max-h-[60vh] w- overflow-y-auto">
          <div className="justify-center">
            {ammenityData?.options.map((e, i) => {
              let isChecked = optStt
                ? optStt.find((m) => e.id === m.id)
                  ? true
                  : false
                : false;
              return (
                <div key={e.id} className="flex flex-col items-center my-3">
                  <input
                    type="checkbox"
                    id={String(e.id)}
                    checked={isChecked}
                    onChange={(event) => {
                      setOptStt((prev) => {
                        if (!event.target.checked) {
                          return prev.filter((u) => u.id !== e.id);
                        }
                        let updStt = [...prev];
                        updStt.push({ id: e.id, name: e.name });
                        return updStt;
                      });
                    }}
                    className="peer hidden w-full"
                  />
                  <label
                    htmlFor={String(e.id)}
                    className={`flex w-80 cursor-pointer items-center gap-3 rounded-2xl border p-3 transition
                ${
                  isChecked
                    ? "border-gray-800 bg-gray-400 font-medium"
                    : "border-gray-300"
                }
                peer-checked:border-gray-800 peer-checked:bg-gray-100`}
                  >
                    <img
                      src={e.img}
                      alt={e.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                    {e.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <form method="dialog" className="mt-6">
          <button
            type="submit"
            className="w-full rounded-lg border border-primary px-4 py-2 font-semibold text-primary hover:bg-primary hover:text-white"
            onClick={() => {
              handleFacStt(
                {
                  id: selAmmId,
                  title: ammenityData?.title!,
                  ammenities: optStt,
                },
                selAmmId!
              );
            }}
          >
            Done
          </button>
        </form>
      </dialog>
    </>
  );
}

export default AddAmmModal;
