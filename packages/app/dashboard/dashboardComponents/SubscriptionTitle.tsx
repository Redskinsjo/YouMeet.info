"use client";

import { useTranslation } from "react-i18next";

export default function SubscriptionTitle() {
  const { t } = useTranslation();
  return (
    <div className="font-extralight text-[13px] text-grey500 flex-center">
      {t("my-subscription")}
    </div>
  );
}
