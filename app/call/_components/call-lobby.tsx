import {
  DefaultVideoPlaceholder,
  type StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { CircleAlert, LogIn } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface CallUIProps {
  onJoinCall: () => void;
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "User",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user.id ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => (
  <Alert>
    <CircleAlert />
    <AlertTitle>Allow browser permissions</AlertTitle>
    <AlertDescription>
      Please grant your browser permission to access your camera and microphone
      to join the call.
    </AlertDescription>
  </Alert>
);

export const CallLobby = ({ onJoinCall }: CallUIProps) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();
  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();

  const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission;

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-1 items-center justify-center px-8 py-4">
        <div className="flex flex-col items-center gap-y-4 rounded-md bg-muted px-8 py-4 shadow">
          <div className="flex flex-col text-center">
            <h2 className="font-semibold text-lg">You're almost ready!</h2>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermission
                ? DisabledVideoPreview
                : AllowBrowserPermissions
            }
          />
          <div className="flex gap-x-2">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className="flex w-full justify-between gap-x-2">
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard/meetings">Cancel</Link>
            </Button>
            <Button onClick={onJoinCall} size="sm">
              <LogIn /> Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
