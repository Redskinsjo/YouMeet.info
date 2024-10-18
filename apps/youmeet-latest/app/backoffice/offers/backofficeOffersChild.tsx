import Layout from "@youmeet/ui/Layout";
import AddOffer from "../backofficeComponents/AddOffer";
import { Offer } from "@youmeet/gql/generated";
import Link from "next/link";
import { Button } from "@mui/material";

export default function BackofficeOffersChild({ offers }: { offers: Offer[] }) {
  return (
    <div className="relative flex-1 flex-center flex-col h-full lightBg dark:darkBg">
      <div className="flex-center">
        <Link href={`/backoffice`} className="no-underline">
          <Button>Retour vers Backoffice</Button>
        </Link>
        <Link href={`/backoffice/users`} className="no-underline">
          <Button>Voir utilisateurs</Button>
        </Link>
        <Link href={`/backoffice/remarks`} className="no-underline">
          <Button>Voir remarques</Button>
        </Link>
        <Link href={`/backoffice/interviewAnswers`} className="no-underline">
          <Button>Voir réponses des leads</Button>
        </Link>
        <Link href={`/backoffice/companies`} className="no-underline">
          <Button>Voir entreprises</Button>
        </Link>
        <Link href={`/backoffice/errors`} className="no-underline">
          <Button>Voir erreurs</Button>
        </Link>
        <Link href={`/backoffice/meets`} className="no-underline">
          <Button>Voir Rencontres</Button>
        </Link>
        <Link href={`/backoffice/affiliations`} className="no-underline">
          <Button>Voir Affiliations</Button>
        </Link>
        <Link href={`/backoffice/cv`} className="no-underline">
          <Button>Voir CV</Button>
        </Link>
      </div>
      <Layout newStyles={{ maxWidth: "1200px", padding: "0px", width: "100%" }}>
        <div className="flex flex-col gap-[24px] w-full border-[0.5px] border-solid border-grey500">
          <AddOffer offers={offers} />
        </div>
      </Layout>
    </div>
  );
}
