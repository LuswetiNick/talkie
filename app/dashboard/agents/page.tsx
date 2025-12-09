import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { loadSearchParams } from "@/data/agents/params";
import { requireUser } from "@/data/user/require-user";
import { getQueryClient, trpc } from "@/services/trpc/server";
import AgentsHeader from "./_components/agents-header";
import AgentsView, {
  AgentsViewError,
  AgentsViewLoading,
} from "./_components/agents-view";

interface SearchParamsProps {
  searchParams: Promise<SearchParams>;
}

export default async function AgentsPage({ searchParams }: SearchParamsProps) {
  await requireUser();
  const filters = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );
  return (
    <>
      <AgentsHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
