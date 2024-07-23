/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import CustomIcon from "@youmeet/components/CustomIcon";
import { CustomIconName } from "@youmeet/types/CustomIconProps";
import {
  CreateProfileSharingDocument,
  GetOneProfileSharingDocument,
} from "@youmeet/gql/generated";
import { Box, Skeleton } from "@mui/material";
import { blueGrey, deepPurple } from "@mui/material/colors";
import { HiArrowUturnLeft } from "react-icons/hi2";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { client } from "@youmeet/gql/index";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import { BackCardType } from "@youmeet/types/BackCardProps";
import BoldText from "@youmeet/components/BoldText";

const BackCard = ({ setFrontShouldTurnUp, company }: BackCardType) => {
  const [alreadySharedProfile, setAlreadySharedProfile] = useState(false);
  const [justShared, setJustShared] = useState(false);
  const [loader, setLoader] = useState(
    <div className="flex-center flex-col gap-[4px] h-full box-border">
      {[0, 1, 2, 3, 4, 5].map((line) => (
        <Skeleton
          key={line}
          className="fadeIn"
          animation="wave"
          variant="rounded"
          width="45%"
          height="10px"
          style={{
            margin: "0px 4px",
            gap: "4px",
            backgroundColor: deepPurple[50],
          }}
        />
      ))}
      <Skeleton
        className="fadeIn"
        animation="wave"
        variant="rounded"
        width="20%"
        height="8px"
        style={{
          margin: "0px 4px",
          gap: "4px",
          backgroundColor: deepPurple[50],
        }}
      />
    </div>
  );
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user as UserState);

  const checkSharing = async () => {
    if (company) {
      const response = await client.query({
        query: GetOneProfileSharingDocument,
        variables: {
          data: { originId: user.id as string, targetId: company.id as string },
        },
        fetchPolicy: "no-cache",
      });
      const exists = response.data?.oneProfileSharing;
      if (exists) setAlreadySharedProfile(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(
        <div className="w-full h-full flex-center legend italic text-grey500">
          {t("no-data")}
        </div>
      );
    }, 2000);
    if (!alreadySharedProfile) checkSharing();
  }, []);

  useEffect(() => {
    if (justShared) {
      setTimeout(() => {
        setJustShared(false);
      }, 2500);
      checkSharing();
    }
  }, [justShared]);

  return justShared ? (
    <Box
      className="absolute h-full w-full visible group-hover:visible flex flex-col p-[16px] gap-0 box-border overflow-hidden overflow-scroll"
      data-test="card-back"
    >
      <div className="relative h-full w-full flex-center z-50 bg-deepPurple100 box-border">
        <CustomIcon
          newStyles={{ fontSize: "96px" }}
          name={CustomIconName.share}
          onlyIcon
        />
      </div>
    </Box>
  ) : (
    <Box
      className="absolute h-full w-full invisible group-hover:visible flex flex-col px-[16px] pt-[16px] gap-0 box-border overflow-hidden overflow-scroll"
      data-test="card-back"
    >
      <div className="relative w-full flex justify-between">
        <Box className="text-[20px] mt-[2px] mb-[6px] text-lr-dark">
          {company?.name}
        </Box>
        <HiArrowUturnLeft
          className="cursor-pointer item hover:text-purple500"
          onClick={() => {
            setFrontShouldTurnUp(false);
          }}
        />
      </div>

      {company?.resume ? (
        <div className="flex-1">
          <div
            className="my-[18px] pb-0 rounded-lg"
            style={{
              backgroundColor: "#fcfff7",
              border: `1px solid ${blueGrey[50]}`,
            }}
          >
            <div
              className="subItem max-h-[192px] overflow-scroll text-justify font-normal w-full my-0 inline-block break-all Nunito p-[12px] box-border"
              style={{ textRendering: "geometricPrecision" }}
            >
              <BoldText text={company?.resume} align="justify" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex-1">{loader}</div>
      )}

      <div className="flex-1" />
      <div className="flex justify-end items-center gap-[8px] my-[12px]">
        <TooltipedAsset asset={t("see-more-info")}>
          <Link href={`/recruteurs/${(company as any).id}`} target="_blank">
            <div>
              <CustomIcon onClick={() => {}} name={CustomIconName.file} />
            </div>
          </Link>
        </TooltipedAsset>
        <TooltipedAsset
          asset={
            alreadySharedProfile
              ? t("already-shared-profile")
              : t("share-profile")
          }
        >
          <div>
            <CustomIcon
              disabled={alreadySharedProfile}
              onClick={async (e: any) => {
                if (company) {
                  e.stopPropagation();
                  const response = await client.mutate({
                    mutation: CreateProfileSharingDocument,
                    variables: {
                      data: {
                        originId: user.id as string,
                        targetId: company.id as string,
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
        {/* <TooltipedAsset
          asset={
            alreadySharedProfile && isSubscribed
              ? t("already-shared-profile")
              : t("share-profile")
          }
        >
          {isSubscribed ? (
            <div>
              <CustomIcon
                disabled={alreadySharedProfile}
                onClick={async (e) => {
                  if (company) {
                    e.stopPropagation();
                    const response = await client.mutate({
                      mutation: CreateProfileSharingDocument,
                      variables: {
                        data: {
                          originId: user.id as string,
                          targetId: company.id as string,
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
          ) : (
            <div className="cursor-not-allowed">
              <CustomIcon
                disabled={!isSubscribed}
                onClick={() => {}}
                name={CustomIconName.share}
              />
            </div>
          )}
        </TooltipedAsset> */}
      </div>
    </Box>
  );
};

export default BackCard;
