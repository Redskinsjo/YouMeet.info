import { BetaUser } from "@youmeet/gql/generated";
import React from "react";
import PageListContainer from "@youmeet/ui/dashboardComponents/PageListContainer";
import PageFilters from "@youmeet/ui/dashboardComponents/PageFilters";

export default function MyOffersChild({ profil }: { profil: BetaUser }) {
  return (
    <div className="relative flex-1 h-full min-h-screen flex flex-col pb-[240px]">
      <div className="flex w-full relative xs:flex-col sm:flex-col md:flex-col">
        <PageFilters />
        <PageListContainer dataType="favorites" profil={profil} />
      </div>
    </div>
  );
}
