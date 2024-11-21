import BackofficeApplicationsChild from "./backofficeApplicationsChild";
import { getSharings } from "@youmeet/functions/request";
import { ProfileSharing } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { notFound } from "next/navigation";

export default async function BackofficeUsers() {
  const verified = await verifyTokenServer();
  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    const applications = (await getSharings(undefined, 0)) as ProfileSharing[];

    if (applications)
      return <BackofficeApplicationsChild applications={applications} />;
  }
  return notFound();
}
