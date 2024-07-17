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

export type SecondStepProps = {
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
};
