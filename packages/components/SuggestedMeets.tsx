import React from "react";
import { BetaCompany, BetaUser, Offer } from "@youmeet/gql/generated";
import Meets from "@youmeet/components/Meets";
import { useTranslation } from "react-i18next";
import BoldText from "./BoldText";

export default function SuggestedMeets({
  data,
  type,
  dataType,
}: {
  data: (BetaUser | BetaCompany | Offer)[];
  type?: "suggested" | "favorite";
  dataType: "candidates" | "recruiters" | "offers";
}) {
  const { t } = useTranslation();
  return data ? (
    <div className="flex flex-col items-center pb-8 box-border w-full">
      <div className="flex justify-start items-center w-full">
        <div className="flex ml-[38px] items-center">
          <h2 className="text-deepPurple900 dark:text-white">
            {type === "suggested"
              ? t("suggested-" + dataType)
              : type === "favorite"
              ? t("all-favorites")
              : t("all-" + dataType)}
          </h2>
        </div>
      </div>

      {data.length > 0 ? (
        <Meets data={data} type={dataType} />
      ) : (
        <div className="dark:text-white text-[14px] italic px-[12px] h-full">
          <BoldText text={t("no-offer-for-the-moment")} align="center" />
        </div>
      )}
    </div>
  ) : undefined;
}
