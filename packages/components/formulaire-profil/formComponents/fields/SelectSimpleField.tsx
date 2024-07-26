import React, { useCallback, useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import SimpleField from "./SimpleField";
import { NewFieldProps } from "@youmeet/types/form/fields/NewFieldProps";
import { client } from "@youmeet/gql/index";
import {
  BetaCompany,
  Exact,
  GetCompaniesAutocompleteDocument,
  GetGptCompetenciesDocument,
  GetJobsDocument,
  GetOneCompanyDocument,
  GetOneGptCompetencyDocument,
  GetOneJobDocument,
  GetOneTopSectorDocument,
  GetTopSectorsDocument,
  GptCompetency,
  Job,
  TopSector,
  Translated,
} from "@youmeet/gql/generated";
import { TypedDocumentNode } from "@apollo/client";
import {
  Queries,
  QueriesDocuments,
  QueriesOneDocument,
  QueriesResponses,
} from "@youmeet/types/form/fields/SelectFieldProps";
import { useTranslation } from "react-i18next";
import {
  SimpleSelectData,
  SimpleSelectNames,
} from "@youmeet/types/form/fields/SimpleSelectNames";

const names: {
  [name: string]: {
    [key in "multiple" | "single"]: {
      request: TypedDocumentNode<Queries, Exact<{ [key: string]: never }>>;
      response: QueriesResponses;
    };
  };
} = {
  requirements: {
    multiple: {
      request: GetGptCompetenciesDocument,
      response: "gptCompetencies",
    },
    single: {
      request: GetOneGptCompetencyDocument,
      response: "oneGptCompetency",
    },
  },
  sector: {
    multiple: {
      request: GetTopSectorsDocument,
      response: "topSectors",
    },
    single: {
      request: GetOneTopSectorDocument,
      response: "oneTopSector",
    },
  },
  job: {
    multiple: { request: GetJobsDocument, response: "jobs" },
    single: { request: GetOneJobDocument, response: "oneJob" },
  },
  company: {
    multiple: {
      request: GetCompaniesAutocompleteDocument,
      response: "companies",
    },
    single: { request: GetOneCompanyDocument, response: "oneCompany" },
  },
};

export default function SelectSimpleField({
  name,
  id,
  type,
  label,
  value,
  multiple,
  errors,
  clearErrors,
  setError,
  placeholder,
}: NewFieldProps & {
  name: SimpleSelectNames;
}) {
  const [data, setData] = useState<QueriesDocuments>([]);

  const fetchData = useCallback(async () => {
    const response = await client.query({
      query: names[name].multiple.request,
    });
    const resData = response.data[names[name].multiple.response];
    if (resData) setData(resData as QueriesDocuments);
  }, [name]);

  useEffect(() => {
    fetchData();
  }, []);

  return type !== "hidden" ? (
    <SimpleField
      name={name}
      label={label}
      type={type}
      value={value}
      multiple={multiple}
      select
      id={id}
      errors={errors}
      setError={setError}
      placeholder={placeholder}
      clearErrors={clearErrors}
    >
      <Options name={name} data={data} />
    </SimpleField>
  ) : (
    <SimpleField
      name={name}
      label={label}
      type={"hidden"}
      value={value}
      id={id}
      placeholder={placeholder}
      errors={errors}
      setError={setError}
      clearErrors={clearErrors}
    />
  );
}

export function Options({
  data,
  name,
}: {
  name: SimpleSelectNames;
  data: QueriesDocuments | SimpleSelectData[];
}) {
  const {
    i18n: { language },
  } = useTranslation();
  const getValue = (one: QueriesOneDocument | SimpleSelectData): string => {
    if (name === "remote" || name === "contractType")
      return (one as SimpleSelectData).value;
    return (one as QueriesOneDocument).id as string;
  };

  const getLabel = (one: QueriesOneDocument | SimpleSelectData) => {
    if (name === "job")
      return ((one as Job).title as Translated)[language as "fr" | "en"];
    if (name === "company") return (one as BetaCompany).name;
    if (name === "requirements") return (one as GptCompetency).title;
    if (name === "sector")
      ((one as TopSector).title as Translated)[language as "fr" | "en"];

    return (one as SimpleSelectData).label;
  };

  return data.map((one) =>
    one ? (
      <MenuItem key={`${name}${getValue(one)}`} value={getValue(one)}>
        {getLabel(one)}
      </MenuItem>
    ) : undefined,
  );
}
