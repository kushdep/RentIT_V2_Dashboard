import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { IconMail } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import toast from "react-hot-toast";
import socket from "@/lib/socket";
import { getNotification } from "@/actions/sidebarActions";

function NotificationInbox() {
  const router = useRouter();
  const [noti, setNoti] = useState<number | null>(null);

  useEffect(() => {
    function handleNoti(loc: any) {
      setNoti((prev) => (prev || 0) + 1);
      toast(`🔔 ${loc.message} of ${loc.locName}`);
    }

    socket.on("new_booking", handleNoti);
    socket.on("new_review", handleNoti);

    return () => {
      socket.off("new_booking", handleNoti);
      socket.off("new_review", handleNoti);
    };
  }, []);

  useEffect(() => {
    async function getNoti() {
      try {
        const res = await getNotification();
        setNoti(res?.success ? res.payload.notiLen : 0);
      } catch (error) {
        console.error("Error in getNOti " + error);
        setNoti(0);
      }
    }
    getNoti();
  }, []);

  console.log(noti);
  return (
    <div className="w-10 flex flex-row gap-0">
      <Button
        size="icon"
        className="size-8 flex group-data-[collapsible=icon]:opacity-0 "
        variant="outline"
        onClick={() => {
          router.push("/dashboard/notifications");
        }}
      >
        <span className="sr-only">Inbox</span>
        <IconMail />
      </Button>
      {noti !== null && noti > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full flex items-center justify-center p-2 w-7"
        >
          {noti < 99 ? noti : `99+`}
        </Badge>
      )}
    </div>
  );
}

export default NotificationInbox;
