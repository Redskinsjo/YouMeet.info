import BackofficeAffiliationsChild from "./backofficeAffiliationsChild";
import { getAffiliations } from "@youmeet/functions/request";
import { Affiliation } from "@youmeet/gql/generated";
import Custom404 from "@/app/not-found";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";

export default async function BackofficeAffiliations() {
  const verified = await verifyTokenServer();
  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    const affiliations = (await getAffiliations<
      Affiliation[]
    >()) as Affiliation[];
    if (affiliations)
      return <BackofficeAffiliationsChild affiliations={affiliations} />;
  }
  return <Custom404 />;
}
