"use client";
import { Button } from "@mui/material";
import { generateCV } from "@youmeet/functions/actions";
import { uri } from "@youmeet/functions/imports";
import SelectField from "@youmeet/ui/formulaire-profil/formComponents/fields/SelectField";
import Link from "next/link";

export default function BackofficeUsersPage() {
  return (
    <div className="relative flex-1 flex-center flex-col h-full lightBg dark:darkBg">
      <div className="flex-center">
        <Link href={`/backoffice`} className="no-underline">
          <Button>Retour vers Backoffice</Button>
        </Link>
        <Link href={`/backoffice/users`} className="no-underline">
          <Button>Voir users</Button>
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
      </div>

      <form
        action={async (formData: FormData) => {
          const obj = Object.fromEntries(
            Object.entries(Object.fromEntries(formData.entries())).map(
              (entry) => [entry[0], entry[1].toString().trim()]
            )
          );
          const response = await fetch(`${uri}/api/generateCV`, {
            body: JSON.stringify({ job: obj.job }),
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response.ok, "response.ok");
        }}
      >
        <SelectField
          required
          label="Poste recherché"
          location=""
          name="job"
          type="text"
        />
        <Button type="submit">Générer un CV</Button>
      </form>
    </div>
  );
}
