"use client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ErrorState from "@/components/error-state";
import { GeneratedAvatar } from "@/components/generated-avatar";
import LoadingState from "@/components/loading-state";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/services/trpc/client";
import { AgentIdHeader } from "./agents-id-header";
import { UpdateAgentDialog } from "./update-agent-dialog";

interface AgentIdViewProps {
  agentId: string;
}

export default function AgentsIdView({ agentId }: AgentIdViewProps) {
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        // TODO:Invalidate free tier usage

        router.push("/dashboard/agents");
      },
      onError: (error) => {
        toast.error(error.message || "There was an error removing the agent.");
      },
    })
  );
  const [RemoveAgentConfirmation, confirmRemoveAgent] = useConfirm(
    "Confirm Remove Agent",
    `Are you sure you want to remove the agent ${data.name}? This action cannot be undone. All ${data.meetingCount} associated meetings will also be deleted.`
  );
  const handleRemoveAgent = async () => {
    const ok = await confirmRemoveAgent();
    if (!ok) return;
    await removeAgent.mutateAsync({ id: agentId });
  };
  return (
    <>
      <RemoveAgentConfirmation />
      <UpdateAgentDialog
        initialValues={data}
        onOpenChange={setUpdateAgentDialogOpen}
        open={updateAgentDialogOpen}
      />
      <div className="flex flex-1 flex-col gap-y-4">
        <AgentIdHeader
          agentId={data.id}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="rounded-md border bg-card">
          <div className="col-span-5 flex flex-col gap-y-4 p-4">
            <div className="flex items-center gap-x-2">
              <GeneratedAvatar
                className="size-10"
                seed={data.name}
                variant="bottts"
              />
              <h2 className="font-semibold text-2xl">{data.name}</h2>
            </div>
            <Badge className="flex items-center gap-x-2" variant="outline">
              <Video className="size-4 text-primary" />
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "Meeting" : "Meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="font-medium text-lg">Instructions</p>
              <p className="text-muted-foreground">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const AgentIdViewLoading = () => (
  <LoadingState
    description="This may take a few seconds..."
    title="Loading Agent"
  />
);

export const AgentIdViewError = () => (
  <ErrorState
    description="There was an error loading the agent."
    title="Oops! Something went wrong."
  />
);
