"use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import BoldText from "../BoldText";
import { useTranslation } from "react-i18next";
import { Avatar, BetaUser, MeetCandidate, Video } from "@youmeet/gql/generated";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";
import { Button, useMediaQuery } from "@mui/material";
import SubPartContainer from "../SubPartContainer";
import { setError, setUpload } from "@youmeet/global-config/features/global";
import { onDeleteVideo, onSetVideoAsDefault } from "@youmeet/functions/actions";
import { RootState } from "@youmeet/global-config/store";
import { IoIosCamera } from "react-icons/io";
import { removeVideo, UserState } from "@youmeet/global-config/features/user";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import CandidateVideo from "../CandidateVideo";
import { GlobalState } from "@youmeet/global-config/features/global";
import { modals } from "../modals/modals";
import { trads } from "@youmeet/types/CustomModal";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import { MdFileDownload } from "react-icons/md";

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
  const deleteVideoFormRef = useRef<HTMLFormElement>(null);
  const setVideoAsDefaultFormRef = useRef<HTMLFormElement>(null);
  const user = useSelector((state: RootState) => state.user as UserState);
  const global = useSelector((state: RootState) => state.global as GlobalState);
  const error = global.error;
  const del = "delete";
  const deleting = global.upload === del ? del : null;

  const type = error || deleting;

  const className = modal
    ? "box-border flex items-center justify-end max-w-[215px]"
    : "box-border flex items-center justify-end w-full";

  const videoComponent = useMemo(() => {
    return (
      <div className={className}>
        <CandidateVideo
          video={video?.file as Avatar}
          notAutoPlay
          newStyles={{
            maxWidth: "100vw",
            width: "100%",
            height: "100%",
            mobileWidth: "100%",
          }}
          containerNewStyles={{
            maxWidth: videoWidth,
            maxHeight: videoHeight,
          }}
        />
      </div>
    );
  }, [video, modal]);

  const customOnDeleteVideo = useCallback(async (videoId: string) => {
    dispatch(setUpload(`delete`));
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

  const handleDownload = useCallback(() => {
    const url = setFileUrl(video?.file);
    if (url) {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute("style", "display:none");
      a.setAttribute("href", url);
      a.setAttribute("download", "video-youmeet.webm");
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, []);

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
              ? "relative flex flex-1 p-[18px] dark:extraLightDarkBg border-[1px] border-green700 border-solid"
              : "relative flex flex-1 p-[18px] dark:extraLightDarkBg"
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {modal && chosenVideo?.id === video?.id ? (
            <div className="text-green500 absolute flex-center gap-[6px] top-[4px] left-[4px] text-[12px]">
              <AiFillCheckCircle className="text-[14px] text-green300" />{" "}
              {t("chosen")}
            </div>
          ) : !!modal ? (
            <div
              className="whitespace-nowrap absolute flex-center gap-[6px] top-[4px] left-[4px] text-[12px] cursor-pointer text-deepPurple900"
              onClick={(e) => {
                if (setChosenVideo) setChosenVideo(video);
                if (setCheckAvailableVideos) setCheckAvailableVideos(false);
              }}
            >
              {t("take-this-video")}
            </div>
          ) : undefined}
          <div className="xs:flex-col sm:flex-col flex flex-row-reverse gap-[12px] w-full">
            {video?.file?.url && video.file.secure_url && !xs && !sm && !md
              ? videoComponent
              : undefined}
            <div
              className={
                videos && videos.length === 0
                  ? "flex items-start w-full flex-col gap-[12px]"
                  : "flex-bet flex-col w-full gap-[12px]"
              }
            >
              <div className="flex flex-col gap-[24px] w-full">
                <div className="flex items-center justify-start gap-[6px] xs:gap-[3px] sm:gap-[3px]">
                  <h3 className="font-light subItem my-0 whitespace-nowrap text-grey700 dark:text-grey300">
                    {t("video")}{" "}
                    {video?.job &&
                    video.job.title &&
                    video?.job?.title[language as "fr" | "en"]
                      ? `${t("of")} ${video.job.title[language as "fr" | "en"]}`
                      : `CV`}
                  </h3>
                  {!!video.principal && (
                    <div className="h-full dark:text-green200 text-green600 font-bold">
                      {t("principalVideo")}
                    </div>
                  )}
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
                  </div>
                )}
                {video?.file?.url &&
                  video.file.secure_url &&
                  user.id === profil.id && (
                    <div className="flex-bet">
                      <div className="flex items-center gap-[12px] xs:gap-[3px] sm:gap-[3px] md:gap-[6px] w-full py-[6px]">
                        {!video.principal && !affiliated && (
                          <form
                            ref={setVideoAsDefaultFormRef}
                            action={customOnSetVideoAsDefault.bind(null, {
                              videoId: video?.id as string,
                              userId: profil.id as string,
                            })}
                          >
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                setVideoAsDefaultFormRef.current?.requestSubmit();
                              }}
                              className="buttonMui"
                            >
                              {t("set-as-principal")}
                            </Button>
                          </form>
                        )}
                        {!video.principal && !affiliated && (
                          <div
                            className="w-[1px] bg-grey300"
                            style={{ height: "18px" }}
                          />
                        )}
                        {!affiliated && (
                          <div className="flex flex-col gap-[12px]">
                            <form
                              ref={deleteVideoFormRef}
                              action={customOnDeleteVideo.bind(
                                null,
                                video?.id as string
                              )}
                            >
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteVideoFormRef.current?.requestSubmit();
                                }}
                                className="buttonMui"
                              >
                                {t("delete")}
                              </Button>
                            </form>
                            {!!type &&
                              modals &&
                              modals[type] &&
                              modals[type].content && (
                                <BoldText
                                  text={`${t(
                                    (modals[type].content as trads)[language]
                                  )}`}
                                  align="left"
                                />
                              )}
                          </div>
                        )}
                        {setFileUrl(video.file) && (
                          <div
                            className="w-[1px] bg-grey300"
                            style={{ height: "18px" }}
                          />
                        )}
                        {setFileUrl(video.file) && (
                          <Button
                            onClick={handleDownload}
                            className="w-fit buttonMui"
                          >
                            <MdFileDownload />
                          </Button>
                        )}
                      </div>
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
          </div>
        </div>
      </SubPartContainer>
    )
  );
}
