import { useCallback, useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import SimpleField from "./SimpleField";
import { NewFieldProps } from "@youmeet/types/form/fields/NewFieldProps";
import { client } from "@youmeet/gql/index";
import {
  BetaCompany,
  Exact,
  GetCompaniesAutocompleteDocument,
  GetCompetenciesDocument,
  GetJobsDocument,
  GetOneCompanyDocument,
  GetOneCompetencyDocument,
  GetOneJobDocument,
  GetOneTopSectorDocument,
  GetTopSectorsDocument,
  Competency,
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
import { PhoneCodes } from "@youmeet/types/form/fields/PhoneCodes";
import { useTranslation } from "react-i18next";
import {
  SimpleSelectData,
  SimpleSelectNames,
} from "@youmeet/types/form/fields/SimpleSelectNames";
import phoneCodes from "@youmeet/raw-data/phoneCodes.json";

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
      request: GetCompetenciesDocument,
      response: "competencies",
    },
    single: {
      request: GetOneCompetencyDocument,
      response: "oneCompetency",
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
  type = "text",
  label,
  value,
  multiple,
  errors,
  clearErrors,
  setError,
  placeholder,
  select,
  setValue,
}: NewFieldProps & {
  name: SimpleSelectNames;
}) {
  const [data, setData] = useState<QueriesDocuments>([]);

  const fetchData = useCallback(async () => {
    if (name === "phonecode") return setData(phoneCodes);
    if (names[name]?.multiple.request) {
      const response = await client.query({
        query: names[name]?.multiple.request,
      });
      const resData = response.data[names[name]?.multiple.response];
      if (resData) setData(resData as QueriesDocuments);
    }
  }, [name]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SimpleField
      name={name}
      label={label}
      type={type}
      value={value}
      multiple={multiple}
      setValue={setValue}
      select={select}
      errors={errors}
      setError={setError}
      placeholder={placeholder}
      clearErrors={clearErrors}
    >
      <Options name={name} data={data} />
    </SimpleField>
  );
}

export function Options({
  data,
  name,
}: {
  name: SimpleSelectNames;
  data: QueriesDocuments | SimpleSelectData[] | PhoneCodes[];
}) {
  const {
    i18n: { language },
  } = useTranslation();
  const getValue = (
    one: QueriesOneDocument | SimpleSelectData | PhoneCodes
  ): string => {
    if (name === "phonecode") return (one as PhoneCodes).dial_code;
    else if (name === "remote" || name === "contractType")
      return (one as SimpleSelectData).value;
    return (one as QueriesOneDocument).id as string;
  };

  const getLabel = (
    one: QueriesOneDocument | SimpleSelectData | PhoneCodes
  ) => {
    if (name === "phonecode")
      return `${(one as PhoneCodes).name} ${(one as PhoneCodes).code}`;
    if (name === "job")
      return ((one as Job).title as Translated)[language as "fr" | "en"];
    if (name === "company") return (one as BetaCompany).name;
    if (name === "requirements") return (one as Competency).title;
    if (name === "sector")
      ((one as TopSector).title as Translated)[language as "fr" | "en"];

    return (one as SimpleSelectData).label;
  };

  return data.map((one) =>
    one ? (
      <MenuItem key={`${name}${getValue(one)}`} value={getValue(one)}>
        {getLabel(one)}
      </MenuItem>
    ) : undefined
  );
}
