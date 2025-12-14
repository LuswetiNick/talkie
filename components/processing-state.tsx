import EmptyState from "./empty-state";

export const ProcessingState = () => (
  <div className="flex flex-col items-center justify-center rounded-md bg-background">
    <EmptyState
      description="The meeting is currently being processed. A summary will appear soon."
      image="/processing.svg"
      title="Meeting completed"
    />
  </div>
);
