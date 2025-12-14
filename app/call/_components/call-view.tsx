"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ErrorState from "@/components/error-state";
import { useTRPC } from "@/services/trpc/client";
import { CallProvider } from "./call-provider";

interface CallViewProps {
  meetingId: string;
}

export const CallView = ({ meetingId }: CallViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (data.status === "completed") {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState
          description="This meeting has been completed and is no longer active."
          title="Meeting has ended"
        />
      </div>
    );
  }

  return <CallProvider meetingId={data.id} meetingName={data.name} />;
};
