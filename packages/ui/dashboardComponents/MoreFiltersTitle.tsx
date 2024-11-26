"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function MoreFiltersTitle() {
  const { t } = useTranslation();
  return (
    <div className="font-extralight text-[13px] text-grey500">
      {t("more-filters")}
    </div>
  );
}
