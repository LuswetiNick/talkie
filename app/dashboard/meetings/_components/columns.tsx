"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import {
  CircleCheck,
  CircleX,
  ClockArrowUp,
  ClockFading,
  Loader,
} from "lucide-react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import type { MeetingGetMany } from "@/data/meetings/types";
import { cn } from "@/lib/utils";

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: ClockArrowUp,
  active: Loader,
  completed: CircleCheck,
  processing: Loader,
  canceled: CircleX,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  processing: "bg-gray-500/20 text-gray-800 border-gray-800/5",
  canceled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
};

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-y-1">
        <span className="font-semibold capitalize">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "agent",
    header: "Agent",
    cell: ({ row }) => (
      <div className="flex items-center gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            className="size-6"
            seed={row.original.agent.name}
            variant="bottts"
          />
          <span className="font-medium capitalize">
            {row.original.agent.name}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const StatusIcon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];
      return (
        <Badge
          className={cn(
            "text-muted-foreground capitalize [&>svg]:size-4",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
          variant="outline"
        >
          <StatusIcon
            className={cn(
              row.original.status === "processing" && "animate-spin"
            )}
          />
          <span>{row.original.status}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "startedAt",
    header: "Started At",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.startedAt ? format(row.original.startedAt, "MMM d") : ""}
      </span>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <Badge
        className="flex items-center gap-x-2 capitalize [&>svg]:size-4"
        variant="outline"
      >
        <ClockFading className="text-primary" />
        {row.original.duration
          ? formatDuration(row.original.duration)
          : "No duration"}
      </Badge>
    ),
  },
];
