import { Ban, Video } from "lucide-react";
import Link from "next/link";
import EmptyState from "./empty-state";
import { Button } from "./ui/button";

interface UpcomingStateProps {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: UpcomingStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-md bg-background">
    <EmptyState
      description="Once you start the meeting, a summary of the meeting will appear here."
      image="/upcoming.svg"
      title="Meeting has not started yet."
    />
    <div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
      <Button
        className="w-full md:w-auto"
        disabled={isCancelling}
        onClick={onCancelMeeting}
        size="sm"
        variant="outline"
      >
        <Ban />
        Cancel meeting
      </Button>
      <Button
        asChild
        className="w-full md:w-auto"
        disabled={isCancelling}
        size="sm"
      >
        <Link className="flex items-center gap-x-2" href={`/call/${meetingId}`}>
          <Video />
          Start Meeting
        </Link>
      </Button>
    </div>
  </div>
);
