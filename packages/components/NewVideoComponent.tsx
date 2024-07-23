import React from "react";
import CandidateVideo from "./CandidateVideo";
import { BetaUser, Video } from "@youmeet/gql/generated";
import setFileUrl from "@youmeet/utils/setFileUrl";
import SubPartContainer from "./SubPartContainer";
import BoldText from "./BoldText";
import { Attr } from "@youmeet/types/attributes";

export default function NewVideoComponent({
  profil,
  principalVideo,
  containerNewStyles,
  preview,
}: {
  profil?: BetaUser;
  principalVideo: Partial<Video>;
  containerNewStyles?: Attr;
  preview?: boolean;
}) {
  return principalVideo?.file && setFileUrl(principalVideo?.file) ? (
    <SubPartContainer radius="0px">
      <div className="flex flex-col gap-[12px] py-[12px]">
        <div className="w-full flex-center">
          <h3 className="my-0 text-center item dark:text-white text-black">
            {preview ? "preview-video" : "presentation-video"}
          </h3>
        </div>
        <div className="w-full flex-center">
          <BoldText
            text={preview ? "preview-video-text" : "presentation-video-text"}
            fontSizeClass="text-black dark:text-white"
            containerStyle={{ margin: "0px" }}
            align="center"
          />
        </div>
        <div className="border-[1px] border-solid border-white rounded-xl dark:mediumDarkBg rounded-xl">
          <div className="p-[6px] rounded-xl">
            <CandidateVideo
              notAutoPlay
              profil={profil}
              video={principalVideo?.file}
              name={principalVideo?.file?.original_filename as string}
              newStyles={{
                maxWidth: "100vw",
                width: "100%",
                maxHeight: "100%",
              }}
              containerNewStyles={containerNewStyles}
            />
          </div>
        </div>
      </div>
    </SubPartContainer>
  ) : undefined;
}
