"use client";
import TooltipedAsset from "@youmeet/ui/TooltipedAsset";
import { client } from "@youmeet/gql/index";
import {
  Lead,
  SendEmailProspectionLinkedinDocument,
  MutationUpdateLeadArgs,
} from "@youmeet/gql/generated";
import { formatToDatetime, giveTimeAgo } from "@youmeet/utils/formatToDatetime";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getLead } from "@youmeet/functions/request";
import { getUniversalFromCodeAndNumber } from "@youmeet/utils/formatPhone";
import {
  onDeleteLead,
  onSendEmailToLead,
  onUpdateLead,
} from "@youmeet/functions/actions";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { setError } from "@youmeet/global-config/features/global";

export default function LeadsGrid({ data }: { data: Lead[] }) {
  const {
    i18n: { language },
  } = useTranslation();
  const [rowsIdsSelected, setRowsIdsSelected] = useState<string[]>([]);
  const dispatch = useDispatch();

  const customOnDeleteLead = async (id: string) => {
    await onDeleteLead(id);
  };

  const customeOnUpdateLead = async (
    updates: MutationUpdateLeadArgs["data"]
  ) => {
    await onUpdateLead(updates);
  };

  const customOnSendEmailToLead = async (leadsIds: string[]) => {
    const result = await onSendEmailToLead(leadsIds);
    if (result && isPayloadError(result)) {
      dispatch(setError("not-completed") as UnknownAction);
    } else if (!result.data || result.data.length === 0) {
      dispatch(setError("not-completed") as UnknownAction);
    } else {
      dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
    }
  };

  return (
    <>
      <div className="flex gap-[6px]">
        <Button
          disabled={rowsIdsSelected.length === 0}
          onClick={async () => {
            if (rowsIdsSelected.length > 0) {
              const response = await client.query({
                query: SendEmailProspectionLinkedinDocument,
                variables: { leadsIds: rowsIdsSelected },
              });
              const leads = response.data.sendEmailProspectionLinkedin;
              if (leads)
                dispatch(
                  setModal({ display: "backofficeConfirm" }) as UnknownAction
                );
            }
          }}
        >
          Démarchage Linkedin
        </Button>
        <form action={() => customOnSendEmailToLead(rowsIdsSelected)}>
          <Button type="submit" disabled={rowsIdsSelected.length === 0}>
            Envoyer Trial et Connexion Automatique
          </Button>
        </form>
      </div>
      <div className="overflow-x-scroll w-full">
        <DataGrid
          className="flex-1 max-h-[700px]"
          getRowClassName={(row) =>
            new Date().getTime() - new Date(row.row.createdAt).getTime() <
            1000 * 3600 * 24 * 7
              ? "bg-deepPurple300 animate-pulse cursor-pointer"
              : "cursor-pointer"
          }
          rows={
            data?.map((lead) => ({
              id: lead?.id,
              name: lead?.name,
              contacted: lead?.contacted ? "Oui" : "Non",
              email: lead?.email as string,
              type: lead?.type as string,
              phone: getUniversalFromCodeAndNumber(
                lead?.phone?.code as string,
                lead?.phone?.number as string
              ),
              trialOffering: lead?.trialOffering,
              fr: lead?.fr,
              createdAt: lead?.createdAt,
              updatedAt: lead?.updatedAt,
            })) || []
          }
          columns={[
            {
              type: "string",
              field: "email",
              headerName: "Email",
              minWidth: 200,
            },
            {
              type: "string",
              field: "name",
              headerName: "Name",
              maxWidth: 100,
            },
            {
              type: "string",
              field: "phone",
              headerName: "Téléphone",
              maxWidth: 100,
            },
            {
              type: "boolean",
              field: "fr",
              headerName: "Français",
              maxWidth: 70,
            },
            {
              type: "string",
              field: "contacted",
              headerName: "Contacté",
              maxWidth: 70,
            },
            {
              type: "dateTime",
              field: "trialOffering",
              headerName: "Essai offert",
              maxWidth: 100,
              valueFormatter: (value: any) => {
                return formatToDatetime(value, false, false, false, language);
              },
              cellClassName: "overflow-scroll overflow-x-hidden",
              renderCell: (row: any) => {
                return (
                  <TooltipedAsset asset={giveTimeAgo(row.value) as string}>
                    <div
                      className="py-[8px] px-[24px] bg-white rounded-[10px]"
                      style={{ overflow: "scroll" }}
                    >
                      {row.formattedValue}
                    </div>
                  </TooltipedAsset>
                );
              },
            },
            {
              type: "string",
              field: "type",
              headerName: "Type",
              maxWidth: 100,
            },
            {
              type: "dateTime",
              field: "createdAt",
              headerName: "Créé",
              maxWidth: 100,
              valueFormatter: (value: any) => {
                return formatToDatetime(value, false, false, false, language);
              },
              cellClassName: "overflow-scroll overflow-x-hidden",
              renderCell: (row: any) => {
                return (
                  <TooltipedAsset asset={giveTimeAgo(row.value) as string}>
                    <div
                      className="py-[8px] px-[24px] bg-white rounded-[10px]"
                      style={{ overflow: "scroll" }}
                    >
                      {row.formattedValue}
                    </div>
                  </TooltipedAsset>
                );
              },
            },
            {
              type: "dateTime",
              field: "updatedAt",
              headerName: "Modifié",
              maxWidth: 100,
              valueFormatter: (value: any) => {
                return formatToDatetime(value, false, false, false, language);
              },
              cellClassName: "overflow-scroll overflow-x-hidden",
              renderCell: (row: any) => {
                return (
                  <TooltipedAsset asset={giveTimeAgo(row.value) as string}>
                    <div
                      className="py-[8px] px-[24px] bg-white rounded-[10px]"
                      style={{ overflow: "scroll" }}
                    >
                      {row.formattedValue}
                    </div>
                  </TooltipedAsset>
                );
              },
            },
            {
              field: "actions",
              headerName: "Actions",
              flex: 1,
              renderCell: (row: any) => {
                return (
                  <div className="overflow-hidden overflow-x-scroll flex-center">
                    <form
                      action={() =>
                        customeOnUpdateLead({
                          contacted: false,
                          leadId: row.row.id as string,
                        })
                      }
                    >
                      <Button type="submit">Réinitialise Contacté</Button>
                    </form>
                    <form action={() => customOnDeleteLead(row.id)}>
                      <Button type="submit">Supprimer</Button>
                    </form>
                  </div>
                );
              },
            },
          ]}
          checkboxSelection
          rowHeight={70}
          onRowSelectionModelChange={(rows) => {
            setRowsIdsSelected(rows as string[]);
          }}
          onRowClick={async (row) => {
            const lead = (await getLead<Lead>({
              id: row.id as string,
            })) as Lead;
            dispatch(
              setModal({
                display: "backoffice",
                lead,
              }) as UnknownAction
            );
          }}
        />
      </div>
    </>
  );
}
