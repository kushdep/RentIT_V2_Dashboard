"use client";
import { useEffect } from "react";
import socket from "@/lib/socket";

function SocketProvider() {
  useEffect(() => {
    console.log(socket);
    console.log(socket.on);
    console.log(socket.id);
    socket.on("error", (error) => {
      console.log(error);
    });
    const onConnect = () => console.log("socket connected", socket.id);
    const onDisconnect = () => console.log("socket disconnected");
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

  }, []);

  return null;
}

export default SocketProvider;
