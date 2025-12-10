import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { requireUser } from "@/data/user/require-user";
import { getQueryClient, trpc } from "@/services/trpc/server";
import MeetingsView, {
  MeetingsViewError,
  MeetingsViewLoading,
} from "./_components/meetings-view";

export default async function MeetingsPage() {
  await requireUser();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLoading />}>
        <ErrorBoundary fallback={<MeetingsViewError />}>
          <MeetingsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
