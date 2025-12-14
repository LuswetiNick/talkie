"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { useMeetingsFilters } from "@/hooks/use-meetings-filters";
import { useTRPC } from "@/services/trpc/client";

export const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [agentsSearch, setAgentsSearch] = useState("");
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({ search: agentsSearch, pageSize: 100 })
  );
  return (
    <CommandSelect
      className="h-9"
      onSearch={setAgentsSearch}
      onSelect={(value) => setFilters({ agentId: value })}
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              className="size-4"
              seed={agent.name}
              variant="bottts"
            />
            {agent.name}
          </div>
        ),
      }))}
      placeholder="agent"
      value={filters.agentId ?? ""}
    />
  );
};
