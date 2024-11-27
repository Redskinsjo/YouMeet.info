"use client";
import SubLayout from "../SubLayout";
import { client } from "@youmeet/gql/index";
import { BetaUser, DeleteUserDocument, Video } from "@youmeet/gql/generated";
import { Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { uri, uriPro } from "@youmeet/functions/imports";
import { detectSubscribed } from "@youmeet/utils/backoffice/detectSubscribed";
import { DataGrid } from "@mui/x-data-grid";
import { setModal } from "@youmeet/global-config/features/modal";
import { useDispatch } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import {
  deleteVideo,
  getMyVideos,
  getUser,
  getUsers,
  sendEmailOfferOpportunities,
} from "@youmeet/functions/request";
import Layout from "../Layout";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { setError } from "@youmeet/global-config/features/global";
import { useRouter } from "next/navigation";

export default function BackofficeUsersComponent({
  data,
}: {
  data: BetaUser[];
}) {
  const [rows, setRows] = useState<any[]>([]);
  const dispatch = useDispatch();
  const [rowsIdsSelected, setRowsIdsSelected] = useState<string[]>([]);
  const router = useRouter();

  const fetchRows = useCallback(
    async (users: BetaUser[]) => {
      Promise.all(
        users?.map(async (user: BetaUser | undefined | null) => {
          const res = await detectSubscribed(user as BetaUser);

          return {
            id: user?.id,
            fullname: user?.fullname,
            email: user?.email,
            customerId: user?.customerId,
            consent: user?.consent,
            premium: res?.premium,
            credit: user?.credit,
            uniqueName: user?.uniqueName,
            auth:
              user?.auth?.internal && user.auth.social
                ? "Les deux"
                : user?.auth?.internal
                ? "Interne"
                : user?.auth?.social
                ? "Social"
                : "Inconnu",
            type:
              user?.user && user.pro
                ? "Les deux"
                : user?.user
                ? "Candidat"
                : user?.pro
                ? "Recruteur"
                : "Inconnu",
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
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
              Utilisateurs
            </span>
          </div>
        </SubLayout>
        <div className="flex gap-[6px]">
          <Button
            disabled={rowsIdsSelected.length === 0}
            onClick={async () => {
              if (rowsIdsSelected.length > 0) {
                const result = (await sendEmailOfferOpportunities<BetaUser[]>(
                  {
                    usersIds: rowsIdsSelected,
                  },
                  0,
                  true
                )) as withData<BetaUser> | PayloadBackendError;

                if (result && isPayloadError(result)) {
                  dispatch(setError("not-completed"));
                } else if (!result?.data) {
                  dispatch(setError("not-completed"));
                } else {
                  dispatch(
                    setModal({ display: "backofficeConfirm" }) as UnknownAction
                  );
                }
              }
            }}
          >
            Proposer opportunités
          </Button>
        </div>
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
                field: "customerId",
                headerName: "Customer Id",
                width: 100,
              },
              {
                type: "boolean",
                field: "consent",
                headerName: "Consentement",
                width: 60,
              },
              {
                type: "string",
                field: "premium",
                headerName: "Premium",
                width: 60,
              },
              {
                type: "number",
                field: "credit",
                headerName: "Credit",
                width: 60,
              },
              {
                type: "string",
                field: "auth",
                headerName: "Auth",
                width: 90,
              },
              {
                type: "string",
                field: "type",
                headerName: "Type",
                width: 90,
              },
              {
                field: "profile",
                headerName: "Profil",
                minWidth: 100,
                renderCell: (row: any) => {
                  return (
                    <Link
                      href={`${uri}/on/${row.row.uniqueName}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex-center">
                        <Button>Voir</Button>
                      </div>
                    </Link>
                  );
                },
              },
              {
                field: "subPremium",
                headerName: "Premium",
                minWidth: 100,
                renderCell: (row: any) => {
                  return (row.row.type === "Recruteur" ||
                    row.row.type === "Les deux") &&
                    row.row.premium === "Non" ? (
                    <div className="flex-center">
                      <Button
                        onClick={async (e) => {
                          e.stopPropagation();

                          const response = await fetch(
                            `${uriPro}api/handleSubscribed?userId=${row.id}&premium=true`,
                            {
                              method: "post",
                              headers: { "Content-Type": "application/json" },
                            }
                          );
                          if (response.status === 200) {
                            const data = await response.json();
                            dispatch(
                              setModal({
                                display: "backofficeConfirm",
                              }) as UnknownAction
                            );
                          }
                        }}
                      >
                        Souscrire
                      </Button>
                    </div>
                  ) : undefined;
                },
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
                          const videos = (await getMyVideos<Video[]>({
                            userId: row.id,
                          })) as Video[];
                          const response = await client.mutate({
                            mutation: DeleteUserDocument,
                            variables: { userId: row.id },
                          });

                          const deleted = response?.data?.deleteUser;
                          if (deleted) {
                            if (videos && videos.length > 0) {
                              for (let i = 0; i < videos.length; i++) {
                                const videoId = (videos[i] as Video).id;
                                await deleteVideo({ id: videoId });
                              }
                            }

                            const users = (await getUsers(
                              {
                                data: { pro: true, user: true },
                              },
                              0
                            )) as BetaUser[];
                            fetchRows(users);
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
              const user = await getUser({
                userId: row.id as string,
              });
              dispatch(
                setModal({ display: "backoffice", user }) as UnknownAction
              );
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
