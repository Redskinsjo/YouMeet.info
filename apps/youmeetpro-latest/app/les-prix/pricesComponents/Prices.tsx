"use client";
import React from "react";
import Layout from "@youmeet/components/Layout";
import PriceCard from "@/app/les-prix/pricesComponents/PriceCard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import {
  chatbotProduct,
  premiumProduct,
  verifiedProduct,
} from "@youmeet/functions/imports";
import { GlobalState } from "@youmeet/global-config/features/global";

const Prices = () => {
  const { t } = useTranslation();
  const subscription = useSelector(
    (state: RootState) => (state.global as GlobalState).subscription
  );

  const isSubscribedCandidates = subscription
    ? subscription?.subscriptions.find(
        (sub) => sub.plan.id === verifiedProduct && (sub.plan as any).active
      )
    : undefined;
  const isSubscribedPremium = subscription
    ? subscription?.subscriptions.find(
        (sub) => sub.plan.id === premiumProduct && (sub.plan as any).active
      )
    : undefined;
  const isSubscribedChatbot = subscription
    ? subscription?.subscriptions.find(
        (sub) => sub.plan.id === chatbotProduct && (sub.plan as any).active
      )
    : undefined;

  return (
    <div className="w-full box-border xs:mb-[60px]sm:mb-[60px] md:mb-[60px] px-[30px] pb-[60px] xs:p-0 sm:p-0 md:p-0 flex flex-col relative fadeIn gap-[24px]">
      <div className="h-[60px] flex-center flex-col text-blueGrey900 underline pt-[60px] pb-0 m-[12px]">
        <h1 className="bg-white border-grey300 border-solid border-[0.5px] shadow-2xl py-[12px] px-[24px] rounded-2xl text-[32px] font-bold text-center dark:darkBg dark:text-white">
          {t("the-prices")}
        </h1>
      </div>

      <Layout
        newClasses="darkBg dark:extraLightDarkBg"
        newStyles={{ borderRadius: "14px", padding: "36px" }}
      >
        <div className="flex flex-col w-full slideUp">
          <div className="flex w-full justify-around offers:flex-wrap gap-[48px]">
            <div
              className="flex-center flex-col relative"
              style={{ maxWidth: "100vw" }}
            >
              <PriceCard
                isSubscribedCandidates={isSubscribedCandidates}
                isSubscribedChatbot={isSubscribedChatbot}
                isSubscribedPremium={isSubscribedPremium}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Prices;
