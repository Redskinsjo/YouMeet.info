import AddVideo from "../AddVideo";
import BoldText from "../BoldText";
import DetailComponent from "../DetailComponentContent";
import LoginModalClose from "../login/LoginModalClose";
import NewAddCVComponent from "../NewAddCVComponent";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { deepPurple, green, grey } from "@mui/material/colors";
import { UnknownAction } from "@reduxjs/toolkit";
import { onApplying } from "@youmeet/functions/actions";
import { getOffer } from "@youmeet/functions/request";
import { setError } from "@youmeet/global-config/features/global";
import { ModalState, setModal } from "@youmeet/global-config/features/modal";
import { UserState } from "@youmeet/global-config/features/user";
import { RootState } from "@youmeet/global-config/store";
import { Offer, Video } from "@youmeet/gql/generated";
import { CustomModalProps, trads } from "@youmeet/types/CustomModal";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { getPrincipalVideo } from "@youmeet/utils/basics/getPrincipalVideo";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";

export default function VideoAddingModal({
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
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
    if (user.videos) {
      const principalVideo = getPrincipalVideo(user.videos);
      setChosenVideo(principalVideo);
    }
  }, []);

  const offerJobId = modal.publicOffer?.job?.id as string | undefined;
  const readyToApply =
    user.videos.length > 0 &&
    user.cvFile &&
    offer?.company &&
    offer?.company.id &&
    chosenVideo?.id;

  const modals: any = undefined;

  return !loading ? (
    <ModalWrapper>
      <>
        <div className="w-full flex-center flex-col gap-[24px] box-border xs:px-[12px] sm:px-[12px] md:px-[12px]">
          <h3 className="text-purple900 sentences xs:my-0 sm:my-0 md:my-0">
            {modals && modals[type] && modals[type].title && (
              <BoldText
                text={`${t(
                  (title as string) ?? (modals[type].title as trads)[language]
                )}`}
              />
            )}
          </h3>

          <div className="text-blueGrey700 dark:text-blueGrey200 xs:text-[22px] sm:text-[22px] md:text-[22px] text-[19px] text-justify indent-[24px]">
            {!readyToApply ? (
              <>
                {modals && modals[type] && modals[type].content && (
                  <BoldText
                    text={`${t(
                      (content as string) ??
                        (modals[type].content as trads)[language]
                    )}`}
                  />
                )}
              </>
            ) : (
              <div className="flex items-center gap-[12px]">
                <BoldText
                  text={`${t("profile-seems-ready")}`}
                  containerStyle={{ margin: "0px" }}
                />
                <FaCheckCircle style={{ color: green[600] }} />
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-[24px]">
            <AddVideo
              profil={user}
              setCheckAvailableVideos={setCheckAvailableVideos}
              checkAvailableVideos={checkAvailableVideos}
              chosenVideo={chosenVideo}
              offerJobId={offerJobId}
              setChosenVideo={setChosenVideo}
            />

            {!checkAvailableVideos && !user.cvFile ? (
              <div className="w-full flex-center">
                <span className="text-black dark:text-white font-bold">
                  {t("cv")}
                </span>
                <NewAddCVComponent profil={user} />
              </div>
            ) : !checkAvailableVideos ? (
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
            ) : undefined}
          </div>
          {!checkAvailableVideos ? (
            <form
              className="w-full flex flex-col gap-[24px]"
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
                {modals && modals[type] && modals[type].cta && (
                  <BoldText
                    text={`${t(
                      (cta as string) ?? (modals[type].cta as trads)[language]
                    )}`}
                    containerStyle={{ margin: 0 }}
                  />
                )}
              </Button>
            </form>
          ) : (
            <Button
              onClick={() => {
                setCheckAvailableVideos(false);
              }}
              className="subItem fadeIn"
            >
              {t("back")}
            </Button>
          )}
        </div>
        <LoginModalClose />
      </>
    </ModalWrapper>
  ) : undefined;
}
