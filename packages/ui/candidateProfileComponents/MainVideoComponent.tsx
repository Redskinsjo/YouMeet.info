"use client";
import {
  BetaUser,
  Meet,
  MutationUpdateVideoArgs,
  UpdateVideoDocument,
  Video,
} from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { getPrincipalVideo } from "@youmeet/utils/basics/getPrincipalVideo";
import { BiSolidLike } from "react-icons/bi";
import { TbMessageDots } from "react-icons/tb";
import TooltipedAsset from "../TooltipedAsset";
import { client } from "@youmeet/gql/index";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "@youmeet/global-config/features/global";
import { resetModal, setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import { Attr } from "@youmeet/types/attributes";
import { onTranscriptVideo, onAnalyzeVideo } from "@youmeet/functions/actions";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { Button } from "@mui/material";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import { useTranslation } from "react-i18next";
import DetailComponent from "../DetailComponent";
import BoldText from "../BoldText";
import { getSimpleUser } from "@youmeet/functions/request";
import { useRouter } from "next/navigation";

const NewVideoComponent = dynamic(() => import("../NewVideoComponent"));

export default function MainVideoComponent({
  profil,
  video,
  containerNewStyles,
  meet,
  featureAI = true,
}: {
  profil?: BetaUser;
  video?: Video;
  containerNewStyles?: Attr;
  meet?: Meet;
  featureAI?: boolean;
}) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user as UserState);
  const likeRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const router = useRouter();

  const principalVideo = useMemo(() => {
    if (video) return video;
    else if (profil?.videos)
      return getPrincipalVideo(profil?.videos.filter((d) => d) as Video[]);
    else if (meet?.meetCandidate?.videos)
      return getPrincipalVideo(
        meet?.meetCandidate?.videos.filter((d) => d) as Video[]
      );
  }, []);

  const customOnTranscriptVideo = useCallback(
    async (extras: { videoId: string }) => {
      dispatch(setModal({ display: "upload" }) as UnknownAction);
      if (!extras.videoId) dispatch(setError("requestNotCompleted"));
      else {
        const result = await onTranscriptVideo(extras.videoId);

        if (result && isPayloadError(result)) {
          dispatch(resetModal("ok") as UnknownAction);
          dispatch(setError("requestNotCompleted"));
        } else if (!result?.data) {
          dispatch(resetModal("ok") as UnknownAction);
          dispatch(setError("requestNotCompleted"));
        } else {
          dispatch(resetModal("ok") as UnknownAction);
          dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
        }
      }
    },
    []
  );

  const customOnAnalyzeVideo = useCallback(
    async (extras: { videoId: string }) => {
      dispatch(setModal({ display: "upload" }) as UnknownAction);
      if (!extras.videoId) dispatch(setError("requestNotCompleted"));
      else {
        const result = await onAnalyzeVideo(extras.videoId);

        if (result && isPayloadError(result)) {
          dispatch(resetModal("ok") as UnknownAction);
          dispatch(setError("requestNotCompleted"));
        } else if (!result?.data) {
          dispatch(resetModal("ok") as UnknownAction);
          dispatch(setError("requestNotCompleted"));
        } else {
          dispatch(resetModal("ok") as UnknownAction);
          dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
        }
      }
    },
    []
  );

  return (
    <main
      className="flex flex-col w-full gap-[12px] md2:flex-col flex-wrap content-start"
      style={containerNewStyles}
    >
      <div className="flex-1 w-full flex flex-col gap-[12px] h-fit">
        {principalVideo ? (
          <NewVideoComponent
            profil={profil}
            principalVideo={principalVideo}
            containerNewStyles={containerNewStyles}
          />
        ) : undefined}
        {!!principalVideo && (
          <div className="h-[44px] flex-bet bg-white border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg px-[6px]">
            <div />
            <div className="flex-center gap-[8px]">
              <TooltipedAsset asset={"Laisser un feedback"}>
                <div className="flex-center">
                  <TbMessageDots
                    className="text-[28px] dark:text-white cursor-pointer hover:text-deepPurple500"
                    onClick={() => {
                      const payload = {} as { user?: BetaUser; meet?: Meet };
                      if (profil) payload.user = profil;
                      else if (meet) payload.meet = meet;
                      dispatch(
                        setModal({
                          display: "feedback",
                          ...payload,
                        }) as UnknownAction
                      );
                    }}
                  />
                </div>
              </TooltipedAsset>
              <div
                ref={likeRef}
                className="dark:text-white hover:text-deepPurple500"
              >
                <BiSolidLike
                  className="text-[28px] cursor-pointer"
                  onClick={async (e) => {
                    const payload = {} as MutationUpdateVideoArgs["data"];
                    if (user.id && payload) payload.originId = user.id;
                    if (profil && payload) payload.targetId = profil.id;
                    else if (meet) {
                      const profil = (await getSimpleUser({
                        email: meet.meetCandidate?.email,
                      })) as BetaUser;
                      if (profil && payload) payload.targetId = profil.id;
                    }

                    const res = await client.mutate({
                      mutation: UpdateVideoDocument,
                      variables: {
                        data: {
                          likes: 1,
                          id: principalVideo.id,
                          ...payload,
                        },
                      },
                    });
                    const updated = res.data?.updateVideo;
                    if (updated) {
                      (likeRef.current as HTMLDivElement).classList.add(
                        "text-deepPurple300"
                      );
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {!!featureAI && (
        <div>
          {!principalVideo?.transcript && (
            <form
              action={customOnTranscriptVideo.bind(null, {
                videoId: principalVideo?.id || "",
              })}
              className="flex items-center p-[12px] gap-[12px]"
            >
              <Button type="submit">Transcrire vidéo</Button>
            </form>
          )}

          {!setFileUrl(principalVideo?.audio) && principalVideo?.transcript ? (
            <form
              action={customOnAnalyzeVideo.bind(null, {
                videoId: principalVideo?.id || "",
              })}
              className="flex items-center p-[12px] gap-[12px]"
            >
              <Button type="submit">Analyser IA</Button>
            </form>
          ) : principalVideo?.transcript ? (
            <div className="flex-bet gap-[12px] px-[12px]">
              <audio src={setFileUrl(principalVideo?.audio)} controls></audio>
              <DetailComponent
                label={t("relevancy")}
                type="modal2"
                value={principalVideo?.confidence.toFixed(2)}
              />
            </div>
          ) : undefined}

          {principalVideo?.report ? (
            <div className="p-[12px]">
              <BoldText text={principalVideo.report} />
            </div>
          ) : undefined}
        </div>
      )}
    </main>
  );
}
