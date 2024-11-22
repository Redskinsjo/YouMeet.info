import { Offer } from "@youmeet/gql/generated";
import React from "react";
import PageListContainer from "@youmeet/ui/PageListContainer";
import { SuggestedMeetsType } from "@youmeet/types/SuggestedMeetsType";

export default function OffresChild({
  offres,
  type,
}: {
  offres: Offer[];
  type: SuggestedMeetsType;
}) {
  return (
    <div className="w-full min-w-2/3 xs:max-w-screen sm:max-w-screen md:max-w-screen xs:min-w-fit sm:min-w-fit md:min-w-fit">
      <div className="relative flex-1 flex flex-col h-full dark:darkBg">
        <PageListContainer data={offres} dataType="offers" type={type} />
      </div>
    </div>
  );
}
