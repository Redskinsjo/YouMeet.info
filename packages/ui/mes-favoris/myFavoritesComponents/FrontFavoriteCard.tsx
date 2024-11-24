import React, { useState } from "react";
import {
  BetaDetails,
  Favorite,
  Translated,
  Video,
} from "@youmeet/gql/generated";
import { useMediaQuery } from "@mui/material";
import { HiVideoCamera } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { formatToDatetime } from "@youmeet/utils/basics/formatToDatetime";
import { getName } from "@youmeet/utils/basics/setName";
import TooltipedAsset from "../../TooltipedAsset";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import { getPrincipalVideo } from "@youmeet/utils/basics/getPrincipalVideo";
import DetailComponent from "../../DetailComponent";
import BoldText from "../../BoldText";
import isProfileEmpty from "@youmeet/utils/basics/isProfileEmpty";
import NewProfileComponent from "@youmeet/ui/NewProfileComponent";
import Link from "next/link";
import { uri } from "@youmeet/functions/imports";
import CustomIcon from "../../CustomIcon";
import { CustomIconName } from "@youmeet/types/CustomIconProps";
import ProfileAvatar from "../../profils/[candidateName]/candidateProfileComponents/ProfileAvatar";

export default function FrontFavoriteCard({
  favorite,
}: {
  favorite: Favorite;
}) {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const [shouldChangeImageAppear, setShouldChangeImageAppear] = useState(false);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const profil = favorite.target;
  const video = getPrincipalVideo(
    (profil?.videos?.filter((v) => v) as Video[]) || undefined
  );
  const videoFile = video?.file;
  const cand = profil?.candidate;
  const det = profil?.details;
  const exps = profil?.experiences;

  const targetJob = cand?.targetJob?.title
    ? (cand?.targetJob?.title as Translated)[language as "fr" | "en"]
    : undefined;

  return profil ? (
    <div className="w-full max-w-[500px] bg-grey50 border-[0.5px] border-solid border-grey200 min-h-[500px] shadow-custom p-[6px]">
      <div className="top-[16px] right-[16px] text-[18px] cursor-pointer flex-bet">
        {!!video && (
          <TooltipedAsset asset={t("see-more-info")}>
            <div>
              <Link
                href={`${uri}/profils/${favorite.target?.uniqueName}`}
                target="_blank"
                prefetch={false}
              >
                <CustomIcon onClick={() => {}} name={CustomIconName.file} />
              </Link>
            </div>
          </TooltipedAsset>
        )}
        {videoFile && videoFile.secure_url && videoFile.url && (
          <TooltipedAsset asset={t("see-video")}>
            <div>
              <Link href={`/videos/${video.id}`} className="mt-[8px] group">
                <HiVideoCamera className="item dark:text-white" />
              </Link>
            </div>
          </TooltipedAsset>
        )}
      </div>
      {!!favorite.target && <ProfileAvatar profil={favorite.target} />}
      {!!setFileUrl(profil.cvFile) && (
        <div className="relative box-border flex w-full h-[36px]">
          <div className="flex-center w-full">
            <Link
              href={setFileUrl(profil.cvFile) as string}
              target="_blank"
              className="dark:text-deepPurple200 text-deepPurple700"
            >
              {t("view-CV")}
            </Link>
          </div>
        </div>
      )}
      <h3 className="my-0 dark:text-white">{getName(profil, true)}</h3>
      {profil && !isProfileEmpty(profil) ? (
        <NewProfileComponent
          details={det as BetaDetails}
          profil={profil}
          account={false}
        />
      ) : undefined}
      <div className="infos-component" style={{ height: "40%" }}>
        <DetailComponent
          type="modal"
          noLabelColon
          noPadding
          labelFullWidth
          fullWidth
          name="description"
          conversation={!!profil?.description}
          account={false}
          label={t("me-organisation-infos-label-resume")}
          value={
            profil?.description ? (
              <BoldText
                text={`${profil?.description}+`}
                align="justify"
                fontSizeClass="leading-[1.37] font-normal indent-4 xs:indent-0 sm:indent-0 md:indent-0"
                containerStyle={{
                  fontSize: "unset",
                  fontWeight: "normal",
                }}
                links
              />
            ) : (
              <div className="w-full flex justify-start italic legend font-extralight dark:text-grey300">
                {"-"}
              </div>
            )
          }
        />
        {targetJob && (
          <div className="dark:text-white font-medium">{targetJob}</div>
        )}
        {exps && exps[0] && (
          <h5 className="font-extralight my-0 dark:text-grey100">
            {t("lastExperience")}:
          </h5>
        )}
        <div className="w-full flex justify-center mx-[24px] flex-1 items-end">
          <div className="flex flex-col w-full">
            {exps && exps[0] && exps[0].job && exps[0].job.title && (
              <div className="flex gap-[20px] items-center justify-center mt-[2px] mb-[6px] font-medium">
                {exps && exps[0] && (
                  <p className="dark:text-white">
                    {exps[0].job.title[language as "fr" | "en"]}{" "}
                    <span className="font-extralight">{t("at")} </span>
                    {exps[0].company?.name ?? exps[0].companyName}{" "}
                    <span className="font-extralight">{t("from2")} </span>
                    {formatToDatetime(
                      exps[0].starting as string,
                      true,
                      true,
                      true,
                      language
                    )}{" "}
                    <span className="font-extralight">{t("to2")} </span>
                    {exps[0].isLiveJob
                      ? t("today")
                      : `${formatToDatetime(
                          exps[0].ending as string,
                          true,
                          true,
                          true,
                          language
                        )}`}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : undefined;
}
