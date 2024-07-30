"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export default function CandidatesTitle({
  type,
  dataType,
}: {
  type?: "suggested" | "favorite";
  dataType: "candidates" | "favorites";
}) {
  const { t } = useTranslation();
  return (
    <h2 className="text-deepPurple900 dark:text-white">
      {type === "suggested" ? t("suggested-" + dataType) : t("all-" + dataType)}
    </h2>
  );
}
