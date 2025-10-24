"use client";

import { IconMail, type Icon } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserCheckIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { getNotification } from "@/actions/sidebarActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const [noti, setNoti] = useState<Number | null>(null);
  const router = useRouter()

  useEffect(() => {
    function handleNoti(loc:any) {
      setNoti((prev) => prev || 0 + 1);
      toast(`${loc.message} of ${loc.locName}`)
    }
    socket.on("new_booking",handleNoti)
    socket.on("new_review",handleNoti)
    if (!noti && noti !== 0) {
      async function getNoti() {
        console.log("calling server ACTION")
        const res = await getNotification();
        if (!res.success) {
          setNoti(0);
        }
        setNoti(res.payload);
      }
      getNoti();
    }
  }, []);
console.log(noti)
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Link href={"/dashboard/manage-guests/check-in"} className="w-50">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground "
              >
                <div className="p-5 flex items-center gap-1">
                  <UserCheckIcon className="size-4" />
                  <span>Check - In</span>
                </div>
              </SidebarMenuButton>
            </Link>
            <div className="w-10 flex flex-row gap-0">
              <Button
                size="icon"
                className="size-8 flex group-data-[collapsible=icon]:opacity-0 "
                variant="outline"
                onClick={()=>{
                  router.push('/dashboard/notifications')
                  setNoti(0)
                }}
              >
                <span className="sr-only">Inbox</span>
                <IconMail />
              </Button>
              {noti!==null && noti && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full flex items-center justify-center p-2"
                >
                  {noti < 99 ? noti : `99+`}
                </Badge>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                <Link
                  href={item.url}
                  className="flex gap-2 place-items-center w-100"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
