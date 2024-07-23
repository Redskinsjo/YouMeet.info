"use client";
import BoldText from "@youmeet/components/BoldText";
import { useTranslation } from "react-i18next";

export default function ReferenceComponentTitle() {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="mb-[24px] p-0 item text-center m-0 dark:text-white">
        {t("reference")}
      </h3>
      <BoldText
        text={t("profile-refs-text")}
        fontSizeClass="text-blueGrey700 dark:text-blueGrey200"
        align="center"
      />
    </>
  );
}
