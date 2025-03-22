import { Error } from "@youmeet/gql/generated";
import Link from "next/link";
import { Button } from "@mui/material";
import Content from "./errorsComponent/Content";

export default function BackofficeErrorsChild({ errors }: { errors: Error[] }) {
  return (
    <div className="relative flex-1 flex flex-col h-full lightBg dark:darkBg">
      <div className="flex-center">
        <Link href={`/backoffice`} className="no-underline">
          <Button>Retour au backoffice</Button>
        </Link>
        <Link href={`/backoffice/users`} className="no-underline">
          <Button>Voir utilisateurs</Button>
        </Link>
        <Link href={`/backoffice/applications`} className="no-underline">
          <Button>Voir candidatures</Button>
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
      <Content errors={errors} />
    </div>
  );
}
