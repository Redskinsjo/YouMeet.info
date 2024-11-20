import { getOffersFT } from "@youmeet/functions/request";
import prisma from "@youmeet/prisma-config/prisma";
import { OffreEmploiFT } from "@youmeet/types/api/OffreEmploiFT";
import { setUniqueSlugAndExtension } from "@youmeet/utils/backoffice/setUniqueInput";

(async () => {
  let start = 0;
  let end = 0;
  let over = start > 3149 || end >= 3149;
  type ResultOffresFT = { resultats: OffreEmploiFT[] };

  const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
      delete offer.id;

      let company;
      try {
        company = await prisma.betacompanies.findUniqueOrThrow({
          where: { name: entreprise.nom },
        });
      } catch (error) {}
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

      const { extension, slug } = await setUniqueSlugAndExtension(
        offer.romeLibelle
      );

      await prisma.offers.create({
        data: {
          extension,
          slug,
          ...offer,
          company: { connect: { id: company.id } },
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
