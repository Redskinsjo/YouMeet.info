"use client";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

export default function TogglePersonalInfo({
  setPersonalInfo,
}: {
  setPersonalInfo: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  return (
    <div
      onClick={() => setPersonalInfo((info) => !info)}
      className="infos-component cursor-pointer dark:text-deepPurple200 text-deepPurple700 font-bold"
    >
      {t("toggle-personal-infos")}
    </div>
  );
}
