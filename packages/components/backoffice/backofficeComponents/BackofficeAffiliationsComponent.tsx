"use client";
import { deleteAffiliation } from "@youmeet/functions/request";
import Layout from "@youmeet/components/Layout";
import SubLayout from "@youmeet/components/SubLayout";
import { Affiliation } from "@youmeet/gql/generated";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { setName } from "@youmeet/utils/setName";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import React from "react";

export default function BackofficeAffiliationsComponent({
  data,
}: {
  data: Affiliation[];
}) {
  const [rows, setRows] = useState<Affiliation[]>(data);

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);
  return (
    <Layout newStyles={{ maxWidth: "1200px", padding: "0px", width: "100%" }}>
      <div className="flex flex-col gap-[24px] w-full border-[0.5px] border-solid border-grey500">
        <SubLayout>
          <div className="flex flex-col gap-[6px]">
            <span className="subItem text-blueGrey700 font-bold">
              Affiliations
            </span>
          </div>
        </SubLayout>
        <div className="overflow-x-scroll w-full">
          <DataGrid
            checkboxSelection
            className="flex-1 max-h-[700px] min-h-[300px]"
            rows={rows.map((affiliation) => ({
              id: affiliation.id,
              parentFullname: setName(affiliation.parent),
              childrenFullname: affiliation.children?.map((child) =>
                setName(child)
              ),
              createdAt: affiliation.createdAt,
            }))}
            columns={[
              {
                type: "string",
                field: "parentFullname",
                headerName: "Nom du parent",
                flex: 1,
              },
              {
                type: "singleSelect",
                field: "childrenFullname",
                headerName: "Nom des affiliés",
                flex: 1,
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

                          const result = (await deleteAffiliation<Affiliation>(
                            { id: row.id },
                            0,
                            true
                          )) as withData<Affiliation> | PayloadBackendError;

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
