/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import CustomIcon from "@youmeet/components/CustomIcon";
import { CustomIconName } from "@youmeet/types/CustomIconProps";
import {
  GetOneProfileSharingDocument,
  Offer,
  Translated,
} from "@youmeet/gql/generated";
import { HiArrowUturnLeft } from "react-icons/hi2";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";
import { UserState } from "@youmeet/global-config/features/user";
import { RootState } from "@youmeet/global-config/store";
import { useSelector } from "react-redux";
import { client } from "@youmeet/gql/index";
import Link from "next/link";
import BoldText from "@youmeet/components/BoldText";
import { useTranslation } from "react-i18next";
import { BackCardType } from "@youmeet/types/BackCardProps";

const BackCardOffer = ({ offer, setFrontShouldTurnUp }: BackCardType) => {
  const user = useSelector((state: RootState) => state.user as UserState);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [alreadySharedProfile, setAlreadySharedProfile] = useState(false);
  const [justShared, setJustShared] = useState(false);

  // à revoir dans le resolver
  const checkSharing = async () => {
    if (offer?.company?.id) {
      const response = await client.query({
        query: GetOneProfileSharingDocument,
        variables: {
          data: {
            originId: user.id as string,
            targetId: offer?.company?.id as string,
          },
        },
        fetchPolicy: "no-cache",
      });
      const exists = response.data?.oneProfileSharing;
      if (exists) setAlreadySharedProfile(true);
    }
  };

  useEffect(() => {
    if (!alreadySharedProfile) checkSharing();
  }, []);

  return (
    <div
      className="absolute h-full w-full invisible group-hover:visible flex flex-col px-[16px] pt-[16px] dark:lightDarkBg bg-white gap-[6px] box-border overflow-hidden overflow-scroll"
      data-test="card-back"
    >
      <div className="relative w-full flex justify-between">
        {offer?.job && offer?.job?.title && (
          <div className="text-[20px] mt-[2px] mb-[6px] text-lr-dark dark:text-white">
            {(offer?.job?.title as Translated)[language as "fr" | "en"]}
          </div>
        )}
        <div className="flex-center gap-[12px]">
          <HiArrowUturnLeft
            className="cursor-pointer item hover:text-purple500 dark:text-white"
            onClick={() => {
              setFrontShouldTurnUp(false);
            }}
          />
        </div>
      </div>

      {offer?.content ? (
        <div className="flex-1 dark:mediumDarkBg border-[0.5px] border-solid border-blueGrey50">
          <div className="dark:text-white text-[12px] w-full flex justify-start m-[6px]">
            {t("offerContent")}
          </div>
          <div
            className="subItem text-justify font-normal w-full my-0 inline-block Nunito p-[12px] box-border"
            style={{ textRendering: "geometricPrecision" }}
          >
            <BoldText text={offer.content} align="justify" />
          </div>
        </div>
      ) : undefined}

      {offer?.profileSearched ? (
        <div className="flex-1 dark:mediumDarkBg border-[0.5px] border-solid border-blueGrey50">
          <div className="dark:text-white text-[12px] w-full flex justify-start m-[6px]">
            {t("profileSearched")}
          </div>
          <div
            className="subItem text-justify font-normal w-full my-0 inline-block Nunito p-[12px] box-border"
            style={{ textRendering: "geometricPrecision" }}
          >
            <BoldText text={offer.profileSearched} align="justify" />
          </div>
        </div>
      ) : undefined}

      <div className="flex justify-end items-center gap-[8px] my-[12px]">
        <TooltipedAsset asset={t("see-more-info")}>
          <Link href={`/offres/${(offer as Offer).slug}`}>
            <div>
              <CustomIcon onClick={() => {}} name={CustomIconName.file} />
            </div>
          </Link>
        </TooltipedAsset>
        {/* {offer?.company?.id ? (
          <TooltipedAsset
            asset={
              !user?.id
                ? t("should-be-connected")
                : user.id && user.videos.length === 0 && !user.cvFile
                ? t("video-cv-missing")
                : user.id && alreadySharedProfile
                ? t("already-shared-profile")
                : t("share-profile")
            }
          >
            <div>
              <CustomIcon
                disabled={
                  alreadySharedProfile ||
                  (user.videos.length === 0 && !user.cvFile)
                }
                onClick={async (e) => {
                  if (
                    user?.id &&
                    !alreadySharedProfile &&
                    user.videos.length > 0 &&
                    user.cvFile
                  ) {
                    e.stopPropagation();
                    const response = await client.mutate({
                      mutation: CreateProfileSharingDocument,
                      variables: {
                        data: {
                          originId: user.id as string,
                          targetId: offer?.company?.id as string,
                          offerTargetId: offer.id,
                        },
                      },
                    });
                    const created = response.data?.createProfileSharing;

                    if (created) {
                      setJustShared(true);
                      checkSharing();
                      setFrontShouldTurnUp({ id: user.id });
                    }
                  }
                }}
                name={CustomIconName.share}
              />
            </div>
          </TooltipedAsset>
        ) : undefined} */}
      </div>
    </div>
  );
};

export default BackCardOffer;
