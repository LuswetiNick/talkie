import Image from "next/image";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

interface EmptyStateProps {
  title: string;
  description: string;
  image?: string;
}

export default function EmptyState({
  title,
  description,
  image = "/empty.svg",
}: EmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Image alt="Empty state" height={200} src={image} width={200} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
