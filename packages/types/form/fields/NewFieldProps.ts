import { ReactElement } from "react";
import { FieldValueType } from "../StepContent";
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

export type NewFieldProps = {
  name: string;
  label?: string;
  required?: boolean;
  id?: number;
  select?: boolean;
  multiple?: boolean;
  type: string;
  value?: FieldValueType;
  multiline?: boolean;
  rows?: number;
  step?: number;
  children?: ReactElement | ReactElement[];
  phonecode?: string | undefined;
  errors?: FieldErrors<FieldValues>;
  setError?: UseFormSetError<FieldValues>;
  clearErrors?: UseFormClearErrors<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  placeholder?: string;
  tabIndex?: number;
  dataType?: string;
  onChange?: (e: any) => void;
  fromYouMeet?: boolean;
  category?: "organisation" | "offer";
  black?: true;
};
