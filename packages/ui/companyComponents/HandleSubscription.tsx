"use client";
import React, { useEffect } from "react";
import TooltipedAsset from "../TooltipedAsset";
import { useTranslation } from "react-i18next";
import SubPartContainer from "../SubPartContainer";
import { uri } from "@youmeet/functions/imports";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@youmeet/global-config/features/global";
import isSubscribedPro from "@youmeet/utils/basics/isSubscribedPro";
import { RootState } from "@youmeet/global-config/store";
import { UnknownAction } from "@reduxjs/toolkit";
import { setModal } from "@youmeet/global-config/features/modal";
import { UserState } from "@youmeet/global-config/features/user";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function HandleSubscription() {
  const dispatch = useDispatch();
  const subscription = useSelector(
    (state: RootState) => (state.global as GlobalState).subscription
  );
  const { t } = useTranslation();
  const currentSubscription = isSubscribedPro(subscription);
  const user = useSelector((state: RootState) => state.user as UserState);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/message");
  }, []);

  return (
    !!subscription &&
    !!currentSubscription && (
      <TooltipedAsset
        asset={
          currentSubscription?.cancel_at_period_end
            ? `${t("subscription-until-end")}.`
            : `${t("unsubscribe-tooltip")}.`
        }
        placement="bottom-end"
      >
        <div>
          <SubPartContainer
            radius="14px"
            onClick={async () => {
              for (let i = 0; i < subscription.subscriptions.length; i++) {
                const response = await fetch(`${uri}/api/unsubscribe`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    id: subscription.subscriptions[i].id,
                    email: user.email,
                  }),
                });
                if (response.status === 200) {
                  const subscription = await response.json();
                  if (subscription) {
                    dispatch(
                      setModal({ display: "consent2" }) as UnknownAction
                    );
                    router.push("/message");
                  }
                }
              }
            }}
            newStyles={{
              border: `unset`,
              cursor: "pointer",
              padding: "12px",
            }}
          >
            <div className={"group dark:hover:bg-grey900 hover:bg-white"}>
              <div
                className={
                  currentSubscription?.cancel_at_period_end
                    ? "flex-center gap-[12px] bg-grey100 text-red500 rounded-xl py-[4px] legend"
                    : "flex-center gap-[12px] rounded-xl py-[4px] legend"
                }
              >
                {currentSubscription?.cancel_at_period_end ? (
                  <div className={"dark:text-white"}>
                    {t("subscription-cancelled")}
                  </div>
                ) : (
                  <div className={"dark:text-white"}>
                    {t("cancel-subscription")}
                  </div>
                )}
                {!currentSubscription?.cancel_at_period_end && (
                  <AiOutlineCloseCircle style={{ color: "red" }} />
                )}
              </div>
            </div>
          </SubPartContainer>
        </div>
      </TooltipedAsset>
    )
  );
}
