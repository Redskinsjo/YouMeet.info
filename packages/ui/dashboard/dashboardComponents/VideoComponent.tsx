"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
} from "react";
import BoldText from "../../BoldText";
import { useTranslation } from "react-i18next";
import { Avatar, BetaUser, MeetCandidate, Video } from "@youmeet/gql/generated";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";
import { Button, useMediaQuery } from "@mui/material";
import SubPartContainer from "../../SubPartContainer";
import { formatToDatetime } from "@youmeet/utils/formatToDatetime";
import DetailComponent from "../../DetailComponent";
import {
  GlobalState,
  setError,
  setUpload,
} from "@youmeet/global-config/features/global";
import { onDeleteVideo, onSetVideoAsDefault } from "@youmeet/functions/actions";
import Logo from "../../Logo";
import { RootState } from "@youmeet/global-config/store";
import { IoIosCamera } from "react-icons/io";
import { removeVideo } from "@youmeet/global-config/features/user";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import CandidateVideo from "../../CandidateVideo";

export default function VideoComponent({
  profil,
  video,
  videoWidth = "100%",
  videoHeight = "100%",
  modal,
  setChosenVideo,
  chosenVideo,
  setCheckAvailableVideos,
  affiliated,
}: {
  profil: BetaUser | MeetCandidate;
  video?: Video;
  videoWidth?: string;
  videoHeight?: string;
  modal?: boolean;
  setChosenVideo?: Dispatch<SetStateAction<Video | undefined>>;
  chosenVideo?: Video;
  setCheckAvailableVideos?: Dispatch<SetStateAction<boolean>>;
  affiliated?: boolean;
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();
  const upload = useSelector(
    (state: RootState) => (state.global as GlobalState).upload
  );
  const deleteVideoFormRef = useRef<HTMLFormElement>(null);
  const setVideoAsDefaultFormRef = useRef<HTMLFormElement>(null);

  const videoComponent = useMemo(() => {
    return (
      <div className="relative box-border flex items-center justify-end w-full">
        <CandidateVideo
          video={video?.file as Avatar}
          notAutoPlay
          newStyles={{
            maxWidth: "100vw",
            width: "100%",
            height: "100%",
            minWidth: "300px",
          }}
          containerNewStyles={{
            maxWidth: videoWidth,
            maxHeight: videoHeight,
          }}
        />
      </div>
    );
  }, [video]);

  const customOnDeleteVideo = useCallback(async (videoId: string) => {
    dispatch(setUpload(`r-video/${videoId}`));
    const result = (await onDeleteVideo(videoId)) as
      | PayloadBackendError
      | withData<Video>;

    if (!result || isPayloadError(result)) {
      dispatch(setError("not-completed"));
      // handle error
    } else if (!result?.data) {
      dispatch(setError("not-completed"));
    } else {
      dispatch(removeVideo((result as withData<Video>).data));
    }

    dispatch(setUpload(null));
  }, []);

  const customOnSetVideoAsDefault = useCallback(
    async ({ videoId, userId }: { videoId: string; userId: string }) => {
      const result = (await onSetVideoAsDefault(videoId, userId)) as
        | PayloadBackendError
        | withData<Video>;

      if (!result || isPayloadError(result)) {
        dispatch(setError("not-completed"));
        // handle error
      } else if (!result?.data) {
        dispatch(setError("not-completed"));
      } else {
        dispatch(removeVideo((result as withData<Video>).data));
      }
    },
    []
  );

  const videos = profil.videos;

  return (
    !!video && (
      <SubPartContainer
        radius={"0px"}
        newStyles={{
          padding: "0px",
        }}
      >
        <div
          className={
            modal && chosenVideo?.id === video?.id
              ? "relative flex flex-1 p-[18px] cursor-pointer rounded-[14px] dark:extraLightDarkBg border-[1px] border-green700 border-solid"
              : "relative flex flex-1 p-[12px] rounded-[14px] dark:extraLightDarkBg"
          }
          onClick={(e) => {
            e.stopPropagation();
            if (setChosenVideo) setChosenVideo(video);
            if (setCheckAvailableVideos) setCheckAvailableVideos(false);
          }}
        >
          {modal && chosenVideo?.id === video?.id && (
            <div className="text-green500 absolute flex-center gap-[6px] top-[4px] left-[4px] text-[10px]">
              <AiFillCheckCircle className="text-[14px] text-green300" />{" "}
              {t("chosen")}
            </div>
          )}
          <div
            className={
              video
                ? "flex xs:flex-col sm:flex-col md:flex-col md2:flex-col lg:flex-col lg2:flex-col relative gap-[12px] w-full"
                : "flex xs:flex-col sm:flex-col md:flex-col md2:flex-col lg:flex-col lg2:flex-col flex-col gap-[12px] w-full"
            }
          >
            <div
              className={
                videos && videos.length === 0
                  ? "flex items-start flex-col gap-[12px]"
                  : "flex-bet flex-col gap-[12px]"
              }
            >
              <div className="flex flex-col gap-[24px] w-full">
                <div className="flex justify-start">
                  <h3 className="font-light subItem my-0 whitespace-nowrap text-grey700 dark:text-grey300">
                    {t("video")}{" "}
                    {video?.job &&
                    video.job.title &&
                    video?.job?.title[language as "fr" | "en"]
                      ? `${t("of")} ${video.job.title[language as "fr" | "en"]}`
                      : `CV`}
                  </h3>
                </div>
              </div>
              {video?.file?.url && video.file.secure_url && (xs || sm || md)
                ? videoComponent
                : undefined}
              <div className="w-full flex flex-col gap-[12px]">
                {video?.file?.url && video.file.secure_url && (
                  <div
                    className="whitespace-nowrap"
                    style={{ wordWrap: "break-word" }}
                  >
                    {(!!video.meetCandidate?.id ||
                      (video.sharings && video.sharings?.length > 0)) && (
                      <BoldText
                        text={t("video-used-in-meet")}
                        fontSizeClass="text-green500 dark:text-green100 indent-0 pl-[12px]"
                        containerStyle={{ lineHeight: "1.3" }}
                        align="left"
                      />
                    )}

                    <DetailComponent
                      type="modal"
                      noPadding
                      label={t("createdAt")}
                      conversation={modal}
                      value={formatToDatetime(
                        video?.createdAt,
                        false,
                        false,
                        false,
                        language
                      )}
                      name="createAt"
                    />
                  </div>
                )}
                {video?.file?.url && video.file.secure_url && (
                  <div className="flex flex-col gap-[12px] w-full py-[6px]">
                    {!video.principal && !affiliated ? (
                      <form
                        ref={setVideoAsDefaultFormRef}
                        action={customOnSetVideoAsDefault.bind(null, {
                          videoId: video?.id as string,
                          userId: profil.id as string,
                        })}
                      >
                        <div
                          onClick={(e) =>
                            setVideoAsDefaultFormRef.current?.requestSubmit()
                          }
                          className="h-full cursor-pointer dark:text-deepPurple200 text-deepPurple700 font-bold"
                        >
                          {t("set-as-principal")}
                        </div>
                      </form>
                    ) : (
                      <div className="h-full cursor-pointer dark:text-green200 text-green600 font-bold">
                        {t("principalVideo")}
                      </div>
                    )}
                    {!affiliated && (
                      <div className="flex-bet gap-[12px]">
                        <form
                          ref={deleteVideoFormRef}
                          action={customOnDeleteVideo.bind(
                            null,
                            video?.id as string
                          )}
                        >
                          <div
                            onClick={(e) =>
                              deleteVideoFormRef.current?.requestSubmit()
                            }
                            className="h-full cursor-pointer dark:text-deepPurple200 text-deepPurple700 font-bold"
                          >
                            {t("delete")}
                          </div>
                        </form>

                        {upload?.includes("r-video") &&
                        upload.split("/")[1] === video.id ? (
                          <Logo gif />
                        ) : undefined}
                      </div>
                    )}

                    {!!modal && (
                      <Button
                        className="whitespace-nowrap"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (setChosenVideo) setChosenVideo(video);
                          if (setCheckAvailableVideos)
                            setCheckAvailableVideos(false);
                        }}
                      >
                        {t("choose-video")}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {videos && videos.length === 0 ? (
              <BoldText
                text="video-upload-cta"
                containerStyle={{
                  fontSize: "16px",
                  fontWeight: 200,
                  margin: "0px",
                }}
                align="justify"
              />
            ) : undefined}
            {videos && videos.length === 0 ? (
              <div className="h-[350px] flex-center flex-col gap-[12px]">
                <div>
                  <IoIosCamera className="text-white text-[120px]" />
                </div>
                <span className="text-blueGrey300 dark:text-blueGrey100 italic text-[14px] text-center">
                  {t("no-data")}
                </span>
              </div>
            ) : undefined}
            {video?.file?.url && video.file.secure_url && !xs && !sm && !md
              ? videoComponent
              : undefined}
          </div>
        </div>
      </SubPartContainer>
    )
  );
}
