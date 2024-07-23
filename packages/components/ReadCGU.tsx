"use client";
import Link from "next/link";
import BoldText from "./BoldText";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@mui/material";

export default function ReadCGU() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center">
      <Checkbox required name="cgu" />
      <div>
        <BoldText component="span" text={t("read-cgu")} />
        <Link href={"/conditions-generales-utilisation"} target="_blank">
          <span className="dark:text-white">{t("using-conditions")}</span>
        </Link>
      </div>
    </div>
  );
}
