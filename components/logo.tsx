import { SquaresExclude } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 self-center font-semibold">
      <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <SquaresExclude className="size-4" />
      </div>
      Talkie.
    </div>
  );
}
