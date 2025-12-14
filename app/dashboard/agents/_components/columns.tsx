"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Video } from "lucide-react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import type { AgentGetMany } from "@/data/agents/types";

export const columns: ColumnDef<AgentGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex items-center">
        {" "}
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            className="size-6"
            seed={row.original.name}
            variant="bottts"
          />
          <span className="font-medium capitalize">{row.original.name}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "instructions",
    header: "Instructions",
    cell: ({ row }) => (
      <div className="max-w-sm truncate text-muted-foreground">
        {row.original.instructions}
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge className="flex items-center gap-x-2" variant="outline">
        <Video className="inline-block size-4 text-primary" />
        {row.original.meetingCount}{" "}
        {row.original.meetingCount === 1 ? "Meeting" : "Meetings"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="text-muted-foreground text-sm">
          {date.toLocaleDateString("en-KE", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      );
    },
  },
];
