import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { requireUser } from "@/data/user/require-user";
import { getQueryClient, trpc } from "@/services/trpc/server";
import { CallView } from "../_components/call-view";

interface MeetingPageProps {
  params: Promise<{ meetingId: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  await requireUser();
  const { meetingId } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CallView meetingId={meetingId} />
    </HydrationBoundary>
  );
}
