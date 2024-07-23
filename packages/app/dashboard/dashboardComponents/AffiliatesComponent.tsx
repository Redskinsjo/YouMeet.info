import { BetaUser } from "@youmeet/gql/generated";
import AffiliateComponent from "./AffiliateComponent";
import NoData from "@youmeet/components/NoData";
import React from "react";

export default function AffiliatesComponent({ profil }: { profil: BetaUser }) {
  return (
    <div>
      {profil.affiliations?.map((affiliation) => {
        return (
          <div key={affiliation?.id}>
            {affiliation?.children && affiliation?.children.length > 0 ? (
              affiliation?.children?.map((child) => (
                <AffiliateComponent child={child as BetaUser} key={child?.id} />
              ))
            ) : (
              <NoData />
            )}
          </div>
        );
      })}
    </div>
  );
}
