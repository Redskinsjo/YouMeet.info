"use client";
import { getOffers } from "@youmeet/functions/request";
import BoldText from "../../../BoldText";
import OtherOfferComponent from "../../../OtherOfferComponent";
import { Offer } from "@youmeet/gql/generated";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import React from "react";

export default function OtherOffersComponent({
  offers,
  offre,
}: {
  offers: Offer[];
  offre: Offer;
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [data, setData] = useState<Offer[]>(offers);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    const offers = (await getOffers<Offer[]>({
      data: {
        title:
          offre.job?.title && offre.job?.title.fr ? offre.job?.title.fr : "",
        language: "fr",
      },
    })) as Offer[];
    setData(offers);
  }, [offre, language]);

  useEffect(() => {
    getData();
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div className="flex w-full flex-col items-center p-[24px] xs:p-[12px] sm:p-[12px] md:p-[12px] box-border gap-[24px] bg-white dark:mediumDarkBg h-full rounded-[14px] shadow-custom">
        <h3 className="dark:text-white">{t("some-more-offers")}</h3>
        <BoldText
          text={t("take-opportunity-to-apply")}
          containerStyle={{ fontSize: "14px", margin: "0px" }}
        />
        <div className="w-full box-border flex flex-col gap-[12px]">
          {data?.filter((of, i) => of?.id !== offre.id && i < 5) &&
          data?.filter((of, i) => of?.id !== offre.id && i < 5).length > 0 ? (
            data
              ?.filter((of, i) => of?.id !== offre.id && i < 5)
              .map((offer) =>
                !!offer ? (
                  <OtherOfferComponent key={offer.id} offer={offer} />
                ) : undefined
              )
          ) : (
            <div className="w-full flex-center italic text-grey500 text-[14px] min-h-[48px]">
              {t("no-data")}
            </div>
          )}
        </div>
      </div>
    )
  );
}
