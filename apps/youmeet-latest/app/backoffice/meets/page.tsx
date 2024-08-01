import BackofficeMeetsChild from "./backofficeMeetsChild";
import { getMeets } from "@youmeet/functions/request";
import { Meet } from "@youmeet/gql/generated";
import Custom404 from "@/app/not-found";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";

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
  return <Custom404 />;
}
