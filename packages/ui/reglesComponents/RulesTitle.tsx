"use client";
import { useTranslation } from "react-i18next";
export default function RulesTitle() {
  const { t } = useTranslation();
  return <h1 className="text-center">{t("confidentiality-rules")}</h1>;
}
