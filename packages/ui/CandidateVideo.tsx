"use client";
/* eslint-disable jsx-a11y/alt-text */
import React, {
  Dispatch,
  SetStateAction,
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { VscTriangleRight as Play } from "react-icons/vsc";
import { IoStopSharp, IoPauseSharp as Pause } from "react-icons/io5";
import { MdFullscreen } from "react-icons/md";
import { CgMiniPlayer as MiniPlayerScreen } from "react-icons/cg";
import { TbRectangle as TheaterScreen } from "react-icons/tb";
import { BiExitFullscreen } from "react-icons/bi";
import { GoUnmute as Unmute, GoMute as Mute } from "react-icons/go";
import SubLayout from "./SubLayout";
import DetailComponent from "./DetailComponent";
import { setUpCase } from "@youmeet/utils/basics/resolveFullname";
import Link from "next/link";
import { getLinkedinUrlFromId } from "@youmeet/utils/basics/formatLinkedin";
import { Avatar, BetaUser } from "@youmeet/gql/generated";
import { FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import Image from "next/image";
import { Box, useMediaQuery } from "@mui/material";
import type { Attr } from "@youmeet/types/attributes";
import { uri } from "@youmeet/functions/imports";

export default function CandidateVideo({
  video,
  name,
  setCurrentPosition,
  currentPosition,
  notAutoPlay,
  usersWithVideos,
  isCarousel,
  newStyles,
  containerNewStyles,
  profil,
  onTheFly,
}: {
  video: Avatar;
  name?: string;
  setCurrentPosition?: Dispatch<SetStateAction<number>>;
  currentPosition?: number;
  notAutoPlay?: boolean;
  usersWithVideos?: BetaUser[];
  isCarousel?: boolean;
  newStyles?: Attr;
  containerNewStyles?: Attr;
  profil?: BetaUser;
  onTheFly?: true;
}) {
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [wasPaused, setWasPaused] = useState(false);
  const appVideoContainer = useRef<HTMLDivElement>(null);
  const appVideo = useRef<HTMLVideoElement>(null);
  const appVolumeSlider = useRef<HTMLInputElement>(null);
  const appTotalTimeElement = useRef<HTMLDivElement>(null);
  const appCurrentTimeElement = useRef<HTMLDivElement>(null);
  const appTimelineContainer = useRef<HTMLDivElement>(null);
  const appSpeedBtn = useRef<HTMLButtonElement>(null);
  const theater = useRef<HTMLButtonElement>(null);
  const miniPlayer = useRef<HTMLButtonElement>(null);
  const timeContainer = useRef<HTMLDivElement>(null);
  const muteBtn = useRef<HTMLButtonElement>(null);
  const [displayIcon, setDisplayIcon] = useState(false);
  const [appDocument, setAppDocument] = useState<Document | undefined>();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [played, setPlayed] = useState(false);
  const videoRef = useRef(null);
  const [progressPosition, setProgressPosition] = useState<number>(0);
  const [mouseContext, setMouseContext] = useState<"down" | "up">("up");
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState<number>(0);
  const [inFullScreen, setInFullScreen] = useState(false);

  const togglePlay = useCallback(
    (e: any) => {
      e.stopPropagation();
      const video = appVideo.current as HTMLVideoElement;
      if (video) {
        if (video.paused) video.play();
        else video.pause();
      }
    },
    [appVideo]
  );

  const toggleMiniPlayer = useCallback(() => {
    const video = appVideo.current as HTMLVideoElement;
    const videoContainer = appVideoContainer.current as HTMLDivElement;
    if (videoContainer && videoContainer.classList.contains("mini-player")) {
      appDocument?.exitPictureInPicture();
    } else if (video) {
      video.requestPictureInPicture();
    }
  }, [appVideoContainer.current, appVideo]);

  const toggleTheater = useCallback(() => {
    const videoContainer = appVideoContainer.current as HTMLDivElement;
    if (videoContainer) {
      videoContainer.classList.toggle("theater");
    }
  }, [appVideoContainer.current]);

  const toggleFullScreen = useCallback(() => {
    const videoContainer = appVideoContainer.current as HTMLDivElement;
    if (appDocument?.fullscreenElement == null && videoContainer) {
      videoContainer.requestFullscreen();
    } else {
      appDocument?.exitFullscreen();
    }
  }, [
    appDocument,
    appVideoContainer.current,
    miniPlayer.current,
    appSpeedBtn.current,
    theater.current,
  ]);

  function toggleMute(video: HTMLVideoElement) {
    if (video) video.muted = !video.muted;
  }

  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });
  function formatDuration(time: number) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${leadingZeroFormatter.format(
        minutes
      )}:${leadingZeroFormatter.format(seconds)}`;
    }
  }

  function skip(duration: number, video: HTMLVideoElement) {
    video.currentTime += duration;
  }

  // function toggleCaptions(captions: TextTrack, videoContainer: HTMLDivElement) {
  //   const isHidden = captions.mode === "hidden";
  //   captions.mode = isHidden ? "showing" : "hidden";
  //   videoContainer.classList.toggle("captions", isHidden);
  // }

  const changePlaybackSpeed = useCallback(
    (video: HTMLVideoElement, speedBtn: HTMLButtonElement) => {
      if (video && speedBtn) {
        let newPlaybackRate = video.playbackRate + 0.25;
        if (newPlaybackRate > 2) newPlaybackRate = 0.25;
        video.playbackRate = newPlaybackRate;
        speedBtn.textContent = `${newPlaybackRate}x`;
      }
    },
    [appVideo.current, appSpeedBtn.current]
  );

  const handleTimelineUpdate = useCallback(
    (e: any, isScrubbing: boolean) => {
      const video = appVideo.current as HTMLVideoElement;
      const timeContainer = appTimelineContainer.current as HTMLDivElement;
      if (video) {
        // if (!wasPaused) video?.pause();
        if (timeContainer && video) {
          // if (
          //   timeContainer &&
          //   appVideo &&
          //   appPreviewImg &&
          //   appThumbnailImg
          // ) {
          const rect = timeContainer.getBoundingClientRect();
          const percent =
            Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
          // const previewImgNumber = Math.max(
          //   1,
          //   Math.floor((percent * appVideo.duration) / 1)
          // );
          // const previewImgSrc = `https://res.cloudinary.com/de822mdsy/image/upload/v1679057074/youmeet-official/jonathan.carnos/${name}/preview${previewImgNumber}.jpg`;

          // appPreviewImg.src = previewImgSrc;
          // appTimelineContainer.style.setProperty(
          //   "--preview-position",
          //   String(percent)
          // );

          setIsScrubbing(e.buttons === 1);
          if (e.buttons === 1) {
            e.preventDefault();
            // appThumbnailImg.src = previewImgSrc;
            setProgressPosition(percent);
            timeContainer.style.setProperty(
              "--progress-position",
              String(percent)
            );
            video.currentTime = percent * video.duration;
            setIsScrubbing(false);
          }
        }
      }
    },
    [appTimelineContainer.current, appVideo.current]
    // [appTimelineContainer, appVideo, appPreviewImg, appThumbnailImg]
  );

  const toggleScrubbing = useCallback(
    (e: any, isScrubbing: boolean, wasPaused: boolean) => {
      const video = appVideo.current as HTMLVideoElement;
      const timeContainer = appTimelineContainer.current as HTMLDivElement;
      const videoContainer = appVideoContainer.current as HTMLDivElement;
      setIsScrubbing(true);
      if (timeContainer && videoContainer && video) {
        const rect = timeContainer.getBoundingClientRect();
        const percent =
          Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;

        // setIsScrubbing((e.buttons & 1) === 1);
        // appVideoContainer.classList.toggle("scrubbing", isScrubbing);

        // video.currentTime = progressPosition * video.duration;
        video.currentTime = percent * video.duration;
        // if (wasPaused) appVideo.play();

        handleTimelineUpdate(e, isScrubbing);
      }
    },
    [appTimelineContainer.current, appVideoContainer.current, appVideo.current]
    // [
    //   appTimelineContainer,
    //   appVideoContainer,
    //   appVideo,
    //   appPreviewImg,
    //   appThumbnailImg,
    // ]
  );

  // useEffect(() => {
  //   const playPauseBtn = document.querySelector(".play-pause-btn");
  //   if (playPauseBtn) setAppPlayPauseBtn(playPauseBtn);
  //   const captionsBtn = document.querySelector(".captions-btn");
  //   const previewImg = document.querySelector(
  //     ".preview-img"
  //   ) as HTMLImageElement;
  //   const thumbnailImg = document.querySelector(
  //     ".thumbnail-img"
  //   ) as HTMLImageElement;
  //   const timelineContainer = document.querySelector(
  //     ".timeline-container"
  //   ) as HTMLDivElement;
  //   if (timelineContainer) setAppTimelineContainer(timelineContainer);
  //   const speedBtn = document.querySelector(".speed-btn");
  //   if (speedBtn) setAppSpeedBtn(speedBtn);
  //   const currentTimeElement = document.querySelector(".current-time");
  //   if (currentTimeElement) setAppCurrentTimeElement(currentTimeElement);
  //   const totalTimeElement = document.querySelector(".total-time");
  //   if (totalTimeElement) setAppTotalTimeElement(totalTimeElement);
  //   const miniPlayerBtn = document.querySelector(".mini-player-btn");
  //   if (miniPlayerBtn) setAppMiniPlayerBtn(miniPlayerBtn);
  //   const theaterBtn = document.querySelector(".theater-btn");
  //   if (theaterBtn) setAppTheaterBtn(theaterBtn);
  //   const fullScreenBtn = document.querySelector(".full-screen-btn");
  //   if (fullScreenBtn) setAppFullScreenBtn(fullScreenBtn);
  //   const muteBtn = document.querySelector(".mute-btn") as Element;
  //   if (muteBtn) setAppMuteBtn(muteBtn);
  //   const volumeSlider = document.querySelector(
  //     ".volume-slider"
  //   ) as HTMLInputElement;
  //   if (volumeSlider) setAppVolumeSlider(volumeSlider);
  //   const video = document.querySelector("video") as HTMLVideoElement;
  //   if (video) setAppVideo(video);
  //   const videoContainer = document.querySelector(
  //     ".video-container"
  //   ) as HTMLDivElement;
  //   if (videoContainer) setAppVideoContainer(videoContainer);
  //   const previewImg = document.querySelector(
  //     ".preview-img"
  //   ) as HTMLImageElement;
  //   if (previewImg) setAppPreviewImg(previewImg);
  //   const thumbnailImg = document.querySelector(
  //     ".thumbnail-img"
  //   ) as HTMLImageElement;
  //   if (thumbnailImg) setAppThumbnailImg(thumbnailImg);
  // }, [formatDuration]);

  const toggleFullScreenClass = (el: HTMLDivElement | HTMLButtonElement) => {
    if (el) {
      el.classList.toggle(
        "full-screen",
        document.fullscreenElement ? true : false
      );
      return setInFullScreen(!inFullScreen);
    }
    return undefined;
  };

  const fullScreenListener = useCallback(() => {
    const videoContainer = appVideoContainer.current as HTMLDivElement;
    const miniPlayerEl = miniPlayer.current as HTMLButtonElement;
    const appSpeedBtnEl = appSpeedBtn.current as HTMLButtonElement;
    const theaterEl = theater.current as HTMLButtonElement;

    toggleFullScreenClass(videoContainer);
    toggleFullScreenClass(miniPlayerEl);
    toggleFullScreenClass(appSpeedBtnEl);
    toggleFullScreenClass(theaterEl);
  }, [
    appVideoContainer.current,
    theater.current,
    miniPlayer.current,
    appSpeedBtn.current,
  ]);

  useEffect(() => {
    if (wasPaused) {
      setDisplayIcon(true);
      setTimeout(() => {
        setDisplayIcon(false);
      }, 300);
    }
    if (document) setAppDocument(document);
    setLoading(false);
  }, [wasPaused]);

  useEffect(() => {
    const videoContainer = appVideoContainer.current as HTMLDivElement;
    const video = appVideo.current as HTMLVideoElement;
    document.addEventListener("fullscreenchange", fullScreenListener);
    if (videoContainer) {
      document.addEventListener("enterpictureinpicture", () => {
        videoContainer.classList.add("mini-player");
      });
      document.addEventListener("leavepictureinpicture", () => {
        videoContainer.classList.remove("mini-player");
      });
    }
    document.addEventListener("mouseup", (e) => {
      if (isScrubbing && appTimelineContainer && appVideoContainer && video)
        toggleScrubbing(e, isScrubbing, wasPaused);
    });
    document.addEventListener("mousemove", (e) => {
      if (isScrubbing && appTimelineContainer && video)
        handleTimelineUpdate(e, isScrubbing);
    });
    if (video) {
      video.addEventListener("play", () => setWasPaused(false));
      video.addEventListener("pause", () => setWasPaused(true));
    }
  }, [
    name,
    appVideoContainer.current,
    appVideo.current,
    miniPlayer.current,
    appSpeedBtn.current,
    theater.current,
    fullScreenListener,
  ]);

  return (
    !loading && (
      <div
        className="relative h-full flex w-full xs:flex-col-reverse sm:flex-col-reverse md:flex-col-reverse justify-between"
        style={{
          ...containerNewStyles,
          minHeight: inFullScreen ? "100%" : containerNewStyles?.minHeight,
          minWidth: inFullScreen ? "100%" : containerNewStyles?.minWidth,
          height: inFullScreen ? "100%" : containerNewStyles?.height,
          width: inFullScreen ? "100%" : containerNewStyles?.width,
        }}
      >
        {!loading && (
          <div
            ref={appVideoContainer}
            className="video-container paused group flex-1 w-full h-full"
            style={{
              backgroundImage:
                profil && profil.candidate?.targetJob?.topSector?.bgImage
                  ? `linear-gradient(150deg, rgba(111, 111, 111, 0.3),black), url(${profil.candidate.targetJob.topSector?.bgImage})`
                  : "unset",
              // backgroundBlendMode: "color",
              backgroundSize: "contain",
              backgroundRepeat: "repeat",
            }}
            data-volume-level="high"
          >
            {wasPaused && displayIcon ? (
              <div className="absolute top-0 left-0 w-full h-full flex-center items-start cursor-pointer">
                <div className="text-[48px] bg-white flex-center">
                  <IoStopSharp className="text-[48px] text-black animate-ping" />
                </div>
              </div>
            ) : undefined}
            {/* <Image src="" alt="" className="thumbnail-img" /> */}
            <video
              ref={appVideo}
              autoPlay={notAutoPlay ? false : true}
              id="video"
              className="h-full"
              style={{
                maxWidth: "100%",
                ...newStyles,
                minHeight: inFullScreen ? "100%" : newStyles?.minHeight,
                minWidth: inFullScreen ? "100%" : newStyles?.minWidth,
                height: inFullScreen ? "100%" : newStyles?.height,
                width: inFullScreen ? "100%" : newStyles?.height,
              }}
              src={setFileUrl(video, onTheFly) as string}
              onClick={(e) => togglePlay(e)}
              onPause={() => {
                const videoContainer =
                  appVideoContainer.current as HTMLDivElement;
                if (videoContainer) {
                  setWasPaused(true);
                  videoContainer.classList.add("paused");
                }
              }}
              onPlay={() => {
                const videoContainer =
                  appVideoContainer.current as HTMLDivElement;
                if (videoContainer) {
                  setWasPaused(false);
                  videoContainer.classList.remove("paused");
                }
              }}
              onLoadedData={() => {
                const video = appVideo.current as HTMLVideoElement;
                const totalTime = appTotalTimeElement.current as HTMLDivElement;
                if (totalTime && video) {
                  totalTime.textContent = formatDuration(video.duration);
                }
              }}
              onTimeUpdate={() => {
                const video = appVideo.current as HTMLVideoElement;
                const timeContainer =
                  appTimelineContainer.current as HTMLDivElement;
                const currentTime =
                  appCurrentTimeElement.current as HTMLDivElement;
                if (currentTime && video && timeContainer) {
                  currentTime.textContent = formatDuration(video.currentTime);
                  const percent = video.currentTime / video.duration;
                  timeContainer?.style.setProperty(
                    "--progress-position",
                    String(percent)
                  );
                }
              }}
              onVolumeChange={() => {
                const video = appVideo.current as HTMLVideoElement;
                const slider = appVolumeSlider.current as HTMLInputElement;
                const videoContainer =
                  appVideoContainer.current as HTMLDivElement;
                if (slider && videoContainer && video) {
                  slider.value = String(video.volume);
                  let volumeLevel;
                  if (video.muted || video.volume === 0) {
                    slider.value = String(0);
                    volumeLevel = "muted";
                  } else {
                    volumeLevel = "high";
                  }

                  videoContainer.dataset.volumeLevel = volumeLevel;
                }
              }}
            >
              {/* <track
              kind="captions"
              srcLang="en"
              src={
                "https://res.cloudinary.com/de822mdsy/raw/upload/v1720785915/youmeet-official/668e956c8606112763cd762f_1_video.transcript"
              }
            ></track> */}
            </video>

            <div className="absolute w-full left-0 bottom-0 bg-black/30">
              <div className="video-controls-container">
                <div
                  ref={appTimelineContainer}
                  className="timeline-container"
                  onMouseMove={(e) => {
                    const timeContainer =
                      appTimelineContainer.current as HTMLDivElement;
                    if (timeContainer && appVideo)
                      handleTimelineUpdate(e, isScrubbing);
                  }}
                  onMouseDown={(e) => {
                    const timeContainer =
                      appTimelineContainer.current as HTMLDivElement;
                    const videoContainer =
                      appVideoContainer.current as HTMLDivElement;
                    if (timeContainer && appVideo && videoContainer) {
                      toggleScrubbing(e, isScrubbing, wasPaused);
                    }
                  }}
                >
                  <div className="timeline opacity-[0.5] h-[3px] bg-purple500 group-hover:h-[12px] group-hover:opacity-[0.3] w-full relative">
                    {/* <Image
                  src={video.secure_url as string}
                  width={120}
                  height={80}
                  alt="preview-video"
                  className="preview-img"
                /> */}
                    <div className="thumb-indicator"></div>
                  </div>
                </div>

                <div className="controls flex-bet">
                  <div
                    className={
                      inFullScreen
                        ? "flex-center gap-[12px]"
                        : "flex-center gap-[6px]"
                    }
                  >
                    <button
                      className="play-pause-btn flex-center"
                      onClick={(e) => togglePlay(e)}
                      name="play-pause"
                    >
                      <Play className="play-icon" name="play" />
                      <Pause className="pause-icon" name="pause" />
                    </button>
                    <div className="volume-container flex items-center">
                      <button
                        ref={muteBtn}
                        className="mute-btn flex-center"
                        name="mute"
                        onClick={() => {
                          const video = appVideo.current as HTMLVideoElement;
                          if (video) toggleMute(video);
                        }}
                      >
                        <Unmute className="volume-high-icon" name="unmute" />
                        <Mute className="volume-muted-icon" name="mute" />
                      </button>
                      <input
                        aria-label="volume-slider"
                        ref={appVolumeSlider}
                        type="range"
                        min="0"
                        max="1"
                        step="any"
                        defaultValue="1"
                        className="volume-slider"
                        onInput={(e) => {
                          const video = appVideo.current as HTMLVideoElement;
                          if (video) {
                            video.volume = Number(
                              (e?.target as HTMLInputElement)?.value
                            );
                            video.muted =
                              Number((e?.target as HTMLInputElement)?.value) ===
                              0;
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-center gap-[12px]">
                    <div
                      ref={timeContainer}
                      className="duration-container hidden-fullscreen"
                    >
                      <div ref={appCurrentTimeElement} className="current-time">
                        0:00
                      </div>
                      /
                      <div
                        ref={appTotalTimeElement}
                        className="total-time"
                      ></div>
                    </div>

                    {/* <button className="captions-btn">
                <Captions />
              </button> */}

                    <button
                      ref={appSpeedBtn}
                      className="speed-btn wide-btn hidden-fullscreen"
                      name="speed"
                      onClick={() => {
                        const video = appVideo.current as HTMLVideoElement;
                        const speedBtn =
                          appSpeedBtn.current as HTMLButtonElement;
                        if (video && speedBtn) {
                          changePlaybackSpeed(video, speedBtn);
                        }
                      }}
                    >
                      1x
                    </button>

                    <button
                      ref={miniPlayer}
                      className="mini-player-btn hidden-fullscreen"
                      onClick={() => {
                        if (appVideo) toggleMiniPlayer();
                      }}
                      name="mini-player"
                    >
                      <MiniPlayerScreen name="mini-player" />
                    </button>

                    {isCarousel && (
                      <button
                        ref={theater}
                        className="theater-btn"
                        onClick={() => toggleTheater()}
                        name="theater"
                      >
                        <TheaterScreen name="theater" />
                      </button>
                    )}
                    <button
                      className="full-screen-btn flex-center"
                      onClick={() => toggleFullScreen()}
                      name="full-screen"
                    >
                      <MdFullscreen
                        className="open-icon text-white"
                        name="full-screen"
                      />

                      <BiExitFullscreen
                        className="close-icon text-white"
                        name="exit-full-screen"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!loading && isCarousel && setFileUrl(video) && (
          <div
            className="relative left-0 top-0 mt-[3px]"
            style={{ maxWidth: "100vw" }}
          >
            {usersWithVideos && currentPosition !== undefined ? (
              <div className="sub-layout-container mx-0 max-w-screen min-w-[300px]">
                <SubLayout
                  newStyles={{
                    margin: "0px",
                    padding: "6px",
                    // height: "100%",
                    flex: 1,
                    background:
                      "linear-gradient(170deg, rgba(55,55,55,1),rgba(45,30,45,1), rgba(60,30,60,1)",
                  }}
                >
                  <div className="flex items-start flex-col justify-center gap-[6px] w-full xs:flex-col sm:flex-col md:flex-col">
                    <div className="my-[8px] flex-bet flex-col w-full px-[6px] box-border xs:mb-0 sm:mb-0 md:mb-0">
                      <h3 className="dyn-page-title text-center">
                        {t("informations")}
                      </h3>
                      {/* {dataType === "candidates" && ( */}
                      <Link
                        href={`${uri}/profils/${usersWithVideos[currentPosition].id}`}
                        className="text-white my-[12px] subItem xs:legend sm:legend md:legend xs:m-[4px] sm:m-[4px] md:m-[4px]"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p>{t("offer-interview")}</p>
                      </Link>
                      {/* )} */}
                    </div>

                    {/* {dataType === "candidates" ? ( */}
                    <div className="flex flex-col flex-wrap w-full">
                      {usersWithVideos[currentPosition].candidate?.avatars &&
                      usersWithVideos[currentPosition].candidate?.avatars
                        ?.length &&
                      setFileUrl(
                        (
                          usersWithVideos[currentPosition]?.candidate
                            ?.avatars as Avatar[]
                        )[currentAvatarIndex]
                      ) ? (
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            alt={
                              (usersWithVideos[currentPosition]
                                ?.firstname as string) +
                              usersWithVideos[currentPosition]?.lastname
                            }
                            className="backface-hidden rounded-[10px] cursor-pointer"
                            src={
                              usersWithVideos[currentPosition]?.candidate
                                ?.avatars?.length
                                ? (setFileUrl(
                                    (
                                      usersWithVideos[currentPosition]
                                        ?.candidate?.avatars as Avatar[]
                                    )[currentAvatarIndex]
                                  ) as string)
                                : ""
                            }
                            width={200}
                            height={200}
                            style={{
                              width: xs || sm || md ? 60 : 200,
                              height: xs || sm || md ? 60 : 200,
                              objectFit: "cover",
                            }}
                            onClick={() => {
                              setCurrentAvatarIndex(
                                currentAvatarIndex <
                                  (
                                    usersWithVideos[currentPosition]?.candidate
                                      ?.avatars as []
                                  ).length -
                                    1
                                  ? currentAvatarIndex + 1
                                  : 0
                              );
                            }}
                          />
                        </Box>
                      ) : undefined}

                      {usersWithVideos[currentPosition].fullname ? (
                        <DetailComponent
                          fontSize={xs || sm || md ? "14px" : "inherit"}
                          newStyles={{ color: "white" }}
                          noPadding={!xs && !sm && !md}
                          type="modal2"
                          label={t("me-profile-infos-label-fullname")}
                          value={setUpCase(
                            usersWithVideos[currentPosition].fullname as string
                          )}
                          labelFullWidth
                          conversation={xs || sm || md ? false : true}
                        />
                      ) : usersWithVideos[currentPosition].firstname &&
                        usersWithVideos[currentPosition].lastname ? (
                        <div className="flex flex-col gap-[12px]">
                          <DetailComponent
                            fontSize={xs || sm || md ? "14px" : "inherit"}
                            conversation={xs || sm || md ? false : true}
                            newStyles={{ color: "white" }}
                            noPadding={!xs && !sm && !md}
                            type="modal2"
                            label={t("me-profile-infos-label-firstname")}
                            value={setUpCase(
                              usersWithVideos[currentPosition]
                                .firstname as string
                            )}
                            labelFullWidth
                          />

                          <DetailComponent
                            fontSize={xs || sm || md ? "14px" : "inherit"}
                            conversation={xs || sm || md ? false : true}
                            newStyles={{ color: "white" }}
                            noPadding={!xs && !sm && !md}
                            type="modal2"
                            label={t("me-profile-infos-label-fullname")}
                            value={setUpCase(
                              usersWithVideos[currentPosition]
                                .lastname as string
                            )}
                            labelFullWidth
                          />
                        </div>
                      ) : undefined}
                      {usersWithVideos[currentPosition].linkedinProfileId && (
                        <DetailComponent
                          fontSize={xs || sm || md ? "14px" : "inherit"}
                          conversation={xs || sm || md ? false : true}
                          newStyles={{ color: "white" }}
                          noPadding={!xs && !sm && !md}
                          type="modal2"
                          label={t("linkedin-profile")}
                          labelFullWidth
                          value={
                            <Link
                              href={getLinkedinUrlFromId(
                                usersWithVideos[currentPosition]
                                  .linkedinProfileId as string
                              )}
                              target="_blank"
                              className="flex-center text-blue600 dark:text-blue200"
                            >
                              {createElement(FaLinkedin)}
                            </Link>
                          }
                        />
                      )}
                      {(usersWithVideos[currentPosition]?.languages as string[])
                        ?.length > 0 && (
                        <DetailComponent
                          fontSize={xs || sm || md ? "14px" : "inherit"}
                          conversation={xs || sm || md ? false : true}
                          newStyles={{ color: "white" }}
                          noPadding={!xs && !sm && !md}
                          type="modal2"
                          label={t("spoken-languages")}
                          labelFullWidth
                          value={(
                            usersWithVideos[currentPosition]
                              ?.languages as string[]
                          )?.join(", ")}
                        />
                      )}
                      {usersWithVideos[currentPosition].details?.phone?.code &&
                        usersWithVideos[currentPosition].details?.phone
                          ?.number && (
                          <DetailComponent
                            fontSize={xs || sm || md ? "14px" : "inherit"}
                            conversation={xs || sm || md ? false : true}
                            newStyles={{ color: "white" }}
                            noPadding={!xs && !sm && !md}
                            type="modal2"
                            label={t("me-profile-infos-label-phone")}
                            labelFullWidth
                            value={
                              usersWithVideos[currentPosition]?.details?.phone
                                ?.code +
                              " " +
                              usersWithVideos[currentPosition]?.details?.phone
                                ?.number
                            }
                          />
                        )}
                      {usersWithVideos[currentPosition]?.age && (
                        <DetailComponent
                          fontSize={xs || sm || md ? "14px" : "inherit"}
                          conversation={xs || sm || md ? false : true}
                          newStyles={{ color: "white" }}
                          noPadding={!xs && !sm && !md}
                          type="modal2"
                          label={t("me-profile-infos-label-age")}
                          value={String(usersWithVideos[currentPosition]?.age)}
                        />
                      )}
                    </div>
                    {/* ) : (
                    <div className="flex flex-col flex-wrap w-full">
                      {setFileUrl(
                        (usersWithVideos[currentPosition] as BetaCompany).logo
                      ) ? (
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "6px 0px",
                          }}
                        >
                          <Image
                            alt="enterprise-logo"
                            width={0}
                            height={0}
                            style={{
                              width: "30%",
                              minWidth: "120px",
                              height: "auto",
                            }}
                            src={
                              setFileUrl(
                                (
                                  usersWithVideos[
                                    currentPosition
                                  ] as BetaCompany
                                ).logo
                              ) as string
                            }
                          />
                        </Box>
                      ) : undefined}
                      {(usersWithVideos[currentPosition] as BetaCompany)
                        .name && (
                        <DetailComponent
                          fontSize={xs || sm || md ? "14px" : "inherit"}
                          conversation={xs || sm || md ? false : true}
                          newStyles={{ color: "white" }}
                          noPadding
                          type="modal2"
                          label={t("me-organisation-infos-label-name")}
                          value={setUpCase(
                            (usersWithVideos[currentPosition] as BetaCompany)
                              .name as string
                          )}
                          labelFullWidth
                        />
                      )}
                      {(usersWithVideos[currentPosition] as BetaCompany)
                        .location && (
                        <DetailComponent
                          fontSize={xs || sm || md ? "14px" : "inherit"}
                          conversation={xs || sm || md ? false : true}
                          newStyles={{ color: "white" }}
                          noPadding
                          type="modal2"
                          label={t("me-organisation-infos-label-location")}
                          value={
                            (usersWithVideos[currentPosition] as BetaCompany)
                              .location as string
                          }
                          labelFullWidth
                        />
                      )}

                      {(usersWithVideos[currentPosition] as BetaCompany)
                        .linkedinProfilePage && (
                        <DetailComponent
                          fontSize={xs || sm || md ? "14px" : "inherit"}
                          conversation={xs || sm || md ? false : true}
                          newStyles={{ color: "white" }}
                          noPadding
                          type="modal2"
                          label={t("linkedin-profile-link")}
                          labelFullWidth
                          value={
                            <Link
                              href={getLinkedinUrlFromId(
                                (
                                  usersWithVideos[
                                    currentPosition
                                  ] as BetaCompany
                                ).linkedinProfilePage as string
                              )}
                              target="_blank"
                              className="flex-center text-blue600 dark:text-blue200"
                            >
                              {createElement(FaLinkedin)}
                            </Link>
                          }
                        />
                      )}
                    </div>
                  )} */}

                    <div className="flex-1" />
                  </div>
                </SubLayout>
              </div>
            ) : undefined}
          </div>
        )}
        {/* {!loading && <div className="flex-1 min-h-[33%]" />} */}
      </div>
    )
  );
}
