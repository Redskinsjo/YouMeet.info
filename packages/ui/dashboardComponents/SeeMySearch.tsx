"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import TooltipedAsset from "../TooltipedAsset";
import { useTranslation } from "react-i18next";

export default function SeeMySearch() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <TooltipedAsset asset={t("see-my-search")}>
      <div className="px-[1px]">
        <Link href={"/dashboard"}>
          <Button
            className="max-h-[40px] box-border border-[1px] border-white border-solid text-black bg-deepPurple50 dark:text-white dark:hover:text-black dark:extraLightDarkBg"
            style={{
              cursor: loading ? "cursor-not-allowed" : "cursor-pointer",
            }}
          >
            {t("my-search")}
          </Button>
        </Link>
      </div>
    </TooltipedAsset>
  );
}
