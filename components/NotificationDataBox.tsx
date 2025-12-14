"use client";

import { NotificationType } from "@/dataInterfaces";
import { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";
import { markNotiRead } from "../actions/sidebarActions";

function NotificationDataBox({
  data,
  markingState,
  isModal,
  readData,
}: {
  data: NotificationType[];
  markingState?: React.Dispatch<React.SetStateAction<string[]>>;
  isModal: boolean;
  readData?: string[];
}) {
  const [ntfType, setNtfType] = useState("BKG");
  const router = useRouter();

  return (
    <div className="mt-3 h-full ">
      <div className="flex justify-around">
        <Button
          onClick={() => setNtfType("BKG")}
          variant={ntfType === "BKG" ? "default" : "outline"}
        >
          Bookings
        </Button>
        <Button
          onClick={() => setNtfType("RVW")}
          variant={ntfType === "RVW" ? "default" : "outline"}
        >
          Reviews
        </Button>
      </div>
      <ScrollArea
        className={`mt-3 p-3 flex flex-col overflow-hidden ${
          isModal ? "h-64 " : "h-full"
        }`}
      >
        {data.length > 0 ? (
          data.map((d, i) => {
            if (ntfType !== d.ntfType) return;
            const today = new Date().getTime();
            const timeDiff = Math.floor(
              (today - new Date(d.timeStamp).getTime()) / 1000
            );
            let time = new Date(d.timeStamp).toLocaleDateString();
            if (timeDiff <= 12 * 3600) {
              if (timeDiff < 3600) {
                time = `${Math.floor(timeDiff / 60)}m ago`;
              } else {
                time = `${Math.floor(timeDiff / 3600)}h ago`;
              }
            }
            let isVwd = false;

            if (d.isVwd) {
              isVwd = true;
            } else {
              isVwd= readData && readData?.length > 0 ? readData.includes(d._id) : false;
            }

            return (
              <div
                className={`border mt-2 rounded-xl gap-2 ${
                  isVwd ? "" : "bg-green-600/10"
                } p-2`}
                key={i}
              >
                <div className="mr-3">{d.message}</div>
                <div className="">
                  <div className="flex gap-2 justify-end mr-2">
                    {!isVwd && (
                      <Button
                        variant={"outline"}
                        className="h-7 px-2 py-1 text-xs"
                        onClick={() => {
                          if (isModal && markingState) {
                            markingState((prev) => [...prev, d._id]);
                            return;
                          }
                          console.log(d._id);
                          markNotiRead(d._id);
                        }}
                      >
                        Mark as read
                      </Button>
                    )}
                    {d.ntfType === "BKG" && (
                      <Button
                        variant={"default"}
                        className="h-7 px-2 py-1 text-xs"
                        onClick={() =>
                          router.push("/dashboard/guests/upcoming")
                        }
                      >
                        See Details
                      </Button>
                    )}
                  </div>
                  <div className="text-xs text-end text-gray-500 mr-2">
                    {time}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>No Notifications</>
        )}
      </ScrollArea>
    </div>
  );
}

export default NotificationDataBox;
