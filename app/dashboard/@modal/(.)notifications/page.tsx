"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

function NotifModal() {
  const reference = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();

  useEffect(()=>{
    reference.current?.showModal()
  },[])

  return (
    <dialog
      ref={reference}
      onClose={() => router.back()}
      className="p-6 rounded-xl border shadow-2xl max-w-lg w-full 
             backdrop:bg-black/40
             fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex justify-end gap-3 mt-4">
        <Button
          variant="default"
          onClick={() => {
            reference?.current?.close();
          }}
        >
          Close
        </Button>
      </div>
    </dialog>
  );
}

export default NotifModal;
