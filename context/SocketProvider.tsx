"use client";
import { useEffect } from "react";
import socket from "@/lib/socket";

function SocketProvider() {
  useEffect(() => {
    const onConnect = () => console.log("socket connected", socket.id);
    const onDisconnect = () => console.log("socket disconnected");
    socket.on("connected", onConnect);
    socket.on("disconnected", onDisconnect);

    return () => {
      socket.off("connected", onConnect);
      socket.off("disconnected", onDisconnect);
    };
  }, []);

  return null;
}

export default SocketProvider
