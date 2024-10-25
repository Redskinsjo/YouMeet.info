"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function FooterList2() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[12px] p-0 w-max">
      <h3 className="my-0 subItem xs:legend sm:legend dark:text-blueGrey100 font-light">
        {t("legal-info")}
      </h3>
      <ul className="flex flex-col">
        <li className="subItem xs:legend sm:legend text-black cursor-pointer text-blueGrey900 dark:text-white">
          <Link
            href={"/conditions-generales-utilisation"}
            passHref
            className="no-underline dark:text-white text-blueGrey700 hover:opacity-50 focus-visible:outline-0"
          >
            {t("using-conditions")}
          </Link>
        </li>
      </ul>
    </div>
  );
}
