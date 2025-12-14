"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DataPagination } from "@/components/data-pagination";
import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { DataTable } from "@/components/ui/data-table";
import { useMeetingsFilters } from "@/hooks/use-meetings-filters";
import { useTRPC } from "@/services/trpc/client";
import { columns } from "./columns";

export default function MeetingsView() {
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ ...filters })
  );
  if (data.items.length === 0) {
    return (
      <EmptyState
        description="You have no meetings. Schedule a meeting to get started."
        title="No meetings found"
      />
    );
  }
  return (
    <div className="flex flex-1 flex-col gap-y-4 pb-4">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/dashboard/meetings/${row.id}`)}
      />
      <DataPagination
        onPageChange={(page) => setFilters({ page })}
        page={filters.page}
        totalPages={data.totalPages}
      />
    </div>
  );
}

export const MeetingsViewLoading = () => (
  <LoadingState
    description="This may take a few seconds..."
    title="Loading Meetings"
  />
);
export const MeetingsViewError = () => (
  <ErrorState
    description="There was an error loading meetings."
    title="Oops! Something went wrong."
  />
);
