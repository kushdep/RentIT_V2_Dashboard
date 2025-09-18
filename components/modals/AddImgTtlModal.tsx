"use client";

import { RefObject, useState } from "react";
import { Button } from "@/components/ui/button";
import AddImgTtlInputBox from "../AddImgTtlInputBox";
import { useAddLoc } from "@/context/addLocContext";

function AddImgTtlModal({
  reference,
}: {
  reference: RefObject<HTMLDialogElement> | null;
}) {
  const { imgTtlData, handleImgTtlStt } = useAddLoc();
  const [imgInpCnt, setImgInpCnt] = useState(imgTtlData.length);

  return (
    <>
      <dialog
        ref={reference}
        className="p-6 rounded-xl border shadow-2xl max-w-lg w-full 
             backdrop:bg-black/40
             fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {imgTtlData.map((e, i) => {
          return <AddImgTtlInputBox key={i} inpBoxInd={i} />;
        })}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {imgInpCnt < 5 && (
              <button
                onClick={() => {
                  setImgInpCnt(imgInpCnt + 1);
                  handleImgTtlStt({ title: "", images: [] }, imgInpCnt + 1);
                }}
                className="w-full border rounded-md mb-3 mt-5 flex justify-center items-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                Add more
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="default" onClick={() => reference?.current?.close()}>
            Close
          </Button>
        </div>
      </dialog>
    </>
  );
}

export default AddImgTtlModal;
