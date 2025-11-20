import { requireUser } from "@/data/user/require-user";

export default async function MeetingsPage() {
  await requireUser();

  return <div>Meetings Page</div>;
}
