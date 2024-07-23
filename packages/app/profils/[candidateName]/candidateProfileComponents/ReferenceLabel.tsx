"use client";
import { HiAcademicCap } from "react-icons/hi2";
import { MdOutlineWork } from "react-icons/md";
import { GiLifeInTheBalance } from "react-icons/gi";
import { Reference } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import React from "react";

export default function ReferenceLabel({
  title,
  list,
}: {
  title: string;
  list: Reference[];
}) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center gap-[24px] w-full">
      <div className="flex items-center justify-start gap-[6px]">
        {title === "pro" ? (
          <MdOutlineWork />
        ) : title === "academic" ? (
          <HiAcademicCap />
        ) : (
          <GiLifeInTheBalance />
        )}
        <h5 className="text-[15px] my-[12px] dark:text-white">{t(title)}</h5>
      </div>
      {list.some((ref) => (ref ? ref.valid : null)) ? (
        <div className="flex-center text-[15px] dark:text-grey100">
          {t("verified")}
        </div>
      ) : undefined}
    </div>
  );
}
