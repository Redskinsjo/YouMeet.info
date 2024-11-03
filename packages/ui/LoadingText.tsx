"use client";
import { useTranslation } from "react-i18next";

export default function LoadingText() {
  const { t } = useTranslation();
  return <div>{t("loading")}</div>;
}
