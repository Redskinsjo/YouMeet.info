"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function FooterProposedBy() {
  const { t } = useTranslation();
  return (
    <div className="subItem xs:legend sm:legend dark:text-blueGrey100 mb-[12px] w-max">
      {t("proposed-by")}
      <Link
        href="https://youmeet-git-new-product-design-youmeet.vercel.app/Jonathan-Carnos"
        target="_blank"
        passHref
        className="no-underline group focus-visible:outline-0"
      >
        <div className="ml-2 text-blueGrey900 dark:text-white font-semibold cursor-pointer group-focus-visible:bg-grey100 rounded-xl">
          Jonathan Carnos
        </div>
      </Link>
    </div>
  );
}
