import { requireUser } from "@/data/user/require-user";

export default async function DashboardPage() {
  await requireUser();
  return <div>Dashboard Page</div>;
}
