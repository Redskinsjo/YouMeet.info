import { BetaUser } from "@youmeet/gql/generated";
import PageListContainer from "@youmeet/components/dashboard/dashboardComponents/PageListContainer";
import PageFilters from "@youmeet/components/dashboard/dashboardComponents/PageFilters";

export default function DashboardChild({ profil }: { profil: BetaUser }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex w-full xs:flex-col sm:flex-col md:flex-col">
        <PageFilters />
        <PageListContainer profil={profil} dataType="candidates" />
      </div>
    </div>
  );
}
