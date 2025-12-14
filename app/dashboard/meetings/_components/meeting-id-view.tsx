"use client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ActiveState } from "@/components/active-state";
import { CanceledState } from "@/components/canceled-state";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { ProcessingState } from "@/components/processing-state";
import { UpcomingState } from "@/components/upcoming-state";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/services/trpc/client";
import { MeetingIdHeader } from "./meeting-id-header";
import { UpdateMeetingDialog } from "./update-meeting-dialog";

interface MeetingIdViewProps {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: MeetingIdViewProps) => {
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        // TODO:Invalidate free tier usage
        router.push("/dashboard/meetings");
      },
      onError: (error) => {
        toast.error(
          error.message || "There was an error removing the meeting."
        );
      },
    })
  );
  const [RemoveMeetingConfirmation, confirmRemoveMeeting] = useConfirm(
    "Confirm Remove Meeting:",
    `Are you sure you want to remove the meeting ${data.name}? This action cannot be undone.`
  );
  const handleRemoveMeeting = async () => {
    const ok = await confirmRemoveMeeting();
    if (!ok) return;
    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCompleted = data.status === "completed";
  const isCanceled = data.status === "canceled";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveMeetingConfirmation />
      <UpdateMeetingDialog
        initialValues={data}
        onOpenChange={setUpdateMeetingDialogOpen}
        open={updateMeetingDialogOpen}
      />
      <MeetingIdHeader
        meetingId={meetingId}
        meetingName={data.name}
        onEdit={() => setUpdateMeetingDialogOpen(true)}
        onRemove={handleRemoveMeeting}
      />
      <div className="flex flex-1 flex-col gap-y-4">
        {isCanceled && <CanceledState />}
        {isCompleted && <div>Completed</div>}
        {isProcessing && <ProcessingState />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            isCancelling={false}
            meetingId={meetingId}
            onCancelMeeting={() => {}}
          />
        )}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => (
  <LoadingState
    description="This may take a few seconds..."
    title="Loading Meeting"
  />
);

export const MeetingIdViewError = () => (
  <ErrorState
    description="There was an error loading the meeting."
    title="Oops! Something went wrong."
  />
);
