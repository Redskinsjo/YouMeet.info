import { Button } from "@mui/material";
import Link from "next/link";
import { BetaUser, Lead } from "@youmeet/gql/generated";
import BackofficeComponent from "@youmeet/ui/backofficeComponents/BackofficePageComponent";
import FranceTravailConnect from "@youmeet/ui/backofficeComponents/FranceTravailConnect";

export default async function BackofficeChild({
  leads,
  users,
}: {
  leads: Lead[];
  users: BetaUser[];
}) {
  return (
    <div className="relative flex-1 flex-center flex-col h-full lightBg dark:darkBg">
      <div className="flex-center">
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
      <FranceTravailConnect />

      <BackofficeComponent leads={leads} users={users} />
    </div>
  );
}
