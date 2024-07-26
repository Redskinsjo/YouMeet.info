"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ProductPunchlineCta({ cta }: { cta: string }) {
  const { t } = useTranslation();
  return (
    <h3 className="text-blueGrey900 dark:text-white sentences px-[48px] xs:px-0 text-center">
      {t(cta)}
    </h3>
  );
}
