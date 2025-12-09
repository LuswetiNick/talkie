"use client";
import { XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE } from "@/config/constants";
import { useAgentsFilters } from "@/hooks/use-agents-filters";
import { AgentsSearchFilter } from "./agents-search-filter";
import { NewAgentDialog } from "./new-agent-dialog";

export default function AgentsHeader() {
  const [filter, setFilter] = useAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFieldModified = !!filter.search;

  const onClearFilters = () => setFilter({ search: "", page: DEFAULT_PAGE });

  return (
    <>
      <NewAgentDialog onOpenChange={setIsDialogOpen} open={isDialogOpen} />
      <header className="flex w-full flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl">My Agents</h1>
          <Button onClick={() => setIsDialogOpen(true)} size="sm">
            Create Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          {isAnyFieldModified && (
            <Button onClick={onClearFilters} size="sm" variant="outline">
              <XCircle className="size-4" />
              Clear
            </Button>
          )}
        </div>
      </header>
    </>
  );
}
