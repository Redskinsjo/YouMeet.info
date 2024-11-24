import React from "react";
import CandidateVideo from "@youmeet/ui/CandidateVideo";
import { BetaUser, Video } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import SubPartContainer from "@youmeet/ui/SubPartContainer";
import BoldText from "@youmeet/ui/BoldText";

export default function NewPublicVideoComponent({
  profil,
  principalVideo,
}: {
  profil: BetaUser;
  principalVideo: Video;
}) {
  const { t } = useTranslation();

  return principalVideo?.file && setFileUrl(principalVideo?.file) ? (
    <SubPartContainer
      radius="0px"
      newStyles={{
        padding: "0px",
        maxWidth: "599px",
      }}
    >
      <div className="p-[6px] rounded-b-0">
        <div className="w-full flex-center flex-col">
          <h3 className="my-[12px] p-0 text-center item dark:text-white">
            {t("presentation-video")}
          </h3>
          <BoldText
            text={t("consult-video-text")}
            align="center"
            fontSizeClass="text-blueGrey700 dark:text-blueGrey200"
          />
        </div>
        <CandidateVideo
          notAutoPlay
          profil={profil}
          video={principalVideo?.file}
          name={principalVideo?.file?.original_filename as string}
          newStyles={{ width: "100%", maxHeight: "400px", mobileWidth: "100%" }}
          containerNewStyles={{
            maxHeight: "400px",
            width: "100%",
          }}
        />
      </div>
    </SubPartContainer>
  ) : undefined;
}
