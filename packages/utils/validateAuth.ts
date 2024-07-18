import { FieldValues, UseFormSetError, UseFormWatch } from "react-hook-form";
export const validateEmail = (email: string) => {
  const regex = new RegExp(
    /[a-zA-Z0-9._-]{1,}@[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]{2,}/,
    "gi",
  );
  return regex.test(email);
};

export const validateSignup = (
  setError: UseFormSetError<FieldValues>,
  watch: UseFormWatch<FieldValues>,
  callback: () => {},
) => {
  if (!watch("email")) {
    return setError("email", { message: "Ce champ est obligatoire" });
  }
  if (!validateEmail(watch("email"))) {
    return setError("email", { message: "Ce champ doit être un email" });
  }
  if (!watch("password")) {
    return setError("password", { message: "Ce champ est obligatoire" });
  }
  if (!watch("firstname")) {
    return setError("firstname", { message: "Ce champ est obligatoire" });
  }
  if (!watch("lastname")) {
    return setError("lastname", { message: "Ce champ est obligatoire" });
  }

  if (
    watch("email") &&
    watch("password") &&
    watch("firstname") &&
    watch("lastname")
  ) {
    callback();
  }
};

export const validateSignin = (
  setError: UseFormSetError<FieldValues>,
  watch: UseFormWatch<FieldValues>,
  callback: () => {},
) => {
  if (!watch("email")) {
    return setError("email", { message: "Ce champ est obligatoire" });
  }
  if (!validateEmail(watch("email"))) {
    return setError("email", { message: "Ce champ doit être un email" });
  }
  if (!watch("password")) {
    return setError("password", { message: "Ce champ est obligatoire" });
  }
  if (watch("email") && watch("password")) {
    callback();
  }
};

export const validateForgotten = (
  setError: UseFormSetError<FieldValues>,
  watch: UseFormWatch<FieldValues>,
  callback: () => {},
) => {
  if (!watch("email")) {
    return setError("email", { message: "Ce champ est obligatoire" });
  }
  if (!validateEmail(watch("email"))) {
    return setError("email", { message: "Ce champ doit être un email" });
  }
  if (watch("email")) {
    callback();
  }
};
