import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { getUser } from "@youmeet/functions/request";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { redirect } from "next/navigation";
import { isUser } from "@youmeet/types/TypeGuards";
import { BetaUser } from "@youmeet/gql/generated";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const MyOffersChild = dynamic(() => import("./myOffersComponentChild"));

export const maxDuration = 60;

export const metadata: Metadata = {
  title: `YouMeet - Voir mes offres d'emploi`,
  description:
    "Gérer vos offres d'emplois diffusées sur la plateforme, consulter ou supprimer.",
  keywords: ["mes offres", "diffusion", "suppression", "consultation"],
  category: "Page",
  creator: "Jonathan Carnos",
};

export default async function page() {
  const verified = await verifyTokenServer(undefined, "dashboard");

  if (verified) {
    const user = (await getUser<BetaUser>({
      userId: (verified as LoginCookiePayload)?.userId,
    })) as BetaUser;

    if (user && isUser(user) && user?.pro)
      return <MyOffersChild profil={user} />;
  }
  redirect(`/se-connecter?redirect=dashboard`);
}
