"use client";
import { useTranslation } from "react-i18next";
import BoldText from "../../BoldText";
import React from "react";

export default function EdgeMsg() {
  const { t } = useTranslation();
  return (
    <BoldText
      text={t("edge-apply")}
      align="right"
      containerStyle={{
        margin: "0px 6px",
        fontSize: "13px",
        fontWeight: "300",
        lineHeight: 1.1,
      }}
    />
  );
}
