"use client";

import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { CallConnect } from "./call-connect";

interface CallProviderProps {
  meetingId: string;
  meetingName: string;
}

export const CallProvider = ({ meetingId, meetingName }: CallProviderProps) => {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader
          aria-label="Loading session"
          className="size-6 animate-spin text-primary"
        />
      </div>
    );
  }
  if (!session) {
    return redirect("/auth/get-started");
  }
  const { id, name, image } = session.user;
  if (!id || !name) {
    return null;
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={id}
      userImage={
        image ?? generateAvatarUri({ seed: name, variant: "initials" })
      }
      userName={name}
    />
  );
};
