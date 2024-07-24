import { Button } from "@mui/material";
import Link from "next/link";
import { BetaCompany } from "@youmeet/gql/generated";
import BackofficeCompaniesComponent from "../backofficeComponents/BackofficeCompaniesComponent";

export default function BackofficeChild({
  companies,
}: {
  companies: BetaCompany[];
}) {
  return (
    <div className="relative flex-1 flex flex-col h-full lightBg dark:darkBg">
      <div className="flex-center">
        <Link href={`/backoffice`} className="no-underline">
          <Button>Retour au backoffice</Button>
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
        <Link href={`/backoffice/errors`} className="no-underline">
          <Button>Voir erreurs</Button>
        </Link>
        <Link href={`/backoffice/meets`} className="no-underline">
          <Button>Voir Rencontres</Button>
        </Link>
        <Link href={`/backoffice/affiliations`} className="no-underline">
          <Button>Voir Affiliations</Button>
        </Link>
      </div>
      <BackofficeCompaniesComponent data={companies} />
    </div>
  );
}
