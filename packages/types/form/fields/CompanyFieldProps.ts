import {
  FieldValues,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type CompanyFieldProps = {
  name: string;
  location: string;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
};
