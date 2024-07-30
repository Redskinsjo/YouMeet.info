"use client";
import { useTranslation } from "react-i18next";

export default function NoData({ name }: { name?: string }) {
  const { t } = useTranslation();
  return (
    <div className="h-[240px] flex-center">
      <span className="text-blueGrey300 dark:text-blueGrey100 dark:mediumDarkBg italic text-[14px] text-center">
        {t(`no-${name ?? "data"}`)}
      </span>
    </div>
  );
}
