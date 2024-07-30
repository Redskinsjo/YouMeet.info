import DashboardFeatures from "@youmeet/ui/dashboard/dashboardComponents/dashboardFeatures";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col bg-grey100 dark:darkBg afterHeader">
      <DashboardFeatures />
      {children}
    </div>
  );
}
