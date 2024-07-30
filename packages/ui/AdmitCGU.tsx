"use client";
import Link from "next/link";
import BoldText from "./BoldText";
import { useTranslation } from "react-i18next";
import React from "react";

export default function AdmitCGU() {
  const { t } = useTranslation();
  return (
    <div>
      <BoldText text={"admit-cgu"} component="span" />
      <Link href={"/conditions-generales-utilisation"}>
        <span className="dark:text-white">{t("using-conditions")}</span>
      </Link>
    </div>
  );
}
