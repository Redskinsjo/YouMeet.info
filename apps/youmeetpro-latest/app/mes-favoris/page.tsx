import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { getUser } from "@youmeet/functions/request";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { redirect } from "next/navigation";
import { isUser } from "@youmeet/types/TypeGuards";
import { BetaUser } from "@youmeet/gql/generated";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const MyFavoritesChild = dynamic(() => import("./myFavoritesChild"), {
  ssr: false,
});

export const maxDuration = 60;

export const metadata: Metadata = {
  title: `YouMeet - Voir mes profils favoris`,
  description: "Consulter les profils que vous avez classés comme favoris.",
  keywords: ["mes favoris", "consultation"],
  category: "Page",
  creator: "Jonathan Carnos",
};

export default async function page() {
  const verified = await verifyTokenServer(undefined, "dashboard");

  if (verified) {
    const user = (await getUser<BetaUser>({
      userId: (verified as LoginCookiePayload)?.userId,
    })) as BetaUser;

    if (user && isUser(user)) return <MyFavoritesChild profil={user} />;
  }
  redirect(`/se-connecter?redirect=dashboard`);
}
