import { Video } from "lucide-react";
import Link from "next/link";
import EmptyState from "./empty-state";
import { Button } from "./ui/button";

interface ActiveStateProps {
  meetingId: string;
}

export const ActiveState = ({ meetingId }: ActiveStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-md bg-background">
    <EmptyState
      description="The meeting will end once all participants leave."
      image="/upcoming.svg"
      title="Meeting is active"
    />

    <Button asChild className="w-full md:w-auto" size="sm">
      <Link
        className="flex items-center gap-x-2"
        href={`/dashboard/call/${meetingId}`}
      >
        <Video />
        Join Meeting
      </Link>
    </Button>
  </div>
);
