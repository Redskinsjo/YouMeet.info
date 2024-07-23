"use client";
import { useTranslation } from "react-i18next";

export default function CGUTitle() {
  const { t } = useTranslation();
  return <h1 className="text-center dark:text-white">{t("cgu-title")}</h1>;
}
