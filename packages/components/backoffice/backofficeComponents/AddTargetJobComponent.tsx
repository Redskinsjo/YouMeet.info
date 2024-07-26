import { useTranslation } from "react-i18next";
import SelectField from "../../formulaire-profil/formComponents/fields/SelectField";
import { BetaUser } from "@youmeet/gql/generated";
import { Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { onUpdateTargetJob } from "@youmeet/functions/actions";
import { setError } from "@youmeet/global-config/features/global";
import { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import React from "react";

export default function AddTargetJobComponent({
  profil,
}: {
  profil: BetaUser;
}) {
  const { setValue, watch, handleSubmit, clearErrors, register } =
    useForm<FieldValues>({
      values: { job: "" },
    });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const customOnUpdateTargetJob = async (formData: FieldValues) => {
    const userId = profil.id as string;
    const result = await onUpdateTargetJob(userId, formData);
    if (result && isPayloadError(result))
      dispatch(setError("not-completed") as UnknownAction);
  };

  return !profil.candidate?.targetJob ? (
    <form
      className="w-full flex"
      onSubmit={handleSubmit(customOnUpdateTargetJob)}
    >
      <SelectField
        type="text"
        clearErrors={clearErrors}
        name="job"
        location="job"
        label={t("jobTitle")}
        placeholder={t("what-job")}
        value={watch("job")}
        watch={watch}
        setValue={setValue}
        register={register}
      />
      {watch("job") ? <Button type="submit">{t("submit")}</Button> : undefined}
    </form>
  ) : undefined;
}
