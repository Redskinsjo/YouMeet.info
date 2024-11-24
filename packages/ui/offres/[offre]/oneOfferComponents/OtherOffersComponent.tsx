"use client";
import { getOffers } from "@youmeet/functions/request";
import BoldText from "../../../BoldText";
import OtherOfferComponent from "../../../OtherOfferComponent";
import { Offer } from "@youmeet/gql/generated";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import getOfferOrPreviewValues from "@youmeet/utils/basics/getOfferOrPreviewValues";

export default function OtherOffersComponent({ offre }: { offre: Offer }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [data, setData] = useState<Offer[]>([]);

  const getValues = useCallback(async () => {
    const values = await getOfferOrPreviewValues(
      offre,
      language as "fr" | "en",
      offre?.company?.id || undefined
    );

    if (values) {
      const offers = (await getOffers<Offer[]>({
        params: { search: values.jobTitle },
      })) as Offer[];
      setData(offers);
    }
  }, [offre, language]);

  useEffect(() => {
    getValues();
  }, [getValues]);

  return (
    <div className="flex w-full flex-col items-center p-[24px] xs:p-[12px] sm:p-[12px] md:p-[12px] box-border gap-[24px] bg-white dark:mediumDarkBg h-full border-[0.5px] border-solid border-grey300 shadow-custom">
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
  );
}
