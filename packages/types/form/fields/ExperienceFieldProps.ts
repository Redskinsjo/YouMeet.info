import {
  FieldErrorsImpl,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  ExperienceFieldAttrs,
  FieldValues,
} from "@youmeet/types/form/StepContent";

export type Errors = Partial<
  FieldErrorsImpl<{
    [x: string]: NonNullable<string | ExperienceFieldAttrs[] | File[] | null>;
  }>
>;

export type ExperienceFieldProps = {
  register: UseFormRegister<FieldValues>;
  index: number;
  array: ExperienceFieldAttrs[];
  setValue: UseFormSetValue<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: NonNullable<string | File[] | ExperienceFieldAttrs[] | null>;
    }>
  >;
  watch: UseFormWatch<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  locations: {
    sector: string;
    job: string;
    company: string;
    companyName: string;
    isLiveJob: string;
    ending: string;
    starting: string;
  };
};
