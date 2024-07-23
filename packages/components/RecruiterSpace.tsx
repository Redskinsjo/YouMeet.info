import { uriPro } from "@youmeet/functions/imports";
import { Button, useMediaQuery } from "@mui/material";
import { cyan } from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function RecruiterSpace({
  newStyles,
}: {
  newStyles?: { [attr: string]: string | number };
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const router = useRouter();

  const component = useMemo(
    () => (
      <Link
        href={`${uriPro}/se-connecter`}
        className={"header-item text-white h-[36px]"}
      >
        <Button
          className="px-[18px] xs:px-[6px] sm:px-[6px] py-[4px] cursor-pointer no-underline legend h-full rounded-lg text-thisBlue border-0"
          style={{ ...newStyles, backgroundColor: cyan[50] }}
          tabIndex={0}
        >
          {t("recruiters")}
        </Button>
      </Link>
    ),
    [language]
  );

  useEffect(() => {
    router.prefetch(`${uriPro}/se-connecter`);
  }, []);

  return component;
}
