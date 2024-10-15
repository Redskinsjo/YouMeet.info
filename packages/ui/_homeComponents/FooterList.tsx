"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function FooterList() {
  const { t } = useTranslation();

  return (
    <ul className="flex flex-col gap-[12px] p-0 w-max">
      <h3 className="subItem xs:legend sm:legend dark:text-blueGrey100">
        {t("platform-navigate")}
      </h3>
      <Link href={"/"} className="no-underline group focus-visible:outline-0">
        <li className="subItem xs:legend sm:legend font-semibold hover:text-blueGrey500 cursor-pointer text-blueGrey900 dark:text-white group-focus-visible:bg-grey100 rounded-xl group-focus-visible:px-[6px]">
          {t("home")}
        </li>
      </Link>
      <Link
        href={"/offres"}
        className="no-underline group focus-visible:outline-0"
      >
        <li className="subItem xs:legend sm:legend font-semibold hover:text-blueGrey500 cursor-pointer text-blueGrey900 dark:text-white group-focus-visible:bg-grey100 rounded-xl group-focus-visible:px-[6px]">
          {t("all-offers")}
        </li>
      </Link>
      <Link
        href={"/formulaire-profil"}
        className="no-underline group focus-visible:outline-0"
      >
        <li className="subItem xs:legend sm:legend font-semibold hover:text-blueGrey500 cursor-pointer text-blueGrey900 dark:text-white group-focus-visible:bg-grey100 rounded-xl group-focus-visible:px-[6px]">
          {t("the-form")}
        </li>
      </Link>
      <Link
        href={"/dashboard"}
        className="no-underline group focus-visible:outline-0"
      >
        <li className="subItem xs:legend sm:legend font-semibold hover:text-blueGrey500 cursor-pointer text-blueGrey900 dark:text-white group-focus-visible:bg-grey100 rounded-xl group-focus-visible:px-[6px]">
          {t("account")}
        </li>
      </Link>
    </ul>
  );
}
