"use client";
import { useTranslation } from "react-i18next";

export default function TransmitOffers() {
  const { t } = useTranslation();
  return (
    <span className="font-extralight text-[13px] xs:text-[11px] sm:text-[11px] whitespace-nowrap">
      {t("transmit-your-video")}
    </span>
  );
}
