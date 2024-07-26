"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";
import { useTranslation } from "react-i18next";

export default function SeeMyCandidates() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <TooltipedAsset asset={t("see-my-candidates")}>
      <div className="px-[1px]">
        <Link href={"/mes-candidats"}>
          <Button
            className="max-h-[40px] box-border border-[1px] border-white border-solid text-black bg-deepPurple50 dark:text-white dark:hover:text-black dark:extraLightDarkBg"
            style={{
              cursor: loading ? "cursor-not-allowed" : "cursor-pointer",
            }}
          >
            {t("my-candidates")}
          </Button>
        </Link>
      </div>
    </TooltipedAsset>
  );
}
