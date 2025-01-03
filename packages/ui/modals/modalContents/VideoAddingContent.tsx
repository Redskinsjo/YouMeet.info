"use client";

import { RootState } from "@youmeet/global-config/store";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "@youmeet/global-config/features/user";
import { useTranslation } from "react-i18next";
import DetailComponent from "../../DetailComponent";
import { UnknownAction } from "@reduxjs/toolkit";
import { CustomModalProps, trads } from "@youmeet/types/CustomModal";
import { useCallback, useEffect, useState } from "react";
import { getOffer } from "@youmeet/functions/request";
import { Offer, Video } from "@youmeet/gql/generated";
import { ModalState, setModal } from "@youmeet/global-config/features/modal";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { setError } from "@youmeet/global-config/features/global";
import { onApplying } from "@youmeet/functions/actions";
import { getPrincipalVideo } from "@youmeet/utils/basics/getPrincipalVideo";
import dynamic from "next/dynamic";
import AddVideo from "../../AddVideo";
import { FaCheckCircle } from "react-icons/fa";
import { deepPurple, green, grey } from "@mui/material/colors";
import NewAddCVComponent from "../../NewAddCVComponent";
import { Button, FormControlLabel, Switch } from "@mui/material";
import Link from "next/link";
import { modals } from "../modals";

const BoldText = dynamic(() => import("@youmeet/ui/TextChild"), { ssr: false });

export default function VideoAddingContent({
  type,
  cta,
  title,
  content,
}: CustomModalProps) {
  const user = useSelector(
    (state: RootState) => state?.user as unknown as UserState
  );
  const modal = useSelector((state: RootState) => state?.modal as ModalState);
  const dispatch = useDispatch();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [offer, setOffer] = useState<Offer | undefined>();
  const [checkAvailableVideos, setCheckAvailableVideos] = useState(false);
  const [chosenVideo, setChosenVideo] = useState<Video | undefined>();

  const fetchOffer = useCallback(async () => {
    if (modal.publicOffer?.id) {
      const off = (await getOffer<Offer>(
        { id: modal.publicOffer.id as string },
        0
      )) as Offer;
      if (off) setOffer(off);
    }
  }, [modal.publicOffer]);

  const customOnApplying = async (extras: {
    originId: string | undefined;
    targetId: string | undefined;
    videoId: string | undefined;
    offerTargetId: string | undefined;
  }) => {
    const result = await onApplying(extras);
    if (result && isPayloadError(result)) {
      dispatch(setError("not-completed"));
    } else {
      dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
    }
  };

  useEffect(() => {
    fetchOffer();
    if (user.videos) {
      const principalVideo = getPrincipalVideo(user.videos);
      setChosenVideo(principalVideo);
    }
  }, []);

  const alreadyApplied = !!offer?.sharings?.find(
    (sharing) => sharing?.origin?.id === user.id
  );

  const offerJobId = modal.publicOffer?.job?.id as string | undefined;
  const readyToApply =
    user.videos.length > 0 && user.cvFile && chosenVideo?.id && !alreadyApplied;

  const data = modals && type && modals[type] ? modals[type] : undefined;

  return (
    <div className="min-h-[50vh] overflow-y-scroll">
      <div className="xs:w-screen sm:w-screen h-full overflow-hidden overflow-y-scroll flex flex-col gap-[24px] box-border p-[12px] w-[600px]">
        <h3 className="text-purple900 sentences xs:my-0 sm:my-0 md:my-0">
          {data?.title && (
            <BoldText
              text={`${t(
                (title as string) ?? (data.title as trads)[language]
              )}`}
              align="center"
            />
          )}
        </h3>

        <div className="text-blueGrey700 dark:text-blueGrey200 xs:text-[22px] sm:text-[22px] md:text-[22px] text-[19px] text-justify indent-[24px]">
          {!readyToApply ? (
            <>
              {data?.content && (
                <BoldText
                  text={`${t(
                    (content as string) ?? (data.content as trads)[language]
                  )}`}
                  align="center"
                />
              )}
            </>
          ) : (
            <div className="flex items-center gap-[12px]">
              <BoldText
                text={`${t("profile-seems-ready")}`}
                containerStyle={{ margin: "0px" }}
                align="center"
              />
              <FaCheckCircle style={{ color: green[600] }} />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-[24px] h-full">
          <div className="w-full flex flex-col justify-between items-start gap-[12px] xs:gap-0 sm:gap-0">
            <DetailComponent
              label="video"
              conversation={!!checkAvailableVideos}
              labelInBold
              noPadding
              type="modal"
              value={
                <AddVideo
                  profil={user}
                  setCheckAvailableVideos={setCheckAvailableVideos}
                  checkAvailableVideos={checkAvailableVideos}
                  chosenVideo={chosenVideo}
                  offerJobId={offerJobId}
                  setChosenVideo={setChosenVideo}
                />
              }
            />
          </div>
          {!user.cvFile ? (
            <div className="w-full flex flex-col justify-between items-start gap-[12px] xs:gap-0 sm:gap-0">
              <DetailComponent
                labelInBold
                noPadding
                type="modal"
                label="cv"
                value={<NewAddCVComponent profil={user} />}
              />
            </div>
          ) : (
            <div className="w-full">
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
                        value={user.cvFile ? true : false}
                        checked={user.cvFile ? true : false}
                        sx={{
                          "& span .MuiSwitch-thumb": {
                            color: user.cvFile ? deepPurple[300] : grey[300],
                          },
                          "& .MuiSwitch-track": {
                            backgroundColor: `${
                              user.cvFile ? deepPurple[300] : grey[500]
                            } !important`,
                          },
                        }}
                      />
                    }
                    label={t("cv")}
                    labelPlacement="start"
                  />
                }
              />
            </div>
          )}
          {!!checkAvailableVideos && (
            <div className="w-full flex justify-end">
              <Button
                className="p-[3px] buttonMui"
                onClick={() => setCheckAvailableVideos(false)}
              >
                {t("back")}
              </Button>
            </div>
          )}
          <form
            className="w-full flex flex-col gap-[24px] pb-[36px]"
            action={customOnApplying.bind(null, {
              originId: user.id,
              targetId: offer?.company?.id ?? "",
              videoId:
                (chosenVideo?.id as string) ||
                (getPrincipalVideo(user.videos)?.id as string),
              offerTargetId: offer?.id as string,
            })}
          >
            <div>
              <BoldText
                text={`${t("video-mandatory-from-cgu")}`}
                containerStyle={{ margin: 0 }}
                fontSizeClass="leading-[1.5]"
              />
              <Link
                href={`/conditions-generales-utilisation`}
                className="text-deepPurple900 dark:text-deepPurple200"
              >
                <span>{t("cgu-initials")}</span>
              </Link>
            </div>
            <Button
              disabled={!readyToApply}
              className="subItem fadeIn"
              type="submit"
            >
              {data?.cta && (
                <BoldText
                  text={`${t(
                    (cta as string) ?? (data.cta as trads)[language]
                  )}`}
                  align="center"
                  containerStyle={{ margin: 0 }}
                />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
