"use client";
import { useRef, RefObject } from "react";
import { Button } from "@/components/ui/button";
import AddImgTtlInputBox from "../AddImgTtlInputBox";
import { useAddLoc } from "@/context/addLocContext";

function AddImgTtlModal({
  reference,
}: {
  reference: RefObject<HTMLDialogElement> | null;
}) {
  const { imgTtlData } = useAddLoc();

  return (
    <dialog ref={reference} className="p-4 rounded-md border shadow-lg">
      <AddImgTtlInputBox ind={1} />
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          {imgTtlData.length < 5 && (
            <button
              onClick={() => {}}
              className="w-full border rounded-md mb-3 flex justify-center items-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Add more
            </button>
          )}
        </div>
      </div>

      <Button onClick={() => reference?.current?.close()}>Close</Button>
    </dialog>
  );
}

export default AddImgTtlModal;
