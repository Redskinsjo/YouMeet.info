"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function FooterList() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[12px] p-0 w-max">
      <h3 className="subItem xs:legend sm:legend dark:text-blueGrey100">
        {t("platform-navigate")}
      </h3>
      <ul className="flex flex-col">
        <li className="subItem xs:legend sm:legend font-semibold hover:text-blueGrey500 cursor-pointer text-blueGrey900 dark:text-white group-focus-visible:bg-grey100 rounded-xl group-focus-visible:px-[6px]">
          <Link
            href={"/"}
            className="no-underline group focus-visible:outline-0"
          >
            {t("home")}
          </Link>
        </li>
        <li className="subItem xs:legend sm:legend font-semibold hover:text-blueGrey500 cursor-pointer text-blueGrey900 dark:text-white group-focus-visible:bg-grey100 rounded-xl group-focus-visible:px-[6px]">
          <Link
            href={"/offres"}
            className="no-underline group focus-visible:outline-0"
          >
            {t("all-offers")}
          </Link>
        </li>
        <li className="subItem xs:legend sm:legend font-semibold hover:text-blueGrey500 cursor-pointer text-blueGrey900 dark:text-white group-focus-visible:bg-grey100 rounded-xl group-focus-visible:px-[6px]">
          <Link
            href={"/formulaire-profil"}
            className="no-underline group focus-visible:outline-0"
          >
            {t("the-form")}
          </Link>
        </li>
        <li className="subItem xs:legend sm:legend font-semibold hover:text-blueGrey500 cursor-pointer text-blueGrey900 dark:text-white group-focus-visible:bg-grey100 rounded-xl group-focus-visible:px-[6px]">
          <Link
            href={"/dashboard"}
            className="no-underline group focus-visible:outline-0"
          >
            {t("account")}
          </Link>
        </li>
      </ul>
    </div>
  );
}
