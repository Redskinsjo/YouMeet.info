import { notFound } from "next/navigation";
import BackofficeCvChild from "./backofficeCvChild";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { EMAIL_PERSO } from "@youmeet/functions/imports";

export default async function BackofficeUsers() {
  const verified = await verifyTokenServer();
  if (verified && verified.email.toLowerCase() === EMAIL_PERSO) {
    return <BackofficeCvChild />;
  }
  return notFound();
}
