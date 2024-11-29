import { BetaUser } from "@youmeet/gql/generated";
import PageListContainer from "@youmeet/ui/dashboardComponents/PageListContainer";
import PageFilters from "@youmeet/ui/dashboardComponents/PageFilters";

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
