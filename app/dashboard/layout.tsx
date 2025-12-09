import DashboardHeader from "./_components/dashboard-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <DashboardHeader />
      <section className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:px-6 lg:gap-8 lg:px-8">
        {children}
      </section>
    </main>
  );
}
