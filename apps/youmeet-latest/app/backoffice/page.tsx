import BackofficeChild from "./backofficeChild";
import { getLeads, getUsers } from "@youmeet/functions/request";
import { redirect } from "next/navigation";
import { BetaUser, Lead } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";

export default async function Backoffice() {
  const verified = await verifyTokenServer();
  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    const leads = (await getLeads<Lead[]>(undefined, 0)) as Lead[];

    if (leads) {
      const users = (await getUsers<BetaUser[]>({
        data: { user: true },
      })) as BetaUser[];
      return <BackofficeChild leads={leads} users={users} />;
    }
  }
  redirect("/");
}
