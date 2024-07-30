"use client";
import { deleteMeet } from "@youmeet/functions/request";
import Layout from "../../Layout";
import SubLayout from "../../SubLayout";
import { Meet } from "@youmeet/gql/generated";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { setName } from "@youmeet/utils/setName";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import React from "react";

export default function BackofficeMeetsComponent({ data }: { data: Meet[] }) {
  const [rows, setRows] = useState<Meet[]>(data);

  useEffect(() => {
    if (data) setRows(data);
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
        <div className="overflow-x-scroll w-full">
          <DataGrid
            checkboxSelection
            className="flex-1 max-h-[700px] min-h-[300px]"
            rows={rows.map((meet) => ({
              id: meet.id,
              candidateFullname: setName(meet.meetCandidate),
              recrutierFullname: setName(meet.meetRecruiter),
              expired: meet.expired,
              createdAt: meet.createdAt,
            }))}
            columns={[
              {
                type: "string",
                field: "candidateFullname",
                headerName: "Nom du candidat",
                flex: 1,
              },
              {
                type: "string",
                field: "recrutierFullname",
                headerName: "Nom du recruteur",
                flex: 1,
              },
              {
                type: "boolean",
                field: "expired",
                headerName: "Expiré",
                width: 100,
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

                          const result = (await deleteMeet<Meet>(
                            { id: row.id },
                            0,
                            true
                          )) as withData<Meet> | PayloadBackendError;

                          if (result && isPayloadError(result)) {
                            console.log(result);
                          } else if (!result?.data) {
                            console.log(result);
                          } else {
                            setRows(
                              rows.filter((r) => r.id !== result.data.id)
                            );
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
              return new Date().getTime() -
                new Date(params.row.createdAt).getTime() <
                1000 * 3600 * 24 * 5
                ? "bg-deepPurple100 animate-pulse"
                : "";
            }}
          />
        </div>
        <div></div>
      </div>
    </Layout>
  );
}
