import { FormExperience } from "./useFormDefaultValues";
import { Avatar } from "@youmeet/gql/generated";
import { NewReferenceTypes } from "../NewReferenceFieldProps";
import { FormDefaultValues } from "./useFormDefaultValues";

export type ExperienceFieldAttrs = {
  id: string;
  sector: string;
  job: string;
  company: string;
  starting: string;
  ending: string;
  duration: null;
  isLiveJob: boolean;
};

export type FieldValues = Record<
  string,
  | (File | undefined | string | Avatar | null)[]
  | ExperienceFieldAttrs[]
  | string
  | null
  | number
  | FormExperience[]
  | NewReferenceTypes[]
  | { id: string; name: string; input: true }
>;

export type StepContentProps = {
  category: "organisation" | "offer";
  defaultValues: Partial<FormDefaultValues> | undefined;
};

export type PageProps = {
  field: (props: any) => JSX.Element;
  props: {
    name: string;
    id: number;
  };
};

export type FieldValueType =
  | string
  | number
  | null
  | (Avatar | null)[]
  | (string | null)[]
  | FormExperience[];
