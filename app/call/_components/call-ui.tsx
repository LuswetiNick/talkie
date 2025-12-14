"use client";

import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { toast } from "sonner";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";
import { CallLobby } from "./call-lobby";

interface CallUIProps {
  meetingName: string;
}

export const CallUI = ({ meetingName }: CallUIProps) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");
  const handleJoinCall = async () => {
    if (!call) return;
    try {
      await call.join();
      setShow("call");
    } catch (error) {
      console.error("Failed to join call:", error);
      toast.error("Unable to join the call. Please try again.");
    }
  };
  const handleLeaveCall = () => {
    if (!call) return;
    call.endCall();
    setShow("ended");
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoinCall={handleJoinCall} />}
      {show === "call" && (
        <CallActive meetingName={meetingName} onLeaveCall={handleLeaveCall} />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};
