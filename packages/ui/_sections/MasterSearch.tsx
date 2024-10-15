"use client";
import { useTranslation } from "react-i18next";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SimpleField from "../formulaire-profil/formComponents/fields/SimpleField";
import { searchSomeoneRequest } from "@youmeet/functions/actions";

export default function MasterSearch() {
  const [loading, setLoading] = useState(true);
  const {
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { search: "" },
  });
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <form
        action={async (formData: FormData) => {
          const response = await searchSomeoneRequest(formData);
          if (response?.error) {
            setError("search", {
              type: response?.type,
              message: t(response?.message),
            });
          }
        }}
      >
        <h2 className="underline underline-offset-[2px]">
          {t("search-for-someone")}
        </h2>
        <SimpleField
          id={1}
          label={t("search")}
          setError={setError}
          clearErrors={clearErrors}
          name="search"
          type="text"
          errors={errors}
          placeholder={t("search-by-fullname")}
        />
      </form>
    )
  );
}
