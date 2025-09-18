'use client'

import { useState } from "react"

function AddImgTtlInputBox({ind}:{ind:number}){
    const [resolvedUrls,setResolvedUrls] = useState([])

    function updateInputImg(){

    }
    return <>
  <div className="flex flex-col gap-2 p-2">
    <div className="p-2">
      <div className="flex justify-between items-center">
        <label
          htmlFor="title"
          className="font-semibold text-sm text-gray-800"
        >
          Add Images & title
        </label>

        {ind > 0 && (
          <button
            type="button"
            className="text-gray-600 hover:text-red-600 transition"
            onClick={() => {
            }}
          >
            <img src="/icons/trash.svg" alt="delete" />
          </button>
        )}
      </div>

      { (
        <div className="text-red-500 text-xs mt-1">err</div>
      )}

      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter a title"
        required
        onChange={(e) =>{}}
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
                className="absolute -top-2 -right-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                onClick={() => {
                  
                }}
              >
                <img src="/icons/x-circle.svg" alt="remove" />
              </button>
            </div>
          ))}

          {
            <div className="relative inline-block">
              <button
                type="button"
                className="w-12 h-12 border rounded flex items-center justify-center hover:bg-gray-100"
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onInput={updateInputImg}
                />
                <img src="/icons/plus-lg.svg" className="w-4 h-4" alt="add" />
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  </div>
</>

}

export default AddImgTtlInputBox