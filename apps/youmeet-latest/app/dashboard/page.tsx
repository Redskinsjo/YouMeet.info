import { Metadata } from "next";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { getMyReferences, getUser } from "@youmeet/functions/request";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import DashboardChild from "@youmeet/ui/dashboardComponents/dashboardChild";
import { redirect } from "next/navigation";
import { isUser } from "@youmeet/types/TypeGuards";
import { BetaUser, Reference } from "@youmeet/gql/generated";
import { NAME } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: `YouMeet - Gestion de votre Compte Candidat`,
  description:
    "Accédez à votre compte et gérez votre profil ainsi que vos prises de références en toute simplicité. Optimisez votre processus de recrutement grâce à notre plateforme conviviale. Connectez-vous dès maintenant !",
  keywords: [
    "dashboard",
    "profil privé",
    "cv vidéo",
    "paramétrage",
    "formulaire",
  ],

  category: "Profil public",
  creator: NAME,
};

export default async function Dashboard() {
  const verified = await verifyTokenServer();
  if (verified) {
    const user = (await getUser(
      {
        userId: (verified as LoginCookiePayload)?.userId,
      },
      0
    )) as BetaUser;

    if (user && isUser(user)) {
      const references = (await getMyReferences<Reference[]>({
        userId: user.id,
      })) as Reference[];
      return <DashboardChild profil={user} references={references} />;
    }
  }
  redirect(`/se-connecter?redirect=dashboard`);
}
