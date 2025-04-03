import { Metadata } from "next";
import LoginCookiePayload from "@youmeet/types/LoginCookiePayload";
import { getMyReferences, getUser } from "@youmeet/functions/request";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import DashboardChild from "@youmeet/ui/dashboardComponents/dashboardChild";
import { redirect } from "next/navigation";
import { isUser } from "@youmeet/types/TypeGuards";
import { BetaUser, Offer, Reference } from "@youmeet/gql/generated";
import { NAME } from "@youmeet/functions/imports";
import getOfferOrPreviewValues from "@youmeet/utils/basics/getOfferOrPreviewValues";

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

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string }>;
}) {
  const prms = await searchParams;
  const verified = await verifyTokenServer();
  if (verified) {
    const user = (await getUser(
      {
        userId: (verified as LoginCookiePayload)?.userId,
      },
      0
    )) as BetaUser;

    const getIfExist = (oneParam: string) => (oneParam ? oneParam : "");

    let search = "";
    if (prms) search = getIfExist(prms.s);

    if (user && isUser(user)) {
      const references = (await getMyReferences<Reference[]>({
        userId: user.id,
      })) as Reference[];

      let opps: Offer[] = [];
      if (user.candidate?.suggestedOpportunities) {
        opps = (
          await Promise.all(
            user.candidate?.suggestedOpportunities
              ?.filter((opp) => opp)
              .map((opp) => {
                const promise = new Promise(async (resolve) => {
                  if (!opp) return false;
                  const values = await getOfferOrPreviewValues(
                    opp,
                    "fr",
                    opp?.company?.id || undefined
                  );
                  const low = (s: string) => s.toLowerCase();

                  const matLocation = low(values.location).includes(
                    low(search)
                  );
                  const matJobTitle = low(values.jobTitle).includes(
                    low(search)
                  );
                  const matCompany = low(values.companyName).includes(
                    low(search)
                  );
                  const matContractType = low(values.contractType).includes(
                    low(search)
                  );
                  const matRevenue = low(values.revenue).includes(low(search));

                  if (
                    matLocation ||
                    matJobTitle ||
                    matCompany ||
                    matContractType ||
                    matRevenue
                  ) {
                    resolve(opp);
                  } else resolve(undefined);
                });
                return promise;
              }) as Offer[]
          )
        ).filter((opp) => opp);
      }
      return (
        <DashboardChild profil={user} references={references} opps={opps} />
      );
    }
  }
  redirect(`/se-connecter?redirect=dashboard`);
}
