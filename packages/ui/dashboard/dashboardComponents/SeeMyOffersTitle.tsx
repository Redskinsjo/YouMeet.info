"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function SeeMyOffersTitle() {
  const { t } = useTranslation();
  return (
    <div className="font-extralight text-[13px] text-grey500 flex-center">
      {t("company-offers")}
    </div>
  );
}
