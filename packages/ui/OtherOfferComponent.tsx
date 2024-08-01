import { Offer } from "@youmeet/gql/generated";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export default function OtherOfferComponent({ offer }: { offer: Offer }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <>
      <Link
        key={offer?.id}
        href={`/offres/${offer?.slug}`}
        className="w-full no-underline box-border cursor-pointer"
      >
        <div className="flex-bet w-full border-[0.5px] border-solid border-grey300 rounded-[14px] p-[6px] px-[12px] box-border bg-cyan50 dark:bg-black text-black dark:text-white">
          {!!offer?.job?.title && (
            <div className="h-full flex items-start">
              {offer?.job?.title[language as "fr" | "en"]}
            </div>
          )}

          <div className="flex items-end flex-col gap-[6px]">
            {offer?.contractType && (
              <div className="flex-center gap-[6px]">
                <span className="font-extralight text-[14px]">{t("as")}</span>
                <div>{t(offer?.contractType)}</div>
              </div>
            )}
            <div className="flex-center gap-[12px]">
              {offer?.revenue && (
                <div className="flex-center gap-[6px]">
                  <span className="font-extralight text-[14px]">
                    {t("for")}
                  </span>
                  <div>{offer.revenue}€</div>
                </div>
              )}
              {offer?.location && (
                <div className="flex-center gap-[6px]">
                  <span className="font-extralight text-[14px]">
                    {t("toNow")}
                  </span>
                  <div className="w-min">{offer.location}</div>
                </div>
              )}
            </div>
            {!!offer.company?.name && (
              <div className="flex-center gap-[6px]">
                <span className="font-extralight text-[14px]">{t("at")}</span>
                <div>{offer.company.name}</div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
