"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillCrown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@youmeet/global-config/store";
import { GlobalState } from "@youmeet/global-config/features/global";
import isSubscribedPro from "@youmeet/utils/isSubscribedPro";
import OneLineSkeleton from "../../OneLineSkeleton";

export default function BecomePremium() {
  const subscription = useSelector(
    (state: RootState) => (state.global as GlobalState).subscription
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isSubscribed = isSubscribedPro(subscription);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <OneLineSkeleton />;
  }

  return subscription === false ? (
    <OneLineSkeleton />
  ) : (
    <div className="w-full flex-center h-full">
      {isSubscribed ? (
        <div className="max-h-[40px] box-border px-[6px] flex-center gap-[6px] bg-white h-full rounded-xl border-[1px] border-solid border-yellow700 dark:border-yellow200 dark:extraLightDarkBg dark:text-white">
          <span className={"subItem dark:text-white"}>{t("premium-user")}</span>
          <AiFillCrown className="text-yellow700 item dark:text-yellow200" />
        </div>
      ) : (
        <Button
          className="max-h-[40px] box-border animate-pulse bg-deepPurple50 dark:extraLightDarkBg dark:text-white border-[1px] border-solid border-yellow700"
          onClick={() => {
            dispatch(setModal({ display: "account" }) as UnknownAction);
          }}
        >
          {t("become-premium")}
        </Button>
      )}
    </div>
  );
}
