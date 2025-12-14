"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DataPagination } from "@/components/data-pagination";
import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { DataTable } from "@/components/ui/data-table";
import { useAgentsFilters } from "@/hooks/use-agents-filters";
import { useTRPC } from "@/services/trpc/client";
import { columns } from "./columns";

export default function AgentsView() {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  if (data.items.length === 0) {
    return (
      <EmptyState
        description="Create an agent to join your meetings. Each agent will follow your instructions."
        title="No agents found"
      />
    );
  }
  return (
    <div className="flex flex-1 flex-col gap-y-4 pb-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row: { id: string }) =>
          router.push(`/dashboard/agents/${row.id}`)
        }
      />

      <DataPagination
        onPageChange={(page) => setFilters({ page })}
        page={filters.page}
        totalPages={data.totalPages}
      />
    </div>
  );
}

export const AgentsViewLoading = () => (
  <LoadingState
    description="This may take a few seconds..."
    title="Loading Agents"
  />
);
export const AgentsViewError = () => (
  <ErrorState
    description="There was an error loading agents."
    title="Oops! Something went wrong."
  />
);
