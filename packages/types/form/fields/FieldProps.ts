import {
  UseFormRegister,
  UseFormWatch,
  FieldErrorsImpl,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
  UseFormClearErrors,
} from "react-hook-form";
import {
  FieldValues,
  ExperienceFieldAttrs,
} from "@youmeet/types/form/StepContent";

export type Errors = Partial<
  FieldErrorsImpl<{
    [x: string]: NonNullable<string | ExperienceFieldAttrs[] | File[] | null>;
  }>
>;

export type FieldProps = {
  register?: UseFormRegister<FieldValues>;
  exp?: ExperienceFieldAttrs;
  index?: number;
  array?: ExperienceFieldAttrs[];
  setValue?: UseFormSetValue<FieldValues>;
  getValues?: UseFormGetValues<FieldValues>;
  setError?: UseFormSetError<FieldValues>;
  errors?: Partial<
    FieldErrorsImpl<{
      [x: string]: NonNullable<string | File[] | ExperienceFieldAttrs[] | null>;
    }>
  >;
  watch: UseFormWatch<FieldValues>;
  clearErrors?: UseFormClearErrors<FieldValues>;
  pro?: boolean;
  isValid?: boolean;
  i?: number;
  isRef?: boolean;
};

export type FirstnameFieldProps = {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
};
