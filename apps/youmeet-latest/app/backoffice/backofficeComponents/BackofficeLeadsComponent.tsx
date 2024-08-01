import SubLayout from "@youmeet/ui/SubLayout";
import { Lead, BetaUser } from "@youmeet/gql/generated";
import React from "react";
import dynamic from "next/dynamic";

const LeadsGrid = dynamic(
  () => import("@youmeet/ui/backoffice/backofficeComponents/LeadsGrid")
);
const CreateLeadForm = dynamic(
  () => import("@youmeet/ui/backoffice/backofficeComponents/CreateLeadForm")
);

export default function BackofficeLeadsComponent({
  data,
  users,
}: {
  data: Lead[];
  users: BetaUser[];
}) {
  return (
    <>
      <SubLayout>
        <div className="flex flex-col gap-[6px]">
          <span className="subItem text-blueGrey700 font-bold">Leads</span>
        </div>
      </SubLayout>

      <LeadsGrid data={data} />

      <SubLayout>
        <div className="flex flex-col gap-[6px]">
          <span className="subItem text-blueGrey700 font-bold">
            Créer un prospect (recruteur)
          </span>
        </div>
      </SubLayout>
      <CreateLeadForm users={users} />
    </>
  );
}
