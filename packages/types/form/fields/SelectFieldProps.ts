import {
  BetaCompany,
  GetCompaniesQuery,
  GetCompetenciesQuery,
  GetJobsQuery,
  GetOneCompanyQuery,
  GetOneCompetencyQuery,
  GetOneJobQuery,
  GetOneTopSectorQuery,
  GetTopSectorsQuery,
  Competency,
  Job,
  TopSector,
} from "@youmeet/gql/generated";
import {
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import { SimpleSelectNames } from "./SimpleSelectNames";
import { AutocompleteRenderInputParams } from "@mui/material";

export type Queries = GetCompetenciesQuery &
  GetTopSectorsQuery &
  GetJobsQuery &
  GetOneTopSectorQuery &
  GetOneJobQuery &
  GetOneCompetencyQuery &
  GetCompaniesQuery &
  GetOneCompanyQuery;

export type QueriesResponses = keyof Queries;

export type QueriesDocuments =
  | Competency[]
  | TopSector[]
  | Job[]
  | BetaCompany[];
export type QueriesOneDocument = Competency | TopSector | Job | BetaCompany;
export type PartialQueriesDocuments =
  | Partial<Competency>[]
  | Partial<TopSector>[]
  | Partial<Job>[]
  | Partial<BetaCompany>[];

export type SelectFieldProps = {
  required?: boolean;
  name: SimpleSelectNames;
  location: string;
  placeholder?: string;
  label: string;
  type: string;
  value?: any | any[];
  step?: number;
  phonecode?: string;
  errors?: FieldErrors<FieldValues>;
  setError?: UseFormSetError<FieldValues>;
  clearErrors?: UseFormClearErrors<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  register?: UseFormRegister<FieldValues>;
  onChange?: (payload: any) => void;
  multiple?: true;
  tags?: number;
  fnc?: (...args: any) => void;
};

export type GenericFieldProps = SelectFieldProps & {
  account?: boolean;
  topSectorIds?: string[];
  border?: string;
  multiline?: number;
  params?: AutocompleteRenderInputParams;
  onChange?: (e: any) => void;
  basic?: boolean;
  multiple?: boolean;
  genericClasses?: string;
  tags?: number;
  index?: number;
  sx?: { [key: string]: number | string };
  fetchData?: (value: string) => Promise<void>;
  type: string;
  fnc?: (...args: any) => void;
};
