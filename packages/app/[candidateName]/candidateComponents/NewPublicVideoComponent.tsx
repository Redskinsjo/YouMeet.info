import React from "react";
import CandidateVideo from "@youmeet/components/CandidateVideo";
import { BetaUser, Video } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import setFileUrl from "@youmeet/utils/setFileUrl";
import SubPartContainer from "@youmeet/components/SubPartContainer";
import BoldText from "@youmeet/components/BoldText";

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
          newStyles={{ maxWidth: "100vw", width: "100%", maxHeight: "100%" }}
          containerNewStyles={{ maxHeight: "77vh" }}
        />
      </div>
    </SubPartContainer>
  ) : undefined;
}