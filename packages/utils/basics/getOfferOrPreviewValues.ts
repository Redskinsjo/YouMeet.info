import { getCompany, getCompetency, getJob } from "@youmeet/functions/request";
import {
  BetaCompany,
  CompetenceFt,
  Competency,
  Job,
  Offer,
  PermisFt,
  Translated,
} from "@youmeet/gql/generated";
import { OfferContentValues } from "@youmeet/types/OfferContentValues";
import { isCompany, isJob } from "@youmeet/types/TypeGuards";
import { OfferDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import setFileUrl from "./setFileUrl";
import getLinkIfUrl from "./getLinkIfUrl";

export default async function getOfferOrPreviewValues(
  offre: Offer | OfferDefaultValues,
  language: "fr" | "en",
  companyId?: string
): Promise<OfferContentValues> {
  let values = {} as OfferContentValues;

  if ("id" in offre) {
    const typ = (offre: any): Offer => offre;
    const el = typ(offre);
    const job = el.job;
    const company = el.company;

    const required = (title: string | null | undefined) =>
      title ? title[0].toUpperCase() + title?.slice(1) : "";
    const listReqs = (
      list:
        | (Competency | null)[]
        | (CompetenceFt | null)[]
        | (PermisFt | null)[]
        | undefined
        | null
    ) =>
      list ? list.map((c: any) => required(c?.title || c?.libelle) || "") : [];

    values.jobTitle =
      (job?.title && (job?.title as Translated)[language as "fr" | "en"]) ||
      el?.intitule ||
      "";
    values.content = el.content || el?.description || "";
    values.profileSearched = el.profileSearched || "";
    values.requirements =
      listReqs(el?.requirements as Competency[]) ||
      listReqs(el?.competences) ||
      [];
    values.contractType =
      el?.contractType || el?.typeContratLibelle || el?.typeContrat || "";
    values.location = el.location || el.lieuTravail?.libelle || "";
    values.revenue =
      (el.revenue && typeof el.revenue === "number" && String(el.revenue)) ||
      el?.salaire?.libelle ||
      "";
    values.logo = setFileUrl(company?.logo) || el?.entreprise?.logo || "";
    values.rebroadcast = el?.rebroadcast || !el?.entreprise?.logo;
    values.companyName =
      (values.rebroadcast && company?.name) ||
      el?.entreprise?.nom ||
      el.companyName ||
      "";
    values.jobDescriptionLink = el.jobDescriptionLink || "";
    values.createdAt = el.createdAt;
    values.limitDate = el.limitDate;
    values.remote = el.remote || "";
    values.qualification = el.qualificationLibelle || "";
    values.location = el?.location || el?.lieuTravail?.libelle || "";
    values.slug = el.slug
      ? `/offres/${el?.slug}`
      : el.contact?.urlPostulation
      ? `${el.contact?.urlPostulation}`
      : "";
    values.limitDate = el?.limitDate;
    values.tools = (el.outilsBureautiques as string[]) || [];
    values.permis = listReqs(el.permis) || [];
    values.nombrePostes = el.nombrePostes || 1;
    values.accessibleTH = el.accessibleTH || false;
    values.appellationlibelle = el?.appellationlibelle || "";
    values.alternance = el?.alternance || false;
    values.contact =
      el?.contact?.coordonnees1 ||
      el?.contact?.coordonnees2 ||
      el.contact?.coordonnees3 ||
      el?.contact?.courriel ||
      el?.contact?.telephone ||
      el?.contact?.urlPostulation ||
      el?.contact?.urlRecruteur ||
      "";
    values.contact = getLinkIfUrl(values.contact) || "";
    values.dureeTravail = el?.dureeTravailLibelle || "";
    values.dureeTravailConverti = el?.dureeTravailLibelleConverti || "";
    values.experience = el?.experienceLibelle || "";
    values.secteurActivite = el?.secteurActiviteLibelle || "";
  } else {
    const typ = (offre: any): OfferDefaultValues => offre;
    const el = typ(offre);

    const job = (await getJob<Job>({ id: el.job })) as Job;

    if (job && isJob(job)) {
      values.jobTitle = (job?.title as Translated)[
        language as "fr" | "en"
      ] as string;
      values.content = el?.content as string;
      values.profileSearched = el?.profileSearched as string;
      const requirements = await Promise.all(
        el.requirements.map(async (req) => {
          const title = (
            (await getCompetency<Competency>({
              id: req as string,
            })) as Competency
          ).title as Translated;
          return `${title.fr}_${title.en}`;
        })
      );
      values.requirements = requirements;
      values.contractType = el?.contractType as string;
      values.location = el.location as string;
      values.revenue = el?.revenue;
      values.limitDate = el?.limitDate;
      values.remote = el?.remote;
      values.jobDescriptionLink = el?.jobDescriptionLink as string;
      if (el?.companyName) {
        values.companyName = el?.companyName as string;
      } else if (companyId) {
        const company = (await getCompany<BetaCompany>({
          id: companyId,
        })) as BetaCompany;
        if (company && isCompany(company)) {
          values.companyName = company?.name as string;
          values.logo = company.logo?.secure_url || "";
        }
      }
    }
  }

  return values;
}
