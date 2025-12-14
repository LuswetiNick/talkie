import { ResponsiveDialog } from "@/components/responsive-dialog";
import type { MeetingGetOne } from "@/data/meetings/types";
import { MeetingForm } from "./meeting-form";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) => (
  <ResponsiveDialog
    description="Edit the meeting details"
    onOpenChange={onOpenChange}
    open={open}
    title="Edit Meeting"
  >
    <MeetingForm
      initialValues={initialValues}
      onCancel={() => onOpenChange(false)}
      onSuccess={() => {
        onOpenChange(false);
      }}
    />
  </ResponsiveDialog>
);
