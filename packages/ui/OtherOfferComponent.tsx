import { Offer } from "@youmeet/gql/generated";
import { OfferContentValues } from "@youmeet/types/OfferContentValues";
import getOfferOrPreviewValues from "@youmeet/utils/basics/getOfferOrPreviewValues";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SeeMore from "./_components/SeeMore";
import Image from "next/image";

export default function OtherOfferComponent({ offer }: { offer: Offer }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [values, setValues] = useState<OfferContentValues | undefined>();

  const getValues = useCallback(async () => {
    const values = await getOfferOrPreviewValues(
      offer,
      language as "fr" | "en",
      offer?.company?.id || undefined
    );
    setValues(values);
  }, [offer, language]);

  useEffect(() => {
    getValues();
  }, [getValues]);

  return (
    <>
      <div className="flex flex-col gap-[6px] w-full border-[0.5px] border-solid border-grey900 rounded-[14px] p-[6px] px-[12px] box-border">
        <Link
          key={offer?.id}
          href={`/offres/${values?.slug}`}
          className="w-full underline-offset-2 box-border text-deepPurple900 cursor-pointer"
        >
          {!!values?.jobTitle && (
            <div className="h-full flex font-semibold items-start text-[15px] xs:text-[13px] sm:text-[13px]">
              {values?.jobTitle}
            </div>
          )}
        </Link>

        <div className="flex-bet gap-x-[6px] flex-wrap">
          {values?.contractType && (
            <div className="flex items-end gap-[6px]">
              <span className="font-extralight text-[13px] xs:text-[11px] sm:text-[11px]">
                {t("as")}
              </span>
              <div className="text-[14px] xs:text-[12px] sm:text-[12px] w-max">
                {t(values?.contractType)}
              </div>
            </div>
          )}

          {values?.location && (
            <div className="flex items-end gap-[6px]">
              <span className="font-extralight text-[13px] xs:text-[11px] sm:text-[11px]">
                {t("toNow")}
              </span>
              <div className="text-[14px] xs:text-[12px] sm:text-[12px] w-max">
                {values.location}
              </div>
            </div>
          )}

          {!!values?.companyName && (
            <div className="flex items-end gap-[6px]">
              <span className="font-extralight text-[13px] xs:text-[11px] sm:text-[11px]">
                {t("at")}
              </span>
              <div className="text-[14px] xs:text-[12px] sm:text-[12px] w-max">
                {values.companyName}
              </div>
            </div>
          )}
        </div>
        <div className="flex-bet">
          <SeeMore el={offer} />
          {!!values?.logo && (
            <Image
              src={values.logo}
              alt={`Logo de l'entreprise ${values.companyName}`}
              height={45}
              width={45}
            />
          )}
        </div>
      </div>
    </>
  );
}
