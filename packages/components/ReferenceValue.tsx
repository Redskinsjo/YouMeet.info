"use client";
import { useTranslation } from "react-i18next";
import React from "react";
import { Reference, Translated } from "@youmeet/gql/generated";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoCloseCircle } from "react-icons/io5";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";

export default function ReferenceValue({ list }: { list: Reference[] }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <>
      {list.length === 0 ? (
        <div className="w-full text-right text-[15px] dark:text-grey100">
          {t("not-verified")}
        </div>
      ) : list ? (
        <div className="flex flex-col gap-[6px] w-full">
          <div className="flex items-center justify-between w-full gap-[12px]">
            <div className="text-[14px] font-light dark:text-white">
              {t("me-profile-infos-label-company")}
            </div>
            <div className="text-[14px] font-light dark:text-white">
              {t("status")}
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            {list.map((ref) => {
              const exp = ref?.experience;
              const job = exp?.job;
              const companyName = exp?.companyName ?? exp?.companyName;
              const isValidity = ref?.valid !== undefined;
              if (job && companyName && isValidity) {
                return (
                  <TooltipedAsset
                    key={ref.id}
                    asset={`${
                      (exp?.job?.title as Translated)[language as "fr" | "en"]
                    } - ${exp?.duration} ${t("month")}`}
                  >
                    <div
                      key={ref?.id}
                      className="flex items-center justify-between w-full gap-[12px] h-fit"
                    >
                      <div className="flex flex-col w-full">
                        {companyName && (
                          <span className="text-[14px] dark:text-white text-ellipsis overflow-hidden">
                            {companyName}
                          </span>
                        )}
                        {!!job.title && (
                          <span className="text-blueGrey700 dark:text-blueGrey200 text-[14px] text-ellipsis overflow-hidden">
                            {job?.title[language as "fr" | "en"]}
                          </span>
                        )}
                      </div>

                      <div className="min-w-[24px] flex-center">
                        {ref?.valid ? (
                          <AiFillCheckCircle className="text-green500 text-[16px]" />
                        ) : (
                          <IoCloseCircle className="text-red500 text-[16px]" />
                        )}
                      </div>
                    </div>
                  </TooltipedAsset>
                );
              }
              return undefined;
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
