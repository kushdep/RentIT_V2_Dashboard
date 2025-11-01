"use client";

import { getNotification } from "@/actions/sidebarActions";
import NotificationDataBox from "@/components/NotificationDataBox";
import socket from "@/lib/socket";
import { useEffect, useState } from "react";

function NotificationPage() {
  const [notiData, setNotiData] = useState([]);

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
    getNoti();
    
    socket.on("new_booking", getNoti);
    socket.on("new_review", getNoti);

    return () => {
      socket.off("new_booking", getNoti);
      socket.off("new_review", getNoti);
    };
  }, []);

  return (
    <div className="w-full border h-full">
      <NotificationDataBox data={notiData} isModal={false} />
    </div>
  );
}

export default NotificationPage;
