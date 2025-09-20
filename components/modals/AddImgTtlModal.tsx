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
  const { imgTtlData, handleImgTtlStt, imgTtlErr, handleImgTtlErr } = useAddLoc();
  const [imgInpCnt, setImgInpCnt] = useState(imgTtlData.length);

  function chckFields() {
    let imgTttlErr = [];
    for (const [ind, val] of imgTtlData.entries()) {
      if (val.title.length < 3 || val.images.length < 1) {
        let message = "";
        if (val.title.length < 3 && val.images.length < 1) {
          message = "Please Enter Title & Add Images";
        } else if (val.title.length < 3) {
          message = "Please Enter Valid Title";
        } else if (val.images.length < 1) {
          message = "Please Add atleast one image";
        }
        imgTttlErr.push({
          index: ind,
          message,
        });
      }
    }
    handleImgTtlErr(imgTtlErr);
  }

  return (
    <>
      <dialog
        ref={reference}
        className="p-6 rounded-xl border shadow-2xl max-w-lg w-full 
             backdrop:bg-black/40
             fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {imgTtlData.map((e, i) => {
          const message = imgTtlErr?.find(({ index }) => index === i)?.message;
          return <AddImgTtlInputBox key={i} inpBoxInd={i} err={message!} />;
        })}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {imgInpCnt < 5 && (
              <button
                disabled={
                  imgTtlData.length > 0
                    ? imgTtlData[imgTtlData.length - 1].title === "" ||
                      imgTtlData[imgTtlData.length - 1].images.length === 0
                      ? true
                      : false
                    : false
                }
                onClick={() => {
                  setImgInpCnt(imgInpCnt + 1);
                  handleImgTtlStt({ title: "", images: [] }, imgInpCnt + 1);
                }}
                className="w-full border rounded-md mb-3 mt-5 flex justify-center items-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                {imgTtlData.length > 0 ? "Add more" : "Add"}
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="default"
            onClick={() => {
              chckFields();
              reference?.current?.close();
            }}
          >
            Close
          </Button>
        </div>
      </dialog>
    </>
  );
}

export default AddImgTtlModal;
