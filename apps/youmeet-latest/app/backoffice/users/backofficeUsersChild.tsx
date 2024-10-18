import { BetaUser } from "@youmeet/gql/generated";
import { Button } from "@mui/material";
import Link from "next/link";
import CreateAffiliateUser from "../backofficeComponents/CreateAffiliateUser";
import dynamic from "next/dynamic";

const BackofficeUsersComponent = dynamic(
  () =>
    import(
      "@youmeet/ui/backoffice/backofficeComponents/BackofficeUsersComponent"
    )
);
const CreateProUser = dynamic(
  () => import("@youmeet/ui/backoffice/backofficeComponents/CreateProUser")
);

export default function BackofficeUsersPage({ users }: { users: BetaUser[] }) {
  return (
    <div className="relative flex-1 flex-center flex-col h-full lightBg dark:darkBg">
      <div className="flex-center">
        <Link href={`/backoffice`} className="no-underline">
          <Button>Retour vers Backoffice</Button>
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

      <BackofficeUsersComponent data={users} />

      <CreateProUser />
      <CreateAffiliateUser users={users} />
    </div>
  );
}
