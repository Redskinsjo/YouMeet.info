import Layout from "../../Layout";
import { BetaUser, Lead } from "@youmeet/gql/generated";
import BackofficeLeadsComponent from "./BackofficeLeadsComponent";
import dynamic from "next/dynamic";

const MoreFeaturesLeads = dynamic(() => import("./MoreFeaturesLeads"), {
  ssr: false,
});

export default function BackofficePageComponent({
  leads,
  users,
}: {
  leads: Lead[];
  users: BetaUser[];
}) {
  return (
    <Layout newStyles={{ maxWidth: "1200px", padding: "0px", width: "100%" }}>
      <div className="flex flex-col gap-[24px] w-full border-[0.5px] border-solid border-grey500">
        <BackofficeLeadsComponent data={leads} users={users} />

        <Layout newStyles={{ minWidth: "900px" }}>
          <MoreFeaturesLeads />
        </Layout>
      </div>
    </Layout>
  );
}
