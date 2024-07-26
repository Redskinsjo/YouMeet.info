"use client";
import { BetaUser, UpdateVideoDocument, Video } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPrincipalVideo } from "@youmeet/utils/getPrincipalVideo";
import { BiSolidLike } from "react-icons/bi";
import { TbMessageDots } from "react-icons/tb";
import TooltipedAsset from "../../TooltipedAsset";
import { client } from "@youmeet/gql/index";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "@youmeet/global-config/features/global";
import { setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import { useRouter } from "next/navigation";
import React from "react";

const NewPublicVideoComponent = dynamic(
  () => import("./NewPublicVideoComponent")
);

export default function VideoPartComponent({ profil }: { profil: BetaUser }) {
  const dispatch = useDispatch();
  const likeRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.user as UserState);
  const router = useRouter();

  const principalVideo = useMemo(() => {
    if (profil.videos)
      return getPrincipalVideo(profil.videos.filter((d) => d) as Video[]);
  }, []);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    router.prefetch("/se-connecter");
  }, []);

  return (
    !loading && (
      <div className="flex flex-col gap-[6px] flex-1">
        <main className="flex w-full gap-[12px] md2:flex-col flex-wrap content-start border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg">
          <div className="flex-1 w-full flex flex-col gap-[12px] h-fit">
            {principalVideo ? (
              <NewPublicVideoComponent
                profil={profil}
                principalVideo={principalVideo}
              />
            ) : undefined}
            {!!principalVideo && (
              <div className="h-[44px] flex-bet bg-white dark:extraLightDarkBg border-t-[0.5px] border-0 border-solid border-grey300 dark:border-grey900 px-[6px]">
                <div />
                <div className="flex-center gap-[8px]">
                  <TooltipedAsset asset={"Laisser un feedback"}>
                    <div className="flex-center">
                      <TbMessageDots
                        className="text-[28px] dark:text-white cursor-pointer hover:text-deepPurple500"
                        onClick={() => {
                          if (!profil) {
                            dispatch(setLogin(true) as UnknownAction);
                            return router.push("/se-connecter");
                          } else
                            dispatch(
                              setModal({
                                display: "feedback",
                                user: profil,
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
                        const res = await client.mutate({
                          mutation: UpdateVideoDocument,
                          variables: {
                            data: {
                              likes: 1,
                              id: principalVideo.id,
                              originId: user.id ?? undefined,
                              targetId: profil.id,
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
        </main>
      </div>
    )
  );
}
