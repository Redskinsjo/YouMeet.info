import { ReactElement } from "react";
import DashboardFeatures from "@youmeet/app/dashboard/dashboardComponents/dashboardFeatures";

export default function Layout({
  children,
  sharingModal,
}: {
  children: React.ReactNode;
  sharingModal: ReactElement;
}) {
  return (
    <div className="flex-1 flex flex-col bg-grey100 dark:darkBg afterHeader">
      <DashboardFeatures />
      {children}
    </div>
  );
}
