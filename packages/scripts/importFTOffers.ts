import {
  getOffers,
  getOffersFT,
  getSharings,
} from "@youmeet/functions/request";
import { Offer, ProfileSharing } from "@youmeet/gql/generated";
import prisma from "@youmeet/prisma-config/prisma";
import { OffreEmploiFT } from "@youmeet/types/api/OffreEmploiFT";
import { setUniqueSlugAndExtension } from "@youmeet/utils/backoffice/setUniqueInput";

(async () => {
  let start = 0;
  let end = 0;
  let over = start > 3149 || end >= 3149;
  type ResultOffresFT = { resultats: OffreEmploiFT[] };

  const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const a = (await getSharings<ProfileSharing[]>()) as ProfileSharing[];
  const applications = a;
  console.log("applications: ", applications.length);
  // offres qui sont liées à une candidature

  const offersToKeep = applications
    .filter((sharing) => sharing.offerTarget.id)
    .map((sharing) => sharing.offerTarget);
  console.log("offersToKeep: ", offersToKeep.length);

  const offers = (await getOffers<Offer[]>()) as Offer[];
  // offres qui ne sont pas liées à une candidature
  const offersToRemove = offers.filter(
    (offer) => !offersToKeep.find((o) => o.id === offer.id)
  );
  console.log(offersToRemove.length, "offersToRemove: ", offersToRemove.length);

  // annoter les offres liées à une candidature, comme étant live
  for (let k = 0; k < offersToKeep.length; k++) {
    const offer = offersToKeep[k];
    const exist = await prisma.offers.findUnique({ where: { id: offer.id } });
    if (exist) {
      try {
        await prisma.offers.update({
          where: { id: exist.id },
          data: { live: true },
        });
        console.log("updated offer to: live");
      } catch (e) {
        console.log("error updating offer");
      }
    }
  }

  // enlever les offres qui ne sont pas liées à une candidature
  const deleted = await prisma.offers.deleteMany({
    where: { live: { isSet: false } },
  });
  console.log("deleted: ", deleted.count.toString());

  const fnc = async (start: number, end: number, over: boolean) => {
    if (over) return;

    end = start + 149;
    console.log(`Fetching offers from ${start} to ${end}`);
    const result = (await getOffersFT<ResultOffresFT>({
      range: `${start}-${end}`,
    })) as ResultOffresFT;
    console.log(`Fetched: ${result.resultats.length} offers`);
    const data = result?.resultats;
    const offres = data?.length > 0 ? data : [];

    for (let i = 0; i < offres.length; i++) {
      if (i % 75 === 0) console.log(i);
      const FToffer = offres[i];
      const entreprise = FToffer.entreprise;

      const offer = Object.fromEntries(
        Object.entries(FToffer).map(([key, val]) => {
          if (typeof val === "object") return [key, { set: val }];
          return [key, val];
        })
      );
      const idFT = offer.id;
      delete offer.id;

      const isStillLive = await prisma.offers.findUnique({
        where: { idFT },
      });
      if (isStillLive) {
        await prisma.offers.update({
          where: { idFT },
          data: { ...offer, updatedAt: new Date() },
        });
        continue;
      }

      let company;
      if (entreprise.nom) {
        company = await prisma.betacompanies.findUnique({
          where: { name: entreprise.nom },
        });

        if (!company) {
          const logo = {} as { secure_url: string; url: string };
          if (entreprise.logo) {
            logo.secure_url = entreprise.logo as string;
            logo.url = entreprise.url as string;
          }
          company = await prisma.betacompanies.create({
            data: {
              name: entreprise.nom,
              logo,
              resume: entreprise.description,
              url: entreprise.url,
              entrepriseAdaptee: entreprise.entrepriseAdaptee,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        }
      }

      const { extension, slug } = await setUniqueSlugAndExtension(
        offer.romeLibelle
      );

      const companyData = {} as { company: { connect: { id: string } } };
      if (company?.id) companyData.company = { connect: { id: company.id } };

      await prisma.offers.create({
        data: {
          extension,
          slug,
          ...offer,
          idFT,
          ...companyData,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    start = end + 1;
    await waitFor(5000);
    await fnc(start, end, start > 3149 || end >= 3149);
  };

  await fnc(start, end, over);

  process.exit(0);
})();
