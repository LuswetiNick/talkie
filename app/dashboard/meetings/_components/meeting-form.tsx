import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { meetingsInsertSchema } from "@/data/meetings/schemas";
import type { MeetingGetOne } from "@/data/meetings/types";
import { useTRPC } from "@/services/trpc/client";
import { NewAgentDialog } from "../../agents/_components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const [agentsSearch, setAgentsSearch] = useState("");
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const trpc = useTRPC();
  //   const router = useRouter();
  const queryClient = useQueryClient();
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentsSearch })
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        // TODO:Invalidate free tier usage
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create meeting");
      },
    })
  );
  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update meeting");
        // TODO: Check if error code is "FORBIDDEN", redirect to /dashboard/upgrade
      },
    })
  );
  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });
  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };
  return (
    <>
      <NewAgentDialog
        onOpenChange={setOpenNewAgentDialog}
        open={openNewAgentDialog}
      />

      <form id="meeting-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="meeting-form-name">
                  Meeting Name
                </FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  id="meeting-form-name"
                  placeholder="Name your meeting"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="agentId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="meeting-form-agentId">Agent</FieldLabel>
                <CommandSelect
                  onSearch={setAgentsSearch}
                  onSelect={field.onChange}
                  options={(agents.data?.items ?? []).map((agent) => ({
                    id: agent.id,
                    value: agent.id,
                    children: (
                      <div className="flex items-center gap-x-2">
                        <GeneratedAvatar
                          className="size-6"
                          seed={agent.name}
                          variant="bottts"
                        />
                        <span>{agent.name}</span>
                      </div>
                    ),
                  }))}
                  placeholder="Select an agent"
                  value={field.value}
                />
                <FieldDescription>
                  Not found the agent you&apos;re looking for?
                  <Button
                    className="text-primary hover:underline"
                    onClick={() => setOpenNewAgentDialog(true)}
                    size="sm"
                    type="button"
                    variant="link"
                  >
                    Create a new agent
                  </Button>
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Field className="mt-4 justify-end" orientation="horizontal">
          {onCancel && (
            <Button
              onClick={() => onCancel()}
              size="sm"
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} size="sm" type="submit">
            {isEdit ? "Save Changes" : "Create Meeting"}
          </Button>{" "}
        </Field>
      </form>
    </>
  );
};
