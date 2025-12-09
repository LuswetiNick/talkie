import { Loader } from "lucide-react";

interface LoadingStateProps {
  title: string;
  description: string;
}

export default function LoadingState({
  title,
  description,
}: LoadingStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4 px-8">
      <div className="flex flex-col items-center justify-center gap-y-6 rounded-md border bg-background p-10">
        <Loader
          aria-hidden="true"
          className="size-6 animate-spin text-primary"
        />
        <div className="flex flex-col gap-y-2 text-center">
          <h2 className="font-semibold text-lg">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
