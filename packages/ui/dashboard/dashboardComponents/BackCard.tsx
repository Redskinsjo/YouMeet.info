/* eslint-disable react/no-unescaped-entities */
import React, { createElement, useCallback, useEffect, useState } from "react";
import CustomIcon from "../../CustomIcon";
import { CustomIconName } from "@youmeet/types/CustomIconProps";
import {
  CreateFavoriteDocument,
  Favorite,
  Video,
} from "@youmeet/gql/generated";
import { Box } from "@mui/material";
import { HiArrowUturnLeft } from "react-icons/hi2";
import TooltipedAsset from "../../TooltipedAsset";
import { UserState } from "@youmeet/global-config/features/user";
import { RootState } from "@youmeet/global-config/store";
import { useDispatch, useSelector } from "react-redux";
import { getName } from "@youmeet/utils/setName";
import { client } from "@youmeet/gql/index";
import Link from "next/link";
import BoldText from "../../BoldText";
import { useTranslation } from "react-i18next";
import DetailComponent from "../../DetailComponent";
import { BackCardType } from "@youmeet/types/BackCardProps";
import { getUniversalFromCodeAndNumber } from "@youmeet/utils/formatPhone";
import { getLinkedinUrlFromId } from "@youmeet/utils/formatLinkedin";
import { FaLinkedin } from "react-icons/fa";
import { uri, uriCandidates } from "@youmeet/functions/imports";
import { CardTurnUp } from "@youmeet/types/Header";
import { getPrincipalVideo } from "@youmeet/utils/getPrincipalVideo";
import NoData from "../../NoData";
import { setModal } from "@youmeet/global-config/features/modal";

export default function BackCard({
  user,
  setFrontShouldTurnUp,
  isSubscribed,
  type,
  shouldSee,
  frontShouldTurnUp,
}: BackCardType) {
  const appUser = useSelector((state: RootState) => state.user as UserState);
  const [isFavorite, setIsFavorite] = useState<Favorite | undefined>(undefined);
  const [justFavorited, setJustFavorited] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const fetchFavorite = useCallback(async () => {
    if (appUser?.id && user?.id) {
      const favorite = user.unvolonteerFavorites?.find(
        (fav) => fav?.origin?.id === appUser.id
      );
      if (favorite) setIsFavorite(favorite);
    }
  }, [appUser, user]);

  const video = getPrincipalVideo(
    (user?.videos?.filter((v) => v) as Video[]) || undefined
  );

  useEffect(() => {
    if (shouldSee) fetchFavorite();
  }, [appUser, user]);

  useEffect(() => {
    if (justFavorited)
      setTimeout(() => {
        setJustFavorited(false);
      }, 2500);
  }, [justFavorited]);

  return justFavorited ? (
    <Box
      className={
        (frontShouldTurnUp as CardTurnUp).waiting
          ? "absolute h-full w-full visible visible flex flex-col p-[16px] gap-0 box-border overflow-hidden overflow-scrolld dark:darkBg"
          : "absolute h-full w-full visible group-hover:visible flex flex-col p-[16px] gap-0 box-border overflow-hidden overflow-scrolld dark:darkBg"
      }
      data-test="card-back"
    >
      <div className="relative h-full w-full flex-center z-50 bg-deepPurple100 box-border">
        <CustomIcon
          newStyles={{ fontSize: "96px" }}
          name={CustomIconName.like}
          onlyIcon
        />
      </div>
    </Box>
  ) : (
    <Box
      className={
        (frontShouldTurnUp as CardTurnUp).waiting
          ? "absolute h-full w-full visible flex flex-col px-[16px] pt-[16px] gap-0 box-border overflow-hidden overflow-scroll dark:darkBg"
          : "absolute h-full w-full invisible group-hover:visible flex flex-col px-[16px] pt-[16px] gap-0 box-border overflow-hidden overflow-scroll dark:darkBg"
      }
      data-test="card-back"
    >
      <div className="relative w-full flex justify-between">
        <Box className="text-[20px] mt-[2px] mb-[6px] text-lr-dark dark:text-white">
          {getName(user, shouldSee ? true : false)}
        </Box>
        <div className="flex-center gap-[12px] hover:animate-pulse">
          <HiArrowUturnLeft
            className="cursor-pointer item dark:text-white hover:text-purple700 dark:hover:text-purple100"
            onClick={() => {
              setFrontShouldTurnUp(false);
            }}
          />
          {isFavorite && shouldSee ? (
            <TooltipedAsset asset={"Est un favori"}>
              <div className="flex-center">
                <CustomIcon
                  newClasses="text-red600 dark:darkBg"
                  name={CustomIconName.like}
                  onlyIcon
                />
              </div>
            </TooltipedAsset>
          ) : undefined}
        </div>
      </div>

      {user?.description && shouldSee ? (
        <div className="flex-1">
          <div className="my-[18px] pb-0 rounded-lg">
            <div
              className="subItem max-h-[182px] overflow-scroll text-justify font-normal w-full my-0 inline-block Nunito p-[12px] box-border dark:extraLightDarkBg dark:text-white border-[1px] border-solid border-blueGrey50"
              style={{ textRendering: "geometricPrecision" }}
            >
              <BoldText text={user.description} align="justify" links />
            </div>
          </div>
        </div>
      ) : user?.description && !shouldSee ? (
        <span
          className="description-not-subscribed dark:extraLightDarkBg dark:text-white"
          style={{
            textRendering: "geometricPrecision",
          }}
        >
          {user.description.slice(0, 72)}...
        </span>
      ) : !shouldSee ? (
        <span className="m-[12px] p-[12px] italic text-grey500 legend dark:extraLightDarkBg dark:text-white">
          {t("unavailable")}
        </span>
      ) : !user?.description ? (
        <NoData name="description" />
      ) : undefined}

      <div className="flex-1" />
      {user?.languages &&
        user?.languages?.length !== 0 &&
        !user.hiddenFields?.includes("languages") && (
          <DetailComponent
            noPadding
            type="modal2"
            fontSize="14px"
            label={t("me-profile-infos-label-languages")}
            value={shouldSee ? user.languages.join(", ") : t("unavailable")}
            newStyles={{ boxSizing: "border-box" }}
          />
        )}
      {user?.details &&
        user?.details &&
        user?.details?.phone?.code &&
        user?.details?.phone?.number &&
        !user.hiddenFields?.includes("phone") && (
          <DetailComponent
            noPadding
            type="modal2"
            fontSize="14px"
            label={t("me-profile-infos-label-phone")}
            value={
              shouldSee
                ? getUniversalFromCodeAndNumber(
                    user?.details?.phone?.code,
                    user?.details?.phone?.number
                  )
                : t("unavailable")
            }
            newStyles={{ boxSizing: "border-box" }}
          />
        )}
      {user?.email && !user.hiddenFields?.includes("email") && (
        <DetailComponent
          noPadding
          type="modal2"
          fontSize="14px"
          label={t("me-profile-infos-label-email")}
          value={shouldSee ? user.email : t("unavailable")}
          newStyles={{ boxSizing: "border-box" }}
        />
      )}
      {user?.linkedinProfileId && !user.hiddenFields?.includes("linkedin") && (
        <DetailComponent
          noPadding
          type="modal2"
          fontSize="14px"
          label={t("linkedin")}
          value={
            shouldSee ? (
              <Link
                href={getLinkedinUrlFromId(user?.linkedinProfileId)}
                target="_blank"
                className="flex-center text-blue600 dark:text-blue200"
              >
                {createElement(FaLinkedin)}
              </Link>
            ) : (
              t("unavailable")
            )
          }
          newStyles={{ boxSizing: "border-box" }}
        />
      )}

      <div className="flex justify-end items-center gap-[8px] my-[12px]">
        {type === "candidates" && shouldSee ? (
          <TooltipedAsset asset={t("share-profile-short")}>
            <div>
              <CustomIcon
                onClick={async () => {
                  navigator.clipboard.writeText(
                    `${uriCandidates}/${user?.uniqueName}`
                  );
                  dispatch(setModal({ display: "shareProfile" }));
                }}
                name={CustomIconName.share}
              />
            </div>
          </TooltipedAsset>
        ) : !isFavorite && type === "candidates" ? (
          <TooltipedAsset asset={t("share-profile-short")}>
            <div className={!shouldSee ? "cursor-not-allowed" : ""}>
              <CustomIcon
                onClick={async () => {}}
                disabled={!shouldSee}
                name={CustomIconName.share}
              />
            </div>
          </TooltipedAsset>
        ) : undefined}
        {type === "candidates" && !isFavorite && shouldSee ? (
          <TooltipedAsset asset={t("set-favorite")}>
            <div>
              <CustomIcon
                onClick={async (e: any) => {
                  e.stopPropagation();
                  const response = await client.mutate({
                    mutation: CreateFavoriteDocument,
                    variables: {
                      originId: appUser.id as string,
                      targetId: user?.id as string,
                    },
                  });
                  const favorite = response.data?.createFavorite;

                  if (favorite) {
                    setJustFavorited(true);
                    if (isSubscribed) fetchFavorite();
                    setFrontShouldTurnUp({ id: user?.id as string });
                  }
                }}
                name={CustomIconName.like}
              />
            </div>
          </TooltipedAsset>
        ) : !isFavorite && type === "candidates" ? (
          <TooltipedAsset asset={t("set-favorite")}>
            <div className={!shouldSee ? "cursor-not-allowed" : ""}>
              <CustomIcon
                onClick={async () => {}}
                disabled={!shouldSee}
                name={CustomIconName.like}
              />
            </div>
          </TooltipedAsset>
        ) : undefined}
        {!!video && (
          <TooltipedAsset asset={t("see-more-info")}>
            {shouldSee ? (
              <div>
                <Link
                  href={`${uri}/profils/${user?.uniqueName}`}
                  target="_blank"
                  prefetch={false}
                >
                  <CustomIcon onClick={() => {}} name={CustomIconName.file} />
                </Link>
              </div>
            ) : (
              <div className="cursor-not-allowed">
                <CustomIcon
                  disabled={!shouldSee}
                  onClick={() => {}}
                  name={CustomIconName.file}
                />
              </div>
            )}
          </TooltipedAsset>
        )}
      </div>
    </Box>
  );
}
