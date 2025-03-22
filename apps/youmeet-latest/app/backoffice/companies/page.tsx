import { EMAIL_PERSO } from "@youmeet/functions/imports";
import BackofficeCompaniesChild from "./backofficeCompaniesChild";
import { getCompanies } from "@youmeet/functions/request";
import { BetaCompany } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { notFound } from "next/navigation";

export default async function BackofficeCompanies() {
  const verified = await verifyTokenServer();
  if (verified && verified.email.toLowerCase() === EMAIL_PERSO) {
    const companies = (await getCompanies<BetaCompany[]>()) as BetaCompany[];

    if (companies) return <BackofficeCompaniesChild companies={companies} />;
  }
  notFound();
}
