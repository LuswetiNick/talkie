import {
  CircleCheck,
  CircleX,
  ClockArrowUp,
  Loader,
  Video,
} from "lucide-react";
import { CommandSelect } from "@/components/command-select";
import { MeetingStatus } from "@/data/meetings/types";
import { useMeetingsFilters } from "@/hooks/use-meetings-filters";

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUp />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheck />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <Video />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <Loader />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Canceled,
    value: MeetingStatus.Canceled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleX />
        {MeetingStatus.Canceled}
      </div>
    ),
  },
];

export const MeetingStatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  return (
    <CommandSelect
      className="h-9"
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      options={options}
      placeholder="status"
      value={filters.status ?? ""}
    />
  );
};
