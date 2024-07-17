import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";

export type NewReferenceFieldProps = {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  type: "name" | "job" | "phone" | "email";
  index: number;
};

export type NewReferenceTypes = {
  name: "";
  job: "";
  phone: "";
  email: "";
};
