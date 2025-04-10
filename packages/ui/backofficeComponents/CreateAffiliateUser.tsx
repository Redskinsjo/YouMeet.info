import Layout from "../Layout";
import SubLayout from "../SubLayout";
import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import React from "react";

const AffiliateForm = dynamic(() => import("./AffiliateForm"));

export default function CreateAffiliateUser({ users }: { users: BetaUser[] }) {
  return (
    <Layout newStyles={{ maxWidth: "1200px", padding: "0px", width: "100%" }}>
      <div className="flex flex-col gap-[24px] w-full border-[0.5px] border-solid border-grey500">
        <SubLayout>
          <div className="flex flex-col gap-[6px]">
            <span className="subItem text-blueGrey700 font-bold">
              Créer un affilié
            </span>
          </div>
        </SubLayout>

        <AffiliateForm users={users} />
      </div>
    </Layout>
  );
}
