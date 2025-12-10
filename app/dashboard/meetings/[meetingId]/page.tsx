export default async function MeetingPage({
  params,
}: {
  params: { meetingId: string };
}) {
  const { meetingId } = params;
  return <div>Meeting Page for meeting ID: {meetingId}</div>;
}
