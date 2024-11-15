"use client";
import SubLayout from "../../SubLayout";
import { ProfileSharing } from "@youmeet/gql/generated";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import Layout from "../../Layout";
import Image from "next/image";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";

export default function BackofficeUsersComponent({
  data,
}: {
  data: ProfileSharing[];
}) {
  const [rows, setRows] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [rowsIdsSelected, setRowsIdsSelected] = useState<string[]>([]);

  const fetchRows = useCallback(
    async (sharings: ProfileSharing[]) => {
      Promise.all(
        sharings?.map(async (sharing: ProfileSharing | undefined | null) => {
          const origin = sharing?.origin;
          const company = sharing?.target;

          return {
            id: sharing?.id,
            fullname: origin?.fullname,
            email: origin?.email,
            intitule: sharing?.offerTarget?.intitule,
            url: company?.url,
            logo: company?.logo,
            companyName: company?.name,
            createdAt: sharing?.createdAt,
            updatedAt: sharing?.updatedAt,
          };
        })
      ).then((result) => setRows(result as any[]));
    },
    [data]
  );

  useEffect(() => {
    if (data) fetchRows(data);
  }, [data]);

  return (
    <Layout newStyles={{ maxWidth: "1200px", padding: "0px", width: "100%" }}>
      <div className="flex flex-col gap-[24px] w-full border-[0.5px] border-solid border-grey500">
        <SubLayout>
          <div className="flex flex-col gap-[6px]">
            <span className="subItem text-blueGrey700 font-bold">
              Candidatures
            </span>
          </div>
        </SubLayout>

        <div className="overflow-x-scroll w-full">
          <DataGrid
            checkboxSelection
            className="flex-1 max-h-[700px]"
            rows={rows}
            onRowSelectionModelChange={(rows) => {
              setRowsIdsSelected(rows as string[]);
            }}
            columns={[
              {
                type: "string",
                field: "fullname",
                headerName: "Nom complet",
                flex: 1,
              },
              {
                type: "string",
                field: "email",
                headerName: "Email",
                flex: 1,
              },
              {
                type: "string",
                field: "intitule",
                headerName: "intitule offre",
                width: 140,
              },
              {
                type: "actions",
                field: "url",
                headerName: "Lien origine",
                width: 60,
                renderCell: (row: any) => {
                  return (
                    <Link href={row.row.url} target="_blank">
                      <>Lien</>
                    </Link>
                  );
                },
              },
              {
                type: "actions",
                field: "logo",
                headerName: "logo",
                width: 60,
                renderCell: (row: any) => {
                  const fileUrl = setFileUrl(row.row.logo) || "";
                  return fileUrl ? (
                    <Image
                      src={fileUrl}
                      width={40}
                      height={40}
                      alt="logo de l'entreprise"
                    />
                  ) : (
                    <>Pas de logo</>
                  );
                },
              },
              {
                type: "string",
                field: "companyName",
                headerName: "Nom entreprise",
                minWidth: 100,
              },
            ]}
            rowHeight={70}
            getRowClassName={(params) => {
              return params.row.consent ||
                new Date().getTime() -
                  new Date(params.row.createdAt).getTime() <
                  1000 * 3600 * 24 * 5
                ? "bg-deepPurple100 animate-pulse"
                : "";
            }}
            onRowClick={async (row) => {
              //   const user = await getUser({
              //     userId: row.id as string,
              //   });
              //   dispatch(
              //     setModal({ display: "backoffice", user }) as UnknownAction
              //   );
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
