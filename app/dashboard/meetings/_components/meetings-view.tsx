"use client";

import { useQuery } from "@tanstack/react-query";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/services/trpc/client";

export default function MeetingsView() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));
  return <div>{JSON.stringify(data)}</div>;
}

export const MeetingsViewLoading = () => (
  <LoadingState
    description="This may take a few seconds..."
    title="Loading Meetings"
  />
);
export const MeetingsViewError = () => (
  <ErrorState
    description="There was an error loading meetings."
    title="Oops! Something went wrong."
  />
);
