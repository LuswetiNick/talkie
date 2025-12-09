import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "@/hooks/use-agents-filters";

export const AgentsSearchFilter = () => {
  const [filter, setFilter] = useAgentsFilters();

  return (
    <div className="relative">
      <Input
        className="max-w-sm pl-7"
        onChange={(e) => setFilter({ search: e.target.value })}
        placeholder="filter by name"
        value={filter.search}
      />
      <Search className="-translate-y-1/2 absolute top-1/2 left-2 size-4 text-muted-foreground" />
    </div>
  );
};
