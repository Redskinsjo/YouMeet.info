"use client";
import { setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserNotices() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/message");
  }, []);
  return (
    <div
      className="h-[220px] flex-center flex-col dark:extraLightDarkBg hover:bg-grey100 dark:hover:mediumDarkBg cursor-pointer"
      onClick={() => {
        dispatch(setModal({ display: "remark" }) as UnknownAction);
        router.push("/message");
      }}
    >
      <div className="text-[14px] dark:text-grey200">
        {t("would-like-your-remarks")}
      </div>
      <span className="legend text-deepPurple900 dark:text-white">
        {t("add-remark")}
      </span>
    </div>
  );
}
