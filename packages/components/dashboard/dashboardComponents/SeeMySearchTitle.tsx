"use client";
import { useTranslation } from "react-i18next";

export default function SeeMySearchTitle() {
  const { t } = useTranslation();
  return (
    <div className="font-extralight text-[13px] text-grey500 flex-center">
      {t("home")}
    </div>
  );
}
