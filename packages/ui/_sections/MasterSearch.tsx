"use client";
import MasterSearchComponent from "../_homeComponents/MasterSearchComponent";
import { searchSomeoneRequest } from "@youmeet/functions/actions";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function MasterSearch() {
  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { search: "" },
  });
  const { t } = useTranslation();

  const customSearchSomeoneRequest = async (formData: FormData) => {
    const response = await searchSomeoneRequest(formData);
    if (response?.error) {
      setError("search", {
        type: response?.type,
        message: t(response?.message),
      });
    }
  };

  return (
    <form
      className="border-[0.5px] border-grey900 rounded-[8px] p-[12px] w-full box-border"
      action={customSearchSomeoneRequest}
    >
      <MasterSearchComponent
        setError={setError}
        clearErrors={clearErrors}
        errors={errors}
        name=""
        id={1}
        type=""
      />
    </form>
  );
}
