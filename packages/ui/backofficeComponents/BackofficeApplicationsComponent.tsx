"use client";
import SubLayout from "../SubLayout";
import { ProfileSharing } from "@youmeet/gql/generated";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";
import Layout from "../Layout";
import Image from "next/image";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import { Button } from "@mui/material";
import {
  deleteSharing,
  getOneCompleteSharing,
  getSharings,
} from "@youmeet/functions/request";
import { setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import prisma from "@youmeet/prisma-config/prisma";

export default function BackofficeUsersComponent({
  data,
}: {
  data: ProfileSharing[];
}) {
  const [rows, setRows] = useState<any[]>([]);
  const dispatch = useDispatch();

  const fetchRows = useCallback(
    async (sharings: ProfileSharing[]) => {
      Promise.all(
        sharings?.map(async (sharing: ProfileSharing | undefined | null) => {
          const origin = sharing?.origin;
          const company = sharing?.target;
          const offer = sharing?.offerTarget;
          const intitule = offer?.intitule || offer?.job?.title?.fr;
          return {
            id: sharing?.id,
            fullname: origin?.fullname,
            email: origin?.email,
            intitule,
            url: company?.url,
            logo: company?.logo?.secure_url || offer?.entreprise?.logo,
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
            columns={[
              {
                type: "string",
                field: "fullname",
                headerName: "Nom complet",
                width: 140,
              },
              {
                type: "string",
                field: "email",
                headerName: "Email",
                width: 200,
              },
              {
                type: "string",
                field: "intitule",
                headerName: "intitule offre",
                flex: 1,
              },
              {
                type: "actions",
                field: "url",
                headerName: "Lien origine",
                width: 60,
                renderCell: (row: any) => {
                  return row.row.url ? (
                    <Link href={row.row.url} target="_blank">
                      <>Lien</>
                    </Link>
                  ) : (
                    <></>
                  );
                },
              },
              {
                type: "actions",
                field: "logo",
                headerName: "logo",
                width: 60,
                renderCell: (row: any) => {
                  const file = { url: row.row.logo, securel_url: row.row.logo };
                  const fileUrl = setFileUrl(file) || "";
                  return fileUrl ? (
                    <Image
                      src={fileUrl}
                      width={40}
                      height={40}
                      alt="logo de l'entreprise"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <></>
                  );
                },
              },
              {
                type: "string",
                field: "companyName",
                headerName: "Nom entreprise",
                minWidth: 100,
              },
              {
                field: "actions",
                headerName: "Actions",
                minWidth: 100,
                renderCell: (row: any) => {
                  return (
                    <div className="flex-center">
                      <Button
                        onClick={async (e) => {
                          e.stopPropagation();

                          const deleted = (await deleteSharing<ProfileSharing>({
                            id: row.row.id as string,
                          })) as ProfileSharing;
                          if (deleted) {
                            const sharings = (await getSharings<
                              ProfileSharing[]
                            >()) as ProfileSharing[];
                            fetchRows(sharings);
                          }
                        }}
                      >
                        Supprimer
                      </Button>
                    </div>
                  );
                },
              },
            ]}
            onRowClick={async (row) => {
              console.log(row, "row");
              const sharing = (await getOneCompleteSharing({
                data: { id: row.id as string },
              })) as ProfileSharing;
              dispatch(
                setModal({
                  display: "backoffice",
                  sharing,
                }) as UnknownAction
              );
            }}
            rowHeight={70}
            getRowClassName={(params) => {
              return params.row.consent ||
                new Date().getTime() -
                  new Date(params.row.createdAt).getTime() <
                  1000 * 3600 * 24 * 5
                ? "bg-deepPurple100 animate-pulse"
                : "";
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
