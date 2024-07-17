import { FieldValues } from "@youmeet/types/form/StepContent";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type FirstStepProps = {
  step: 1 | 2 | 3;
  category: "profile" | "organisation";
  getValues: UseFormGetValues<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  watch: UseFormWatch<FieldValues>;
};
