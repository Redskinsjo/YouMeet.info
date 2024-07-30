import Layout from "@youmeet/ui/Layout";
import SubLayout from "@youmeet/ui/SubLayout";
import { UserRemark } from "@youmeet/gql/generated";
import { setName } from "@youmeet/utils/setName";
import { Button } from "@mui/material";
import { blueGrey, deepPurple } from "@mui/material/colors";
import Link from "next/link";

export default function BackofficeRemarksChild({
  remarks,
}: {
  remarks: UserRemark[];
}) {
  return (
    <Layout newStyles={{ maxWidth: "1200px", padding: "0px", width: "100%" }}>
      <div className="flex flex-col gap-[24px] w-full border-[0.5px] border-solid border-grey500">
        <div className="flex-center">
          <Link href={`/backoffice`} className="no-underline">
            <Button>Retour vers Backoffice</Button>
          </Link>
          <Link href={`/backoffice/users`} className="no-underline">
            <Button>Voir utilisateurs</Button>
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
        <>
          <SubLayout>
            <div className="flex flex-col gap-[6px]">
              <span className="subItem text-blueGrey700 font-bold">
                Remarques
              </span>
            </div>
          </SubLayout>
          <div
            style={{
              background: `linear-gradient(90deg, white, ${deepPurple[50]}, white)`,
              boxShadow: `2px 4px 10px 0px ${blueGrey[200]}`,
              borderRadius: "14px",
            }}
            className="indent-4 text-justify p-[12px]"
          >
            {remarks && remarks.length > 0 ? (
              remarks.map((remark) => {
                return (
                  <div
                    key={remark?.id}
                    className="flex-bet w-full border-[0.5px] border-solid border-grey300 rounded-[14px] p-[6px] px-[12px] box-border"
                  >
                    {setName(remark?.user) && (
                      <div>{setName(remark?.user)}</div>
                    )}
                    {remark?.user?.pro && (
                      <div className="text-[12px]">Recruteur</div>
                    )}
                    {remark?.user?.user && (
                      <div className="text-[12px]">Candidat</div>
                    )}
                    {remark?.user?.company?.name && (
                      <div className="text-[12px]">
                        Entreprise: {remark?.user?.company?.name}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div>Pas de donnée</div>
            )}
          </div>
        </>
      </div>
    </Layout>
  );
}
