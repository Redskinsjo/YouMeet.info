import { Affiliation } from "@youmeet/gql/generated";
import { Button } from "@mui/material";
import Link from "next/link";
import BackofficeAffiliationsComponent from "@youmeet/ui/backoffice/backofficeComponents/BackofficeAffiliationsComponent";
import CreateAffiliation from "@youmeet/ui/backoffice/backofficeComponents/CreateAffiliation";

export default function BackofficeAffiliationsChild({
  affiliations,
}: {
  affiliations: Affiliation[];
}) {
  return (
    <div className="relative flex-1 flex-center flex-col h-full lightBg dark:darkBg">
      <div className="flex-center">
        <Link href={`/backoffice`} className="no-underline">
          <Button>Retour vers Backoffice</Button>
        </Link>
        <Link href={`/backoffice/users`} className="no-underline">
          <Button>Voir Utilisateurs</Button>
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
        <Link href={`/backoffice/cv`} className="no-underline">
          <Button>Voir CV</Button>
        </Link>
      </div>
      <BackofficeAffiliationsComponent data={affiliations} />
      <CreateAffiliation />
    </div>
  );
}
