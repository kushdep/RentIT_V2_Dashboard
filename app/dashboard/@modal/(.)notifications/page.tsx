"use client";

import NotificationDataBox from "@/components/NotificationDataBox";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getNotification, markNotiRead } from "@/actions/sidebarActions";
import socket from "@/lib/socket";

function NotifModal() {
  const reference = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();
  const [notiData, setNotiData] = useState([]);
  const [markRead,setMarkRead] = useState<string[]>([])

  async function getNoti() {
    try {
      const res = await getNotification();
      console.log(res);
      if (res?.success) {
        setNotiData(JSON.parse(res.payload.notifications));
      }
    } catch (error) {
      console.error("Error in getNOti " + error);
    }
  }

  useEffect(() => {
    reference.current?.showModal();
  }, []);

  useEffect(() => {
    getNoti();

    socket.on("new_booking", getNoti);
    socket.on("new_review", getNoti);

    return () => {
      socket.off("new_booking", getNoti);
      socket.off("new_review", getNoti);
    };
  }, []);

  console.log(notiData);
  console.log(markRead)

  return (
    <dialog
      ref={reference}
      onClose={() => router.back()}
      className="p-6 rounded-xl shadow-2xl max-w-lg w-full
          backdrop:bg-black/40
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          flex flex-col overflow-y-auto"
    >
      <NotificationDataBox data={notiData} markingState={setMarkRead} isModal={true} readData={markRead}/>
      <div className="flex justify-end gap-3 mt-4 sticky">
        <Button
          variant="default"
          onClick={async() => {
            markNotiRead(markRead)
            reference.current?.close();
          }}
        >
          Close
        </Button>
      </div>
    </dialog>
  );
}

export default NotifModal;
