"use client";
import { useRef, RefObject } from "react";
import { Button } from "@/components/ui/button";

function AddImgTtlModal({ reference }: { reference: RefObject<HTMLDialogElement> | null }) {
  return (
    <dialog ref={reference} className="p-4 rounded-md border shadow-lg">
      <h1 className="text-lg font-bold mb-4">Modal Open</h1>
      <p>This is a dialog controlled via ref.</p>
      <Button onClick={() => reference?.current?.close()}>Close</Button>
    </dialog>
  );
}

export default AddImgTtlModal