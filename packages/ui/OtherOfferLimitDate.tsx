"use client";
import { useTranslation } from "react-i18next";

const monthsMapping = {
  "0": "january",
  "1": "february",
  "2": "march",
  "3": "april",
  "4": "may",
  "5": "june",
  "6": "july",
  "7": "august",
  "8": "september",
  "9": "october",
  "10": "november",
  "11": "december",
};

export default function OtherOfferLimitDate({
  limitDate,
  revenue,
}: {
  limitDate: string;
  revenue?: string;
}) {
  const { t } = useTranslation();

  const format = limitDate.split(" ").map((p, i) => {
    if (i === 1) return (monthsMapping as any)[p];
    else return p;
  });
  const day = format[0];
  const month = format[1];
  const year = format[2];

  return (
    <div className="flex">
      {!!revenue && (
        <div className="flex items-end gap-[6px]">
          <span className="font-extralight text-[13px] xs:text-[11px] sm:text-[11px]">
            {t("salary")}
          </span>
          <div className="text-[14px] xs:text-[12px] sm:text-[12px] whitespace-nowrap">
            {revenue}
          </div>
        </div>
      )}
      {limitDate.length > 0 && (
        <div className="flex items-end gap-[6px]">
          <span className="font-extralight text-[13px] xs:text-[11px] sm:text-[11px]">
            {t("me-profile-infos-label-starting")}
          </span>
          <div className="text-[14px] xs:text-[12px] sm:text-[12px] whitespace-nowrap">
            {`${day} ${t(month)} ${year}`}
          </div>
        </div>
      )}
    </div>
  );
}
