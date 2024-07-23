"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { FrontCardProps } from "@youmeet/types/FrontCardProps";
import { Avatar, Translated, Video } from "@youmeet/gql/generated";
import { Box, Button, useMediaQuery } from "@mui/material";
import { HiVideoCamera } from "react-icons/hi";
import { HiArrowUturnRight } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { formatToDatetime } from "@youmeet/utils/formatToDatetime";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState, setCredit } from "@youmeet/global-config/features/user";
import { getName, setHiddenName, setName } from "@youmeet/utils/setName";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";
import { IoMdCamera } from "react-icons/io";
import setFileUrl from "@youmeet/utils/setFileUrl";
import { FaLockOpen } from "react-icons/fa6";
import { getPrincipalVideo } from "@youmeet/utils/getPrincipalVideo";
import { setError } from "@youmeet/global-config/features/global";
import { onUnlockCandidate } from "@youmeet/functions/actions";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { CardTurnUp } from "@youmeet/types/Header";
import { RiInformationFill } from "react-icons/ri";
import { setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import Link from "next/link";

const renderTooltipContent = (
  veryHigh: boolean,
  high: boolean,
  normal: boolean,
  phone: boolean,
  linkedin: boolean,
  description: boolean
) => {
  let result: string[] = [];
  if (veryHigh) result.push("veryHighQualified-tip");
  else if (high) result.push("highlyQualified-tip");
  else if (normal) result.push("qualified-tip");
  else if (phone || linkedin || description) {
    if (phone) result.push("hasPhone-tip");
    if (linkedin) result.push("hasLinkedin-tip");
    if (description) result.push("hasDescription-tip");
  } else result.push("lowQualified-tip");

  return result;
};

const emailsList = [
  "jonathan.carnos@gmail.com",
  "jonathan.carnos.serotel@gmail.com",
  "youmeet.test@gmail.com",
  "contact@youmeet.info",
];

export default function FrontCard({
  user,
  setFrontShouldTurnUp,
  frontShouldTurnUp,
  isSubscribed,
  type,
  refetch,
  unlocked,
  shouldSee,
}: FrontCardProps) {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const [shouldChangeImageAppear, setShouldChangeImageAppear] =
    useState<boolean>(false);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const appUser = useSelector((state: RootState) => state.user as UserState);
  const [cardPrice, setCardPrice] = useState<number | undefined>(undefined);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const calculatePrice = useCallback(() => {
    if (isSubscribed) {
      setCardPrice(0);
      return 0;
    } else if (typeof user?.cardPrice === "number") {
      setCardPrice(user.cardPrice);
    }
  }, [isSubscribed, user?.cardPrice]);

  const customOnUnlockCandidate = useCallback(
    async (extras: {
      originId: string | undefined;
      targetId: string;
      cardPrice: number | undefined;
    }) => {
      const { originId, targetId, cardPrice } = extras;
      if (originId && targetId && cardPrice !== undefined) {
        const hasCredit = appUser.credit >= cardPrice;

        if (hasCredit || isSubscribed) {
          const result = await onUnlockCandidate({
            originId,
            targetId,
            cardPrice,
          });
          if (result && isPayloadError(result)) {
            if (result.type === 19) {
              dispatch(
                setModal({
                  display: "requestNotCompleted",
                  message: result.message,
                }) as UnknownAction
              );
            } else dispatch(setError("requestNotCompleted"));
          } else {
            dispatch(setCredit(result.data.credit as number));
            if (refetch) refetch();
            return;
          }
        } else {
          dispatch(setModal({ display: "account" }) as UnknownAction);
        }
      } else if (cardPrice === undefined) {
        dispatch(setError("creditTooLow"));
      }
    },
    [appUser]
  );

  useEffect(() => {
    setCurrentAvatarIndex(0);
    calculatePrice();
    setLoading(false);
  }, [appUser]);

  useEffect(() => {
    if ((frontShouldTurnUp as CardTurnUp).waiting) {
      clearTimeout(timerId);
      setTimerId(undefined);
    }
  }, [frontShouldTurnUp, timerId]);

  const video = getPrincipalVideo(
    (user?.videos?.filter((v) => v) as Video[]) || undefined
  );
  const videoFile = video?.file;
  const cand = user?.candidate;
  const det = user?.details;
  const exps = user?.experiences;

  const hasVideo = !!setFileUrl(videoFile);
  const hasAvatar = !!(cand && cand.avatars && cand?.avatars?.length > 0);
  const hasTargetJob = !!(cand && cand.targetJob && cand.targetJob.title);
  const hasPhone = !!(det && det.phone && det.phone.number);
  const hasLinkedin = !!user?.linkedinProfileId;

  const qualified = hasVideo && hasTargetJob;
  const highlyQualified = qualified && hasAvatar && user.description;
  const veryHighQualified = highlyQualified && hasPhone && hasLinkedin;

  const tooltip = renderTooltipContent(
    !!veryHighQualified,
    !!highlyQualified,
    !!qualified,
    !!hasPhone,
    !!hasLinkedin,
    !!user?.description
  )
    .map((tr) => t(tr))
    .join(", ");

  return !loading && user ? (
    <div
      className={
        (frontShouldTurnUp as CardTurnUp).waiting
          ? "absolute h-full w-full backface-hidden group invisible flex flex-col justify-between px-[12px] pt-[16px] box-border dark:darkBg"
          : "absolute h-full w-full backface-hidden group group-hover:invisible flex flex-col justify-between px-[12px] pt-[16px] box-border dark:darkBg"
      }
    >
      {!shouldSee && (
        <div className="absolute w-fit h-fit box-border z-30 flex flex-col gap-[3px]">
          <TooltipedAsset asset={t("pay-this-to-see")}>
            <div className="flex-center p-[6px] min-h-[33px] min-w-[33px] box-border flex-col font-bold legend text-deepPurple900 dark:bg-deepPurple900 dark:text-white border-[0.5px] border-solid border-grey500 rounded-full">
              <div className="flex-[3] flex-center text-[16px]">
                {cardPrice}
              </div>
            </div>
          </TooltipedAsset>
          <TooltipedAsset asset={`${tooltip} ${t("available")}`}>
            <div>
              <RiInformationFill className="text-[18px] h-[25px] w-[25px] dark:text-white" />
            </div>
          </TooltipedAsset>
        </div>
      )}
      <Box className="absolute top-[16px] right-[16px] text-[18px] cursor-pointer flex flex-col items-end">
        {videoFile && videoFile?.secure_url && videoFile?.url && (
          <TooltipedAsset asset={t("see-video")}>
            {shouldSee ? (
              <div className="hover:animate-pulse">
                <Link href={`/videos/${video.id}`} className="mt-[8px] group">
                  <HiVideoCamera className="item dark:text-white hover:text-purple700 dark:hover:text-purple100" />
                </Link>
              </div>
            ) : (
              <div className="hover:animate-pulse">
                <HiVideoCamera className="item text-grey500 cursor-not-allowed dark:text-white hover:text-purple700 dark:hover:text-purple100" />
              </div>
            )}
          </TooltipedAsset>
        )}

        <div
          className="pt-[8px] hover:animate-pulse"
          onClick={() => {
            setFrontShouldTurnUp({ id: user?.id as string, waiting: true });
          }}
        >
          <HiArrowUturnRight className="item dark:text-white hover:text-purple700 dark:hover:text-purple100" />
        </div>
      </Box>
      <div className="flex-center box-border">
        {shouldChangeImageAppear && <IoMdArrowDropleft className="item" />}
        <div className="flex flex-col">
          {!shouldSee ? (
            <form
              action={customOnUnlockCandidate.bind(null, {
                cardPrice,
                originId: appUser.id ?? "",
                targetId: user.id ?? "",
              })}
              className="cursor-pointer"
            >
              <TooltipedAsset asset={t("unlock-candidate")}>
                <>
                  <Button
                    type="submit"
                    className="bg-transparent hover:bg-deepPurple50 dark:hover:extraLightDarkBg animate-pulse hover:animate-none"
                  >
                    <FaLockOpen className="group-hover:font-bold item text-deepPurple900 dark:text-white" />
                  </Button>
                </>
              </TooltipedAsset>
            </form>
          ) : undefined}

          <>
            {shouldSee ? (
              <div className="flex-center flex-col gap-[6px]">
                {cand &&
                setFileUrl((cand.avatars as Avatar[])[currentAvatarIndex]) ? (
                  <Image
                    alt={(user?.firstname as string) + user?.lastname}
                    className="backface-hidden rounded-[10px] cursor-pointer"
                    src={
                      cand?.avatars?.length
                        ? (setFileUrl(
                            (cand.avatars as Avatar[])[currentAvatarIndex]
                          ) as string)
                        : ""
                    }
                    width={165}
                    height={165}
                    style={{
                      width: xs || sm ? 140 : 165,
                      height: xs || sm ? 140 : 165,
                      objectFit: "cover",
                    }}
                    onMouseEnter={() => {
                      if (cand && cand.avatars && cand.avatars.length > 1)
                        setShouldChangeImageAppear(true);
                    }}
                    onMouseLeave={() => setShouldChangeImageAppear(false)}
                    onClick={() => {
                      setCurrentAvatarIndex(
                        currentAvatarIndex < (cand?.avatars as []).length - 1
                          ? currentAvatarIndex + 1
                          : 0
                      );
                    }}
                  />
                ) : (
                  <div className="xs:w-[140px] sm:w-[140px] w-[165px] xs:h-[140px] sm:h-[140px] h-[165px] backface-hidden rounded-[10px] text-lr-dark flex-center border-[0.5px] border-solid border-grey500 border-lr-dark titles p-[6px] box-border lightBg dark:extraLightDarkBg">
                    <div className="dark:text-white">{setName(user)}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-center flex-col gap-[6px]">
                {veryHighQualified ? (
                  <span className="text-[12px]">
                    {t("very-high-qualified")}
                  </span>
                ) : highlyQualified ? (
                  <span className="text-[12px]">{t("highly-qualified")}</span>
                ) : qualified ? (
                  <span className="text-[12px]">{t("qualified")}</span>
                ) : (
                  <span className="text-[12px]">{t("poorly-qualified")}</span>
                )}
                <div className="xs:w-[140px] sm:w-[140px] w-[200px] xs:h-[140px] sm:h-[140px] h-[140px] backface-hidden rounded-[10px] text-lr-dark flex-center border-[0.5px] border-solid border-grey500 border-lr-dark titles p-[6px] box-border lightBg dark:extraLightDarkBg">
                  {cand &&
                  setFileUrl((cand.avatars as Avatar[])[currentAvatarIndex]) ? (
                    <IoMdCamera className="text-[44px] dark:text-white" />
                  ) : (
                    <div className="dark:text-white">{setHiddenName(user)}</div>
                  )}
                </div>
              </div>
            )}
          </>
        </div>

        {shouldChangeImageAppear && <IoMdArrowDropright className="item" />}
      </div>
      {cand?.avatars && cand?.avatars?.length > 0 && (
        <h3 className="my-0 dark:text-white">{getName(user, shouldSee)}</h3>
      )}
      <div
        onMouseEnter={() => {
          const timerId = setTimeout(() => {
            if (!xs && !sm) {
              setFrontShouldTurnUp({ id: user?.id as string });
            }
          }, 300);
          setTimerId(timerId);
        }}
        className="px-[16px] mt-[6px] mb-[16px] mx-[16px] flex flex-col gap-[12px] items-center relative box-border bg-grey100 hover:bg-grey200 dark:extraLightDarkBg dark:hover:lightDarkBg border-[1px] border-solid border-blueGrey50"
        style={{ height: "40%" }}
      >
        <div className="absolute w-full h-full hidden flex-center">
          <span className="text-[8px] hidden group-hover:block dark:text-white group-hover:animate-ping">
            {t("return")}
          </span>
        </div>
        {hasTargetJob && (
          <div className="dark:text-white font-medium">
            {(cand.targetJob?.title as Translated)[language as "fr" | "en"]}
          </div>
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
                {exps && exps[0] && shouldSee ? (
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
                ) : exps && exps[0] ? (
                  <p className="dark:text-white">
                    {exps[0].job.title[language as "fr" | "en"]}
                  </p>
                ) : undefined}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : undefined;
}
