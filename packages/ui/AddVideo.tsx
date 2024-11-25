import { BetaUser, Translated, Video } from "@youmeet/gql/generated";
import NewAddVideoComponent from "./NewAddVideoComponent";
import VideoComponent from "./dashboard/dashboardComponents/VideoComponent";
import { Button, FormControlLabel, Switch } from "@mui/material";
import DetailComponent from "./DetailComponent";
import { deepPurple, grey } from "@mui/material/colors";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import BoldText from "./BoldText";
import { AiOutlineEye } from "react-icons/ai";
import React from "react";

export default function AddVideo({
  profil,
  chosenVideo,
  setChosenVideo,
  setCheckAvailableVideos,
  checkAvailableVideos,
  offerJobId,
}: {
  profil: BetaUser;
  chosenVideo?: Video | undefined;
  setChosenVideo?: Dispatch<SetStateAction<Video | undefined>>;
  setCheckAvailableVideos?: Dispatch<SetStateAction<boolean>>;
  checkAvailableVideos?: boolean;
  offerJobId?: string | undefined;
}) {
  const [displayAdvices, setDisplayAdvices] = useState(false);
  const { t } = useTranslation();
  const videos = profil.videos?.filter((v) => v) || [];

  return (
    <div className="flex flex-col gap-[6px] w-full">
      {videos.length === 0 ? (
        <div className="w-full flex-bet xs:flex-col sm:flex-col">
          <span className="font-bold text-black dark:text-grey300">
            {t("video")}
          </span>
          <NewAddVideoComponent
            jobId={offerJobId}
            profil={profil}
            setChosenVideo={setChosenVideo}
          />
        </div>
      ) : checkAvailableVideos ? (
        <div className="flex flex-col gap-[2px]">
          <div className="flex flex-col gap-[6px]">
            {videos.map(
              (video) =>
                !!video && (
                  <VideoComponent
                    profil={profil}
                    key={video.id}
                    video={video}
                    videoWidth="100%"
                    videoHeight="100%"
                    modal
                    setChosenVideo={setChosenVideo}
                    chosenVideo={chosenVideo}
                    setCheckAvailableVideos={setCheckAvailableVideos}
                  />
                )
            )}
          </div>
          <NewAddVideoComponent
            jobId={offerJobId as string | undefined}
            profil={profil}
            setChosenVideo={setChosenVideo}
          />
        </div>
      ) : (
        <div className="w-full flex-bet flex-col gap-[12px] xs:gap-[12px] sm:gap-[12px] md:gap-[12px]">
          <div className="flex-bet w-full xs:flex-col-reverse sm:flex-col-reverse">
            {!!chosenVideo && (
              <span className="whitespace-nowrap text-blueGrey700 dark:text-blueGrey200 italic underline">
                {chosenVideo.principal
                  ? "Principal"
                  : !chosenVideo.principal &&
                    chosenVideo.file?.original_filename
                  ? chosenVideo.file?.original_filename
                  : undefined}
              </span>
            )}

            <DetailComponent
              type="modal2"
              noLabelColon
              noPadding
              label={<></>}
              value={
                <FormControlLabel
                  className="dark:text-white text-black font-bold"
                  control={
                    <Switch
                      value={videos.length > 0 ? true : false}
                      checked={videos.length > 0 ? true : false}
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: `${
                            videos.length > 0 ? deepPurple[300] : grey[500]
                          } !important`,
                        },
                        "& span .MuiSwitch-thumb": {
                          color:
                            videos.length > 0 ? deepPurple[300] : grey[300],
                        },
                      }}
                    />
                  }
                  label={t("video")}
                  labelPlacement="start"
                />
              }
            />
          </div>
          <div className="flex w-full xs:flex-col sm:flex-col gap-[6px]">
            {!!setCheckAvailableVideos && (
              <div
                className="flex items-center gap-[24px] text-green700 dark:text-green200 cursor-pointer hover:text-deepPurple900"
                onClick={() => setCheckAvailableVideos(true)}
              >
                <div className="whitespace-nowrap">
                  {t("choose-another-video")}
                </div>
                <AiOutlineEye style={{ fontSize: "18px" }} />
              </div>
            )}
            <span
              className="text-blue700 dark:text-blue100 text-[14px] underline cursor-pointer"
              onClick={() => setDisplayAdvices(true)}
            >
              {t("some-advices-for-video")}
            </span>
          </div>
        </div>
      )}

      {!!displayAdvices && (
        <div className="flex flex-col gap-[12px] bg-grey50 dark:extraLightDarkBg">
          <ul className="flex flex-col gap-[6px]">
            <li className="darkLi text-[14px]">
              <BoldText
                fontSizeClass="mb-0"
                align="left"
                text={t("present-yourself-quickly")}
              />
            </li>
            <li className="darkLi text-[14px]">
              <BoldText
                fontSizeClass="mb-0"
                align="left"
                text={t("speak-about-job-and-company")}
              />
            </li>
            <li className="darkLi text-[14px]">
              <BoldText
                fontSizeClass="mb-0"
                align="left"
                text={t("explain-why-you-are-the-right-person")}
              />
            </li>
          </ul>
          <div>
            <BoldText
              fontSizeClass="font-extralight text-[14px]"
              text={t("all-in-1-min")}
              align="center"
            />
          </div>
          <div className="w-full flex justify-end">
            <Button
              className="p-[3px]"
              onClick={() => setDisplayAdvices(false)}
            >
              {t("back")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* 
  <div className="flex flex-col gap-[6px]">
    {videos && videos.length === 0 ? (
      <div className="w-full flex-bet">
        <span className="font-bold text-black dark:text-grey300">
          {t("video")}
        </span>
        <NewAddVideoComponent profil={modal.user} />
      </div>
    ) : (
      <div className="w-full flex-bet gap-[12px] xs:gap-[6px] sm:gap-[6px] md:gap-[6px]">
        <DetailComponent
          type="modal2"
          noLabelColon
          noPadding
          label={<></>}
          value={
            <FormControlLabel
              className="dark:text-white text-black font-bold"
              control={
                <Switch
                  value={videos && videos.length > 0 ? true : false}
                  checked={
                    videos && videos.length > 0 ? true : false
                  }
                  sx={{
                    "& .MuiSwitch-track": {
                      backgroundColor: `${
                        videos && videos.length > 0
                          ? deepPurple[300]
                          : grey[500]
                      } !important`,
                    },
                    "& span .MuiSwitch-thumb": {
                      color:
                        videos && videos.length > 0
                          ? deepPurple[300]
                          : grey[300],
                    },
                  }}
                />
              }
              label={t("video")}
              labelPlacement="start"
            />
          }
        />
      </div>
    )}
    <span
      className="text-blue700 dark:text-blue100 text-[14px] underline cursor-pointer"
      onClick={() => setDisplayAdvices(true)}
    >
      {t("some-advices-for-video")}
    </span>
    {!!displayAdvices && (
      <div className="flex flex-col gap-[12px] bg-grey50 dark:extraLightDarkBg">
        <ul className="flex flex-col gap-[6px]">
          <li className="darkLi text-[14px]">
            <BoldText
              fontSizeClass="mb-0"
              align="left"
              text={t("present-yourself-quickly")}
            />
          </li>
          <li className="darkLi text-[14px]">
            <BoldText
              fontSizeClass="mb-0"
              align="left"
              text={t("speak-about-job-and-company")}
            />
          </li>
          <li className="darkLi text-[14px]">
            <BoldText
              fontSizeClass="mb-0"
              align="left"
              text={t("explain-why-you-are-the-right-person")}
            />
          </li>
        </ul>
        <div>
          <BoldText
            fontSizeClass="font-extralight text-[14px]"
            text={t("all-in-1-min")}
            align="center"
          />
        </div>
        <div className="w-full flex justify-end">
          <Button
            className="p-[3px]"
            onClick={() => setDisplayAdvices(false)}
          >
            {t("back")}
          </Button>
        </div>
      </div>
    )}
  </div>

*/
