"use client";
import BoldText from "@youmeet/components/BoldText";
import DetailComponent from "@youmeet/components/DetailComponent";
import NoData from "@youmeet/components/NoData";
import { BetaCompany } from "@youmeet/gql/generated";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function CompanyDescription({
  company,
}: {
  company: BetaCompany | null | undefined;
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    !loading && (
      <div className="flex flex-col gap-[12px]">
        <DetailComponent
          type="modal2"
          conversation
          noLabelColon
          newClasses="border-[1px] border-solid border-white rounded-xl dark:mediumDarkBg rounded-xl"
          labelFullWidth
          label={
            <div className="font-bold item flex-center dark:text-white">
              {t("me-profile-infos-label-description")}
            </div>
          }
          value={
            <div className="rounded-xl rounded-xl subItem indent-4 text-justify">
              {company?.resume ? (
                <BoldText
                  text={company?.resume}
                  align="justify"
                  links
                  containerStyle={{ margin: "0px" }}
                />
              ) : (
                <NoData name="description" />
              )}
            </div>
          }
        />
      </div>
    )
  );
}
