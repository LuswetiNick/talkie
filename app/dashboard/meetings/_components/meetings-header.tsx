"use client";
import { XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/config/constants";
import { useMeetingsFilters } from "@/hooks/use-meetings-filters";
import { AgentIdFilter } from "./agent-id-filter";
import { MeetingStatusFilter } from "./meeting-status-filter";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { NewMeetingDialog } from "./new-meeting-dialog";

export default function MeetingsHeader() {
  const [isNewMeetingDialogOpen, setIsNewMeetingDialogOpen] = useState(false);
  const [filters, setFilters] = useMeetingsFilters();
  const isAnyFilterModified =
    !!filters.status || !!filters.search || !!filters.agentId;
  const onClearFilters = () => {
    setFilters({ status: null, search: "", agentId: "", page: DEFAULT_PAGE });
  };
  return (
    <>
      <NewMeetingDialog
        onOpenChange={setIsNewMeetingDialogOpen}
        open={isNewMeetingDialogOpen}
      />
      <header className="flex w-full flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-xl">My Meetings</h1>
          <Button onClick={() => setIsNewMeetingDialogOpen(true)} size="sm">
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <MeetingStatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button onClick={onClearFilters} size="sm" variant="outline">
                <XCircle className="size-4" />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </header>
    </>
  );
}
