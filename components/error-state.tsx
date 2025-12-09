import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title: string;
  description: string;
}

export default function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4 px-8">
      <div
        className="flex flex-col items-center justify-center gap-y-6 rounded-md border bg-background p-10 shadow"
        role="alert"
      >
        <AlertCircle aria-hidden="true" className="size-6 text-destructive" />
        <div className="flex flex-col gap-y-2 text-center">
          <h2 className="font-semibold text-lg">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
