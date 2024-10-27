"use client";
import SubLayout from "../../SubLayout";
import { BetaCompany } from "@youmeet/gql/generated";
import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { setModal } from "@youmeet/global-config/features/modal";
import { useDispatch } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import {
  deleteCompany,
  getCompanies,
  getCompany,
} from "@youmeet/functions/request";
import Layout from "../../Layout";
import {
  formatToDatetime,
  giveTimeAgo,
} from "@youmeet/utils/basics/formatToDatetime";
import TooltipedAsset from "../../TooltipedAsset";
import { Button } from "@mui/material";

export default function BackofficeCompaniesComponent({
  data,
}: {
  data: BetaCompany[];
}) {
  const [rows, setRows] = useState<any[]>([]);
  const dispatch = useDispatch();
  const fetchRows = useCallback(
    async (companies: BetaCompany[]) => {
      Promise.all(
        companies?.map(async (company: BetaCompany | undefined | null) => {
          return {
            id: company?.id,
            name: company?.name,
            linkedinProfilePage: company?.linkedinProfilePage,
            createdAt: company?.createdAt,
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
              Entreprises
            </span>
          </div>
        </SubLayout>

        <div className="overflow-x-scroll w-full">
          <DataGrid
            className="flex-1 max-h-[700px]"
            rows={rows}
            columns={[
              {
                type: "string",
                field: "name",
                headerName: "Nom complet",
                flex: 1,
              },
              {
                type: "string",
                field: "linkedinProfilePage",
                headerName: "Page Linkedin",
                flex: 1,
              },
              {
                type: "dateTime",
                field: "createdAt",
                headerName: "Créé",
                flex: 1,
                valueFormatter: (value: any) => {
                  return formatToDatetime(value, false, false, false, "fr");
                },
                cellClassName: "overflow-scroll overflow-x-hidden",
                renderCell: (row: any) => {
                  return (
                    <TooltipedAsset asset={giveTimeAgo(row.value) as string}>
                      <div className="w-full h-full flex-center">
                        <div className="py-[8px] px-[24px] rounded-[10px] dark:text-white font-bold text-[18px]">
                          {row.formattedValue}
                        </div>
                      </div>
                    </TooltipedAsset>
                  );
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

                          const deleted = (await deleteCompany<BetaCompany>({
                            id: row.id,
                          })) as BetaCompany;
                          if (deleted) {
                            const companies = (await getCompanies<
                              BetaCompany[]
                            >(undefined, 0)) as BetaCompany[];
                            fetchRows(companies);
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
              const company = (await getCompany<BetaCompany>({
                id: row.id as string,
              })) as BetaCompany;
              dispatch(
                setModal({ display: "backoffice", company }) as UnknownAction
              );
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
