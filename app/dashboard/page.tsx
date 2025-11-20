import { requireUser } from "@/data/user/require-user";

export default async function DashboardPage() {
  await requireUser();
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      Dashboard Page
    </div>
  );
}
