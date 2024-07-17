import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FieldValues } from "@youmeet/types/form/StepContent";

export type DescriptionFieldProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};
