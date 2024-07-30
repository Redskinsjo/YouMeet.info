"use client";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Error } from "@youmeet/gql/generated";
import DetailComponent from "../../../DetailComponent";
import { formatToDatetime } from "@youmeet/utils/formatToDatetime";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import React from "react";

export default function Content({ errors }: { errors: Error[] }) {
  const [displayed, setDisplayed] = useState<Error[]>(errors);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <div>
      <div className="flex-center">
        <Button
          onClick={() => {
            const displaying = displayed.reverse();
            setDisplayed(displaying);
          }}
        >
          Reverse
        </Button>
        <TextField
          onChange={(e) => {
            const value = e.target.value;
            const sorted = errors.sort((a) => {
              if (String(a.status) === value) return -1;
              return 0;
            });
            setDisplayed(sorted);
          }}
        />
      </div>
      {displayed.map((err) => {
        return (
          <Accordion key={err.id}>
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              <DetailComponent
                label="Créé"
                noLabelColon
                noPadding
                value={formatToDatetime(
                  err.createdAt,
                  false,
                  false,
                  false,
                  language
                )}
              />
              <DetailComponent
                label="Environnement"
                noLabelColon
                noPadding
                value={err.environment}
              />
              <DetailComponent
                noLabelColon
                noPadding
                label="Application"
                value={err.pro ? "Pro" : "Candidat"}
              />
              <DetailComponent
                noLabelColon
                noPadding
                label="Requête"
                value={err.query}
              />
              <DetailComponent
                noLabelColon
                noPadding
                label="Statut"
                value={String(err.status)}
              />
              <DetailComponent
                noLabelColon
                noPadding
                label="Texte de statut"
                value={err.statusText ? String(err.statusText) : "-"}
              />
              <DetailComponent
                noLabelColon
                noPadding
                label="Type"
                value={String(err.type)}
              />
            </AccordionSummary>
            <AccordionDetails>{err.message}</AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
