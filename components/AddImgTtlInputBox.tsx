"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useAddLoc } from "@/context/addLocContext";

function getURLs(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        res(reader.result);
      } else {
        rej(new Error("Unexpected result type"));
      }
    };
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

function AddImgTtlInputBox({ inpBoxInd,err }: { inpBoxInd: number,err:string }) {
  const { imgTtlData, handleImgTtlStt } = useAddLoc();
  const [resolvedUrls, setResolvedUrls] = useState<string[]>(
    imgTtlData[inpBoxInd].images as any
  );
  const [title, setTitle] = useState(imgTtlData[inpBoxInd].title);

  const [isEdit, setIsEdit] = useState<Boolean>(
    title.length > 0 || resolvedUrls.length > 0 ? true : false
  );



  async function addImg(file: File) {
    async function resolveUrls() {
      const url = await getURLs(file);
      setResolvedUrls((prev: string[]) => {
        return [...prev, url];
      });
    }
    const res = await resolveUrls();
    return res;
  }

  async function updateInputImg(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const files = e.target.files ?? [];
      if (files.length === 0) return;
      const inpFile = Array.from(files);
      await addImg(inpFile[0]);
    } catch (error) {
      console.error("Error in updateInputImg()- " + error);
    }
  }

  function delImgUrl(ind: number) {
    setResolvedUrls((prev: string[]) => prev.filter((u, i) => i !== ind));
  }

  return (
    <>
      <div
        className={
          isEdit
            ? "flex flex-col gap-2 p-2 border rounded-xl my-3 bg-gray-100"
            : "flex flex-col gap-2 p-2 border rounded-xl my-3"
        }
      >
        <div className="p-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="title"
              className="font-semibold text-sm text-gray-800"
            >
              Add Images & title
            </label>
            <div>
              <Button
                className="mx-3 text-sm"
                variant={isEdit ? "default" : "outline"}
                onClick={() => {
                  if (!isEdit) {
                    handleImgTtlStt({ title, images: resolvedUrls }, inpBoxInd);
                    setIsEdit(true);
                  } else {
                    setIsEdit(false);
                  }
                }}
              >
                {isEdit ? "Edit" : "Save"}
              </Button>
              {inpBoxInd > 0 && (
                <button
                  type="button"
                  className="text-gray-600 hover:text-red-600 transition"
                  onClick={() =>
                    handleImgTtlStt(
                      { title, images: resolvedUrls },
                      inpBoxInd,
                      true
                    )
                  }
                >
                  <img src="/icons/trash.svg" alt="delete" />
                </button>
              )}
            </div>
          </div>

          {<div className="text-red-500 text-xs mt-1">err</div>}

          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter a title"
            required
            value={title}
            disabled={isEdit ? true : false}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />

          <div className="my-3">
            <div className="flex flex-wrap gap-2">
              {resolvedUrls?.map((ele, i) => (
                <div key={i} className="relative">
                  <img
                    src={ele}
                    alt={`uploaded-${i}`}
                    className="w-12 h-12 rounded border object-cover"
                  />
                  <button
                    type="button"
                    disabled={isEdit ? true : false}
                    className="absolute -top-2 -right-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                    onClick={() => {
                      delImgUrl(i);
                    }}
                  >
                    <img src="/icons/x-circle.svg" alt="remove" />
                  </button>
                </div>
              ))}
              {resolvedUrls.length < 5 && (
                <div className="relative inline-block">
                  <button
                    type="button"
                    className="w-12 h-12 border rounded flex items-center justify-center hover:bg-gray-100"
                    disabled={isEdit ? true : false}
                  >
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={updateInputImg}
                      disabled={isEdit ? true : false}
                    />
                    <img
                      src="/icons/plus-lg.svg"
                      className="w-4 h-4"
                      alt="add"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddImgTtlInputBox;
