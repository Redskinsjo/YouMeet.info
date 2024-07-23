"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import Link from "next/link";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";

export default function CreateOffer() {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user as UserState);

  return (
    <TooltipedAsset
      asset={
        !user.company?.id ? (
          <Link role="link" href={"/compte"}>
            {t("first-create-a-company")}
          </Link>
        ) : (
          t("new-offer")
        )
      }
    >
      <div className="px-[1px]">
        {!user.company?.id ? (
          <div>
            <Button className="max-h-[40px] box-border cursor-not-allowed border-[1px] border-white border-solid text-black bg-deepPurple50 dark:text-white dark:hover:text-black dark:extraLightDarkBg">
              {t("create")}
            </Button>
          </div>
        ) : (
          <div className="flex-center gap-[6px]">
            <Link role="link" href={"/creer-offre"}>
              <Button className="max-h-[40px] box-border border-[1px] border-white border-solid text-black bg-deepPurple50 dark:text-white dark:hover:text-black dark:extraLightDarkBg">
                {t("create")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </TooltipedAsset>
  );
}
