import { ResponsiveDialog } from "@/components/responsive-dialog";
import type { AgentGetOne } from "@/data/agents/types";
import { AgentForm } from "../../_components/agent-form";

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: AgentGetOne;
}

export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) => (
  <ResponsiveDialog
    description="Update agent"
    onOpenChange={onOpenChange}
    open={open}
    title="Update Agent"
  >
    <AgentForm
      initialValues={initialValues}
      onCancel={() => onOpenChange(false)}
      onSuccess={() => onOpenChange(false)}
    />
  </ResponsiveDialog>
);
