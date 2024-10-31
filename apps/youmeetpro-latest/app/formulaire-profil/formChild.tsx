"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { FormState } from "@youmeet/global-config/features/form";
import { useTranslation } from "react-i18next";
import { FormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import Logo from "@youmeet/ui/Logo";

const Page = dynamic(() => import("./formComponents/Page"));

export default function FormChild({
  defaultValues,
  category,
}: {
  defaultValues: FormDefaultValues | undefined;
  category: "organisation" | "offer";
}) {
  const form = useSelector((state: RootState) => state.form as FormState);
  const { t } = useTranslation();

  return (
    <div
      className={
        form.loading
          ? "w-full h-screen flex-center dark:darkBg flex-1"
          : "dark:darkBg flex flex-col flex-1"
      }
    >
      {form.loading ? (
        <div className="flex-center flex-col gap-[12px]">
          <h3 className="dark:text-white">{t("saving-data")}</h3>
          <Logo gif png />
        </div>
      ) : undefined}

      {!form.loading ? (
        <Page defaultValues={defaultValues} category={category} />
      ) : undefined}
    </div>
  );
}
