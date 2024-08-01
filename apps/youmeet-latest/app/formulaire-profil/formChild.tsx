"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { FormState } from "@youmeet/global-config/features/form";
import { useTranslation } from "react-i18next";
import { ProfileFormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import Logo from "@youmeet/ui/Logo";
import dynamic from "next/dynamic";

const Page = dynamic(() => import("./formComponents/Page"));

export default function FormChild({
  defaultValues,
}: {
  defaultValues: Partial<ProfileFormDefaultValues> | undefined;
}) {
  const form = useSelector((state: RootState) => state.form as FormState);
  const { t } = useTranslation();

  return (
    <div
      className={
        form.loading
          ? "w-full h-screen flex-center flex-1 dark:darkBg"
          : "flex-1 flex flex-col dark:darkBg"
      }
    >
      {form.loading ? (
        <div className="flex-center flex-col gap-[12px]">
          <h3 className="dark:text-white">{t("saving-data")}</h3>
          <Logo />
        </div>
      ) : undefined}

      {!form.loading ? <Page defaultValues={defaultValues} /> : undefined}
    </div>
  );
}
