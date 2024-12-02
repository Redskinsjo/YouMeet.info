"use client";
import { NAME, uri } from "@youmeet/functions/imports";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function FooterProposedBy() {
  const { t } = useTranslation();
  return (
    <div className="subItem xs:legend sm:legend dark:text-blueGrey100 font-light mb-[12px] w-max">
      {t("proposed-by")}
      <Link
        href={`${uri}/Jonathan-Carnos_R_S8DZ`}
        target="_blank"
        passHref
        className="no-underline group focus-visible:outline-0"
      >
        <div className="ml-2 text-blueGrey900 dark:text-white text-blueGrey700 hover:opacity-50 cursor-pointer group-focus-visible:bg-grey100 rounded-xl">
          {NAME}
        </div>
      </Link>
    </div>
  );
}
