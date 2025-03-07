import prisma from "@youmeet/prisma-config/prisma";
import * as SendinBlue from "@getbrevo/brevo";
import { setName } from "@youmeet/utils/basics/setName";
import dotenv from "dotenv";
dotenv.config();

const monthsMapping = {
  "0": "Janvier",
  "1": "Février",
  "2": "Mars",
  "3": "Avril",
  "4": "Mai",
  "5": "Juin",
  "6": "Juillet",
  "7": "Août",
  "8": "Septembre",
  "9": "Octobre",
  "10": "Novembre",
  "11": "Décembre",
};

export const apiInstance = new SendinBlue.TransactionalEmailsApi();

apiInstance.setApiKey(
  SendinBlue.TransactionalEmailsApiApiKeys.apiKey,
  `${process.env.SENDINBLUE_APIKEY}`
);

export const toTest = async () => {
  const candidatesSuggested = await prisma.betacandidates.findMany({
    where: { suggestedOpportunities: { none: undefined } },
  });

  for (let i = 0; i < candidatesSuggested.length; i++) {
    const candidate = candidatesSuggested[i];
    const user = await prisma.betausers.findUnique({
      where: { id: candidate.userId },
    });
    if (!user) continue;
    const offers = await prisma.offers.findMany({
      where: { suggestedCandidatesIds: { has: candidate.id } },
    });
    if (offers.length === 0) continue;

    const at = offers[0]?.limitDate
      ? new Date(`${offers[0]?.limitDate}`)
      : offers[0]?.createdAt
      ? new Date(`${offers[0]?.createdAt}`)
      : undefined;

    const limitDate = at
      ? `${at.getDate()} ${at.getMonth()} ${at.getFullYear()}`
      : undefined;
    const format = limitDate.split(" ").map((p, i) => {
      if (i === 1) return (monthsMapping as any)[p];
      else return p;
    });
    const day = format[0];
    const month = format[1];
    const year = format[2];
    try {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject({ response: { statusCode: 400 } });
        }, 5000);
      }) as Promise<{ response: { statusCode: number } }>;
      const res = await promise;

      if (res.response.statusCode === 201) {
        return { success: true, data: true };
      }
    } catch (err) {
      console.log(err);
      return { error: true, data: false };
    }
  }
};

(async () => {
  const candidatesSuggested = await prisma.betacandidates.findMany({
    where: { suggestedOpportunities: { none: undefined } },
  });

  console.log(candidatesSuggested.length, "length");
  for (let i = 0; i < candidatesSuggested.length; i++) {
    const candidate = candidatesSuggested[i];
    const user = await prisma.betausers.findUnique({
      where: { id: candidate.userId },
    });
    if (!user) continue;
    const offers = await prisma.offers.findMany({
      where: { suggestedCandidatesIds: { has: candidate.id } },
    });
    if (offers.length === 0) continue;

    const at = offers[0]?.limitDate
      ? new Date(`${offers[0]?.limitDate}`)
      : offers[0]?.createdAt
      ? new Date(`${offers[0]?.createdAt}`)
      : undefined;

    const limitDate = at
      ? `${at.getDate()} ${at.getMonth()} ${at.getFullYear()}`
      : undefined;
    const format = limitDate.split(" ").map((p, i) => {
      if (i === 1) return (monthsMapping as any)[p];
      else return p;
    });
    const day = format[0];
    const month = format[1];
    const year = format[2];
    try {
      const res = await apiInstance.sendTransacEmail({
        to: [
          {
            email: user?.email as string,
            name: setName(user) as string,
          },
        ],
        replyTo: {
          email: "contact@youmeet.info",
        },
        params: {
          name: user.firstname,
          contractType1: offers[0].contractType,
          location1: offers[0].location || offers[0].lieuTravail.libelle,
          companyName1: offers[0].companyName || offers[0].entreprise.nom,
          title1: offers[0].intitule,
          experienceLevel1: offers[0].experienceLibelle,
          limitDate1: `${day} ${month} ${year}`,
          salaire1: offers[0].salaire,
        },
        templateId: 40 as number,
      });

      console.log(res.response.statusCode, ":", i);
    } catch (err) {
      console.log(err.message, ":", i);
    }
  }

  process.exit();
})();
