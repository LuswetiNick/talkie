import { ChevronRight, EllipsisVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MeetingIdHeaderProps {
  meetingId: string;
  meetingName: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const MeetingIdHeader = ({
  meetingId,
  meetingName,
  onEdit,
  onRemove,
}: MeetingIdHeaderProps) => (
  <div className="flex items-center justify-between">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className="font-medium text-lg text-muted-foreground"
          >
            <Link href="/dashboard/meetings">My Meetings</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="font-medium text-foreground text-xl">
          <ChevronRight className="size-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className="font-medium text-foreground text-lg"
          >
            <Link href={`/dashboard/meetings/${meetingId}`}>{meetingName}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Meeting actions" size="icon-lg" variant="outline">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="size-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRemove}>
          <Trash className="size-4" /> Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
