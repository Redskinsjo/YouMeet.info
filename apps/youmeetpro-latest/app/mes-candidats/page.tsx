import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { GetMyUnlockedUsers, getUser } from "@youmeet/functions/request";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { redirect } from "next/navigation";
import { isUser } from "@youmeet/types/TypeGuards";
import { BetaUser, UnlockedUser } from "@youmeet/gql/generated";
import { Metadata } from "next";
import MyCandidatesChild from "./myCandidatesChild";

export const maxDuration = 60;

export const metadata: Metadata = {
  title: `YouMeet - Voir mes candidats`,
  description: "Consulter les profils qui ont postulés à une de vos offres.",
  keywords: ["mes candidats", "consultation", "supprimer", "gérer", "analyser"],
  category: "Page",
  creator: "Jonathan Carnos",
};

export default async function page() {
  const verified = await verifyTokenServer(undefined, "dashboard");
  if (verified) {
    const user = (await getUser<BetaUser>({
      userId: (verified as LoginCookiePayload)?.userId,
    })) as BetaUser;

    if (user && isUser(user) && user?.pro) {
      const unlockedUsers = (await GetMyUnlockedUsers<UnlockedUser[]>({
        originId: user.id,
      })) as UnlockedUser[];

      return <MyCandidatesChild profil={user} unlockedUsers={unlockedUsers} />;
    }
  }
  redirect(`/se-connecter?redirect=dashboard`);
}
