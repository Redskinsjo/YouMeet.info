"use client";
import { useTranslation } from "react-i18next";

export default function NotFoundChild() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 flex-center flex-col afterHeader">
      <div>
        <h1 className="titles text-blueGrey700 font-bold m-0 p-0 text-center">
          {t("404")}
        </h1>
        <p>{t("404-text")}</p>
      </div>
    </div>
  );
}
