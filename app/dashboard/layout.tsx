import DashboardHeader from "./_components/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <DashboardHeader />
      <section className="flex flex-1 flex-col">{children}</section>
    </main>
  );
}
