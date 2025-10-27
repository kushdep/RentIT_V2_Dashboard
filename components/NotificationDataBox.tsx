"use client";

import { NotificationType } from "@/dataInterfaces";
import { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { markNotiRead } from "../actions/sidebarActions";

function NotificationDataBox({ data,markingState }: { data: NotificationType[],markingState?:React.Dispatch<React.SetStateAction<string[]>> }) {
  const [ntfType, setNtfType] = useState("BKG");
  const router = useRouter()
  const modalSegment = useSelectedLayoutSegment('modal');

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
      <ScrollArea className={`mt-3 p-3 flex flex-col overflow-hidden ${modalSegment?'h-64 ':'h-full'}`}>
          {data.length > 0 ? (
            data.map((d,i) => {
              if (ntfType !== d.ntfType) return;
              const today = new Date().getTime();
              console.log(today)
              const timeDiff = Math.floor((today - new Date(d.timeStamp).getTime()) / 1000);
              let time = new Date(d.timeStamp).toLocaleDateString();
              console.log(timeDiff);
              if (timeDiff <= 12 * 3600) {
                  if (timeDiff < 3600) {
                    time = `${Math.floor(timeDiff / 60)}m ago`;
                } else {
                  time = `${Math.floor(timeDiff /3600)}h ago`;
                }
              }

              return (
                <div className="border-b mt-2 rounded-xl gap-2 bg-green-600/10 p-2" key={i}>
                  <div className="mr-3">{d.message}</div>
                  <div className="">
                    <div className="flex gap-2 justify-end mr-2">
                      <Button
                        variant={"outline"}
                        className="h-7 px-2 py-1 text-xs"
                        onClick={()=>{
                            if(modalSegment && markingState!==null){
                                markingState((prev)=>[...prev,d._id])
                                return
                            }
                            markNotiRead(d._id)
                        }}
                      >
                        Mark as read
                      </Button>
                      {
                        d.ntfType==='BKG' &&
                      <Button
                        variant={"default"}
                        className="h-7 px-2 py-1 text-xs"
                        onClick={()=>router.push("/dashboard/guests/upcoming")}
                      >
                        See Details
                      </Button>
                    }
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
