import { getCompany, getCompetency, getJob } from "@youmeet/functions/request";
import {
  BetaCompany,
  GptCompetency,
  Job,
  Offer,
  Translated,
} from "@youmeet/gql/generated";
import { OfferContentValues } from "@youmeet/types/OfferContentValues";
import { isCompany, isJob } from "@youmeet/types/TypeGuards";
import { OfferDefaultValues } from "@youmeet/types/form/useFormDefaultValues";

export default async function getOfferOrPreviewValues(
  offre: Offer | OfferDefaultValues,
  language: "fr" | "en",
  companyId?: string
): Promise<OfferContentValues> {
  let values = {} as OfferContentValues;

  if ("id" in offre) {
    const typ = (offre: any): Offer => offre;
    values.jobTitle = (typ(offre)?.job?.title as Translated)[
      language as "fr" | "en"
    ] as string;
    values.content = typ(offre)?.content as string;
    values.profileSearched = typ(offre)?.profileSearched as string;
    values.requirements = typ(offre)?.requirements as GptCompetency[];
    values.contractType = typ(offre)?.contractType as string;
    values.location = typ(offre).location as string;
    values.revenue = String(typ(offre)?.revenue as number);
    values.companyLogo = typ(offre)?.company?.logo ?? undefined;
    values.companyName =
      typ(offre)?.rebroadcast && typ(offre)?.companyName
        ? (typ(offre)?.companyName as string)
        : (typ(offre)?.company?.name as string);
    values.jobDescriptionLink = typ(offre)?.jobDescriptionLink as string;
    values.createdAt = typ(offre)?.createdAt;
    values.limitDate = typ(offre)?.limitDate;
    values.remote = typ(offre)?.remote as string;
  } else {
    const typ = (offre: any): OfferDefaultValues => offre;

    const job = (await getJob<Job>({ id: typ(offre).job })) as Job;

    if (job && isJob(job)) {
      values.jobTitle = (job?.title as Translated)[
        language as "fr" | "en"
      ] as string;
      values.content = typ(offre)?.content as string;
      values.profileSearched = typ(offre)?.profileSearched as string;
      const requirements = await Promise.all(
        typ(offre).requirements.map(
          async (req) =>
            (await getCompetency<GptCompetency>({
              id: req as string,
            })) as GptCompetency
        )
      );
      values.requirements = requirements;
      values.contractType = typ(offre)?.contractType as string;
      values.location = typ(offre).location as string;
      values.revenue = typ(offre)?.revenue;
      values.limitDate = typ(offre)?.limitDate;
      values.remote = typ(offre)?.remote;
      values.jobDescriptionLink = typ(offre)?.jobDescriptionLink as string;
      if (typ(offre)?.companyName) {
        values.companyName = typ(offre)?.companyName as string;
      } else if (companyId) {
        const company = (await getCompany<BetaCompany>({
          id: companyId,
        })) as BetaCompany;
        if (company && isCompany(company)) {
          values.companyName = company?.name as string;
          values.companyLogo = company.logo ?? undefined;
        }
      }
    }
  }

  return values;
}
