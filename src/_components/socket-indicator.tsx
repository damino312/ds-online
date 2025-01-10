"use client";

import { useSocket } from "@/app/providers/socket-provider";
import { Badge } from "./ui/badge";

export function SocketIndicator() {
  const { isConnected } = useSocket();
  return (
    <Badge
      variant="outline"
      className={` rounded-full ${
        isConnected ? "bg-green-600" : "bg-yellow-600"
      }`}
    >
      {isConnected
        ? "Live: Real-time updates "
        : "Fallback: Pulling every 1 second"}
    </Badge>
  );
}
