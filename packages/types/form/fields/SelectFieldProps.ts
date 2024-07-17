import {
  BetaCompany,
  GetCompaniesQuery,
  GetGptCompetenciesQuery,
  GetJobsQuery,
  GetOneCompanyQuery,
  GetOneGptCompetencyQuery,
  GetOneJobQuery,
  GetOneTopSectorQuery,
  GetTopSectorsQuery,
  GptCompetency,
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

export type Queries = GetGptCompetenciesQuery &
  GetTopSectorsQuery &
  GetJobsQuery &
  GetOneTopSectorQuery &
  GetOneJobQuery &
  GetOneGptCompetencyQuery &
  GetCompaniesQuery &
  GetOneCompanyQuery;

export type QueriesResponses = keyof Queries;

export type QueriesDocuments =
  | GptCompetency[]
  | TopSector[]
  | Job[]
  | BetaCompany[];
export type QueriesOneDocument = GptCompetency | TopSector | Job | BetaCompany;
export type PartialQueriesDocuments =
  | Partial<GptCompetency>[]
  | Partial<TopSector>[]
  | Partial<Job>[]
  | Partial<BetaCompany>[];

export type SelectFieldProps = {
  required?: boolean;
  name: SimpleSelectNames;
  location: string;
  placeholder?: string;
  label: string;
  id?: string;
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
};

export type GenericFieldProps = SelectFieldProps & {
  account?: boolean;
  topSectorIds?: string[];
  border?: string;
  multiline?: number;
  params?: any;
  onChange?: (e: any) => void;
  basic?: boolean;
  multiple?: boolean;
  genericClasses?: string;
  tags?: number;
  index?: number;
  sx?: { [key: string]: number | string };
  fetchData?: (value: string) => Promise<void>;
  type: string;
};
