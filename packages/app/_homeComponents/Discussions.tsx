"use client";
import { UserState } from "@youmeet/global-config/features/user";
import { RootState } from "@youmeet/global-config/store";
import { Offer, OwnQueuesDocument } from "@youmeet/gql/generated";
import { getCompanyName } from "@youmeet/utils/formatForEmails";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import React from "react";

export default function Discussions() {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user as UserState);
  const { data } = useQuery(OwnQueuesDocument, {
    variables: { targetId: user.id, status: ["pending", "in-progress"] },
    fetchPolicy: "no-cache",
  });
  const [displayCells, setDisplayCells] = useState(false);
  return data?.ownQueues && data.ownQueues.length > 0 ? (
    <div className="fixed h-screen w-0" onClick={(e) => e.stopPropagation()}>
      <div className="fixed bottom-[12px] right-[12px] z-[100] flex flex-col gap-[12px]">
        {displayCells && (
          <div className="w-[100px] h-fit flex flex-col gap-[12px]">
            {data.ownQueues.map(
              (queue, i) =>
                queue?.offerTarget?.company && (
                  <Link
                    href={`/dashboard/conversations/${queue.id}`}
                    className="no-underline"
                    target="_blank"
                    key={queue.id}
                  >
                    <div
                      className={
                        (i + 1) / 3 === 1
                          ? `rounded-full border-[0.5px] border-dashed border-cyan900 bg-cyan300 dark:darkBg w-[100px] h-[100px] flex-center text-white text-[14px] text-center cursor-pointer fadeSlideLeft p-[2px]`
                          : (i + 1) / 2 === 1
                          ? `rounded-full border-[0.5px] border-dashed border-yellow900 bg-yellow300 dark:darkBg w-[100px] h-[100px] flex-center text-white text-[14px] text-center cursor-pointer fadeSlideLeft p-[2px]`
                          : `rounded-full border-[0.5px] border-dashed border-pink900 bg-pink300 dark:darkBg w-[100px] h-[100px] flex-center text-white text-[14px] text-center cursor-pointer fadeSlideLeft p-[2px]`
                      }
                    >
                      {getCompanyName(queue.offerTarget as Offer)}
                    </div>
                  </Link>
                )
            )}
          </div>
        )}
        <div
          onClick={() => {
            setDisplayCells((state) => !state);
          }}
          className={
            displayCells
              ? "rounded-full border-[0.5px] border-dashed border-deepPurple900 bg-deepPurple300 dark:darkBg w-[100px] h-[100px] flex-center text-white text-[14px] text-center cursor-pointer"
              : "rounded-full border-[0.5px] border-dashed border-deepPurple900 bg-deepPurple300 dark:darkBg w-[100px] h-[100px] flex-center text-white text-[14px] text-center blinking cursor-pointer"
          }
        >
          {t("new-conversation")}
        </div>
      </div>
    </div>
  ) : undefined;
}
