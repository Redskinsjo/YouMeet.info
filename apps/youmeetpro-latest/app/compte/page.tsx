import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { getUser } from "@youmeet/functions/request";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";
import CompanyChild from "@/app/compte/companyChild";
import { isUser } from "@youmeet/types/TypeGuards";
import { redirect } from "next/navigation";
import { BetaUser } from "@youmeet/gql/generated";

export default async function Compte() {
  const verified = await verifyTokenServer(undefined, "compte");

  if (verified) {
    const user = (await getUser<BetaUser>({
      userId: (verified as LoginCookiePayload)?.userId,
    })) as BetaUser;

    if (user && isUser(user)) {
      if (user?.pro) {
        return <CompanyChild company={user.company} />;
      }
    }
  }

  redirect("/se-connecter?redirect=compte");
}
