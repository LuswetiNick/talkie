import { Button } from "@/components/ui/button";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const CallEnded = () => (
  <div className="flex h-full flex-col items-center justify-center">
    <div className="flex flex-1 items-center justify-center px-8 py-4">
      <div className="flex flex-col items-center gap-y-4 rounded-md bg-muted px-8 py-4 shadow">
        <div className="flex flex-col text-center">
          <h2 className="font-semibold text-lg">You have ended the call.</h2>
          <p className="text-muted-foreground text-sm">
            Summary will appear shortly
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/dashboard/meetings">
            <ArrowLeft /> Back to Meetings
          </Link>
        </Button>
      </div>
    </div>
  </div>
);
