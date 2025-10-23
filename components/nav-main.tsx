"use client";

import {  IconMail, type Icon } from "@tabler/icons-react";
import Link from "next/link";
import {io} from "socket.io-client"
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

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Link href={"/dashboard/manage-guests/check-in"} className="w-50">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground duration-200 ease-linear"
              >
                <UserCheckIcon />
                <span>Check - In</span>
              </SidebarMenuButton>
            </Link>
            <div className="w-10 flex flex-row gap-0">
              <Button
                size="icon"
                className="size-8 flex group-data-[collapsible=icon]:opacity-0 "
                variant="outline"
              >
                <span className="sr-only">Inbox</span>
                <IconMail />
              </Button>
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full flex items-center justify-center"
              >
                1
              </Badge>
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
