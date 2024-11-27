"use client";
import BoldText from "@youmeet/ui/BoldText";
import { useTranslation } from "react-i18next";

export default function PageContentTitle() {
  const { t } = useTranslation();
  return (
    <div className="w-full flex-center flex-col gap-[24px]">
      <h1 className="text-center my-[36px] dark:text-white">{t("the-form")}</h1>
      <div className="p-[6px]">
        <BoldText text={t("fulfill-perso-form")} />
      </div>
    </div>
  );
}
