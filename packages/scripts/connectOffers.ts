import { BetaCandidate } from "@youmeet/gql/generated";
import prisma from "@youmeet/prisma-config/prisma";

const connectMatches = async (candidates: BetaCandidate[]) => {
  await prisma.betacandidates.updateMany({
    where: { suggestedOpportunitiesIds: { isEmpty: false } },
    data: { suggestedOpportunitiesIds: { set: [] } },
  });
  await prisma.offers.updateMany({
    where: { suggestedCandidatesIds: { isEmpty: false } },
    data: { suggestedCandidatesIds: { set: [] } },
  });
  console.log("mise à niveau");
  await new Promise((res) => {
    setTimeout(res, 2000);
  });
  for (let i = 0; i < candidates.length; i++) {
    console.log("in", i);
    const candidate = candidates[i];

    // for each candidate, link the target job to the job
    if (!candidate?.targetJobId) continue;
    const job = await prisma.jobs.findUnique({
      where: {
        id: candidate.targetJobId,
      },
    });
    if (job) {
      const min4 = (tokens) => tokens.filter((token) => token.length > 4);
      const enTitle = min4(job.title?.en.toLowerCase().split(" "));
      const frTitle = min4(job.title?.fr.toLowerCase().split(" "));
      const tokens = enTitle.concat(frTitle);
      const codes = ["75", "92", "93", "94", "91", "78", "77"];

      let entries = [];
      for (let j = 0; j < tokens.length; j++) {
        for (let k = 0; k < codes.length; k++) {
          entries.push([tokens[j], codes[k]]);
        }
      }

      // récupère les offres qui matchent
      const matchedOffers = await prisma.offers.findMany({
        where: {
          OR: entries.map(([token, code]) => {
            return {
              intitule: { mode: "insensitive", contains: token },
              lieuTravail: {
                is: {
                  OR: [
                    { codePostal: { startsWith: code } },
                    { libelle: { contains: code } },
                    { codePostal: { isSet: false } },
                    { libelle: { isSet: false } },
                  ],
                },
              },
            };
          }),
        },
      });
      console.log("matched:", matchedOffers.length);

      if (matchedOffers.length === 0) continue;

      console.log([
        candidate.targetContractType,
        job.title,
        matchedOffers.length,
      ]);
      // connect the opportunities to candidate
      const ca = await prisma.betacandidates.update({
        where: { id: candidate.id },
        data: {
          suggestedOpportunities: {
            connect: matchedOffers.map((m) => ({
              id: m.id,
            })),
          },
        },
      });
      // connect the candidate to the opportunity
      await Promise.all(
        matchedOffers.map(
          async (opp) =>
            await prisma.offers.update({
              where: { id: opp.id },
              data: { suggestedCandidates: { connect: { id: candidate.id } } },
            })
        )
      );
    }
  }
  return;
};

(async () => {
  const candidates = await prisma.betacandidates.findMany({
    where: {
      user: {
        email: "jonathan.carnos@gmail.com",
      },
      OR: [
        {
          user: { isNot: null },
          targetJob: { isNot: null },
        },
        { user: { isNot: null }, targetContractType: { isSet: true } },
      ],
    },
  });
  await connectMatches(candidates);
  console.log("exiting");
})();
