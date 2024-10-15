"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function FooterList2() {
  const { t } = useTranslation();

  return (
    <ul className="flex flex-col gap-[12px] p-0 w-max">
      <h3 className="my-0 subItem xs:legend sm:legend dark:text-blueGrey100">
        {t("legal-info")}
      </h3>
      <Link
        href={"/conditions-generales-utilisation"}
        passHref
        className="no-underline group focus-visible:outline-0"
      >
        <li className="subItem xs:legend sm:legend font-semibold hover:text-blueGrey500 cursor-pointer text-blueGrey900 dark:text-white">
          {t("using-conditions")}
        </li>
      </Link>
    </ul>
  );
}
