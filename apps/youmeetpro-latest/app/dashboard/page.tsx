import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { getUser } from "@youmeet/functions/request";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import DashboardChild from "./dashboardChild";
import { redirect } from "next/navigation";
import { isUser } from "@youmeet/types/TypeGuards";
import { BetaUser } from "@youmeet/gql/generated";
import { Metadata } from "next";
import { NAME } from "@youmeet/functions/imports";

export const maxDuration = 60;

export const metadata: Metadata = {
  title: `YouMeet - Gestion de votre Compte Recruteur`,
  description:
    "Consultez vos notifications et ajoutez des offres d'emploi sur notre plateforme de recrutement pour recruteurs.",
  keywords: ["dashboard", "utilisation", "paramétrage"],
  category: "Dashboard",
  creator: NAME,
};

export default async function Dashboard() {
  const verified = await verifyTokenServer(undefined, "dashboard");

  if (verified) {
    const user = (await getUser<BetaUser>({
      userId: (verified as LoginCookiePayload)?.userId,
    })) as BetaUser;

    if (user && isUser(user) && user?.pro)
      return <DashboardChild profil={user} />;
  }
  redirect(`/se-connecter?redirect=dashboard`);
}
