import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Link from "next/link";

interface CallActiveProps {
  onLeaveCall: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeaveCall, meetingName }: CallActiveProps) => (
  <div className="flex h-full flex-col justify-between p-4">
    <div>
      <Link href="/dashboard/meetings">
        <h4>{meetingName}</h4>
      </Link>
    </div>
    <SpeakerLayout />
    <div className="rounded-md bg-muted px-4">
      <CallControls onLeave={onLeaveCall} />
    </div>
  </div>
);
