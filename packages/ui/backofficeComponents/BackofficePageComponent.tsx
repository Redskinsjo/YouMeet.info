import Layout from "../Layout";
import { BetaUser, Lead } from "@youmeet/gql/generated";
import BackofficeLeadsComponent from "./BackofficeLeadsComponent";
import dynamic from "next/dynamic";
import Tipe from "@youmeet/ui/backofficeComponents/Tipe";
import TipeFft from "@youmeet/ui/backofficeComponents/TipeFft";

const MoreFeaturesLeads = dynamic(() => import("./MoreFeaturesLeadChild"));

export default function BackofficePageComponent({
  leads,
  users,
  tipeData,
  tipeFftData,
}: {
  leads: Lead[];
  users: BetaUser[];
  tipeData: any[];
  tipeFftData: any[];
}) {
  return (
    <Layout newStyles={{ maxWidth: "1200px", padding: "0px", width: "100%" }}>
      <div className="flex flex-col gap-[24px] w-full border-[0.5px] border-solid border-grey500">
        <BackofficeLeadsComponent data={leads} users={users} />
        <Layout newStyles={{ minWidth: "900px" }}>
          <MoreFeaturesLeads />
        </Layout>
        <Tipe tipeData={tipeData} />
        <TipeFft tipeData={tipeFftData} />
      </div>
    </Layout>
  );
}
