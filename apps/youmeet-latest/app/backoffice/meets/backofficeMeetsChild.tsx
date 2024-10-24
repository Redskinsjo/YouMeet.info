import BackofficeMeetsComponent from "@youmeet/ui/backoffice/backofficeComponents/BackofficeMeetsComponent";
import { Meet } from "@youmeet/gql/generated";
import { Button } from "@mui/material";
import Link from "next/link";
import CreateMeet from "@youmeet/ui/backoffice/backofficeComponents/CreateMeet";

export default function BackofficeMeetsPage({ meets }: { meets: Meet[] }) {
  return (
    <div className="relative flex-1 flex flex-col h-full lightBg dark:darkBg">
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
        <Link href={`/backoffice/affiliations`} className="no-underline">
          <Button>Voir Affiliations</Button>
        </Link>
        <Link href={`/backoffice/cv`} className="no-underline">
          <Button>Voir CV</Button>
        </Link>
      </div>

      <BackofficeMeetsComponent data={meets} />

      <CreateMeet />
    </div>
  );
}
