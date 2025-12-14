import EmptyState from "./empty-state";

export const CanceledState = () => (
  <div className="flex flex-col items-center justify-center rounded-md bg-background">
    <EmptyState
      description="The meeting has been canceled and will not take place."
      image="/cancelled.svg"
      title="Meeting is canceled"
    />
  </div>
);
