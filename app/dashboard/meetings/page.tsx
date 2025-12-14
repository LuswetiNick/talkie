import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { requireUser } from "@/data/user/require-user";
import { getQueryClient, trpc } from "@/services/trpc/server";
import MeetingsHeader from "./_components/meetings-header";
import MeetingsView, {
  MeetingsViewError,
  MeetingsViewLoading,
} from "./_components/meetings-view";

interface MeetingsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  await requireUser();
  const filters = await searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({ ...filters })
  );

  return (
    <>
      <MeetingsHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
