import BackofficeMeetsChild from "./backofficeMeetsChild";
import { getMeets } from "@youmeet/functions/request";
import { Meet } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";
import { notFound } from "next/navigation";

export const maxDuration = 60;

export default async function BackofficeRemarks() {
  const verified = await verifyTokenServer();

  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    const meets = (await getMeets<Meet[]>()) as Meet[];
    if (meets) return <BackofficeMeetsChild meets={meets} />;
  }
  return notFound();
}
