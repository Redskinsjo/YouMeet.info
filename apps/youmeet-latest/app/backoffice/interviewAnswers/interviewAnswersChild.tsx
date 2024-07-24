import Layout from "@youmeet/components/Layout";
import SubLayout from "@youmeet/components/SubLayout";
import { FormResponse } from "@youmeet/gql/generated";
import { Button } from "@mui/material";
import Link from "next/link";

export default function InterviewAnswersChild({
  formResponses,
}: {
  formResponses: FormResponse[];
}) {
  return (
    <Layout newStyles={{ maxWidth: "1200px", padding: "0px", width: "100%" }}>
      <div className="flex flex-col gap-[24px] w-full border-[0.5px] border-solid border-grey500">
        <div className="flex-center">
          <Link href={`/backoffice/users`} className="no-underline">
            <Button>Voir utilisateurs</Button>
          </Link>
          <Link href={`/backoffice`} className="no-underline">
            <Button>Retour vers Backoffice</Button>
          </Link>
          <Link href={`/backoffice/remarks`} className="no-underline">
            <Button>Voir remarques</Button>
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
        <SubLayout>
          <div className="flex flex-col gap-[6px]">
            <span className="subItem text-blueGrey700 font-bold">
              Réponses aux entretiens
            </span>
          </div>
        </SubLayout>
        {formResponses.map((response) => (
          <div
            key={response.id}
            className="border-[0.5px] border-solid border-grey300 p-[12px] box-border bg-white dark:darkBg dark:text-white"
          >
            <div>{response.content}</div>
            <div>
              <div>{response.question?.title}</div>
              <div>{response.question?.type}</div>
            </div>

            <div>
              <div>{response.lead?.name}</div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
