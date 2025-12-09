import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => (
  <ResponsiveDialog
    description="Create new agent"
    onOpenChange={onOpenChange}
    open={open}
    title="New Agent"
  >
    <AgentForm
      onCancel={() => onOpenChange(false)}
      onSuccess={() => onOpenChange(false)}
    />
  </ResponsiveDialog>
);
