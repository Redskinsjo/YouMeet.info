import { EMAIL_PERSO } from "@youmeet/functions/imports";
import BackofficeRemarksChild from "./backofficeRemarksChild";
import { getUserRemarks } from "@youmeet/functions/request";
import { UserRemark } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { notFound } from "next/navigation";

export default async function BackofficeRemarks() {
  const verified = await verifyTokenServer();

  if (verified && verified.email.toLowerCase() === EMAIL_PERSO) {
    const remarks = (await getUserRemarks<UserRemark[]>()) as UserRemark[];
    if (remarks) return <BackofficeRemarksChild remarks={remarks} />;
  }
  return notFound();
}
