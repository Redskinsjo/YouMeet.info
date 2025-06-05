import { Button } from "@mui/material";
import Link from "next/link";
import { BetaUser, Lead } from "@youmeet/gql/generated";
import BackofficeComponent from "@youmeet/ui/backofficeComponents/BackofficePageComponent";
import FranceTravailConnect from "@youmeet/ui/backofficeComponents/FranceTravailConnect";
import prisma from "@youmeet/prisma-config/prisma";

export default async function BackofficeChild({
  leads,
  users,
}: {
  leads: Lead[];
  users: BetaUser[];
}) {
  const tipeData = await prisma.tipe.findMany({
    orderBy: { createdAt: "asc" },
    // skip: 10,
    // take: 200,
  });
  const tipeFftData = await prisma.fft.findMany({
    orderBy: { frequency: "asc" },
    // skip: 10,
    // take: 200,
  });
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

      <BackofficeComponent
        leads={leads}
        users={users}
        tipeData={tipeData}
        tipeFftData={tipeFftData}
      />
    </div>
  );
}
