"use client";
import React, { useEffect, useState, useCallback } from "react";
import CandidateVideo from "./CandidateVideo";
import { FaAngleRight as Next, FaAngleLeft as Previous } from "react-icons/fa";
import { CustomModalProps } from "@youmeet/types/CustomModal";
import { Avatar, BetaUser, Video } from "@youmeet/gql/generated";
import { getPrincipalVideo } from "@youmeet/utils/basics/getPrincipalVideo";
import { useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { ModalState } from "@youmeet/global-config/features/modal";
import Link from "next/link";

export default function CandidateVideoComponent({ video }: CustomModalProps) {
  const modal = useSelector((state: RootState) => state.modal as ModalState);
  const users = modal.users;

  const [currentPosition, setCurrentPosition] = useState<number>(
    users?.findIndex((user) =>
      user.videos?.map((v) => v?.id).includes(video?.id)
    ) || 0
  );
  const [currentVideo, setCurrentVideo] = useState({} as Avatar);
  const [profil, setProfil] = useState<BetaUser>();

  const fetchPrincipalVideo = useCallback(async () => {
    if (video) {
      setCurrentVideo(video.file as Avatar);
    } else if (users && users[currentPosition]) {
      const principalVideo = getPrincipalVideo(
        users[currentPosition].videos as Video[]
      );
      if (principalVideo?.file) setCurrentVideo(principalVideo.file);
    }
  }, [users, currentPosition]);

  useEffect(() => {
    fetchPrincipalVideo();
    if (users) setProfil((users as any)[currentPosition]);
  }, [currentPosition, users]);

  const previous = users ? (users[currentPosition - 1] as BetaUser) : undefined;
  const next = users ? (users[currentPosition + 1] as BetaUser) : undefined;

  return (
    <div
      className="modal-container"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      <div className="flex-center gap-[12px]">
        <div className="flex-center" style={{ width: "44px" }}>
          {previous && previous.videos && previous.videos?.length > 0 ? (
            <Link
              className="w-[36px] h-[36px] cursor-pointer hover:bg-white group rounded-full bg-grey100 flex-center"
              href={`/videos/${
                getPrincipalVideo(previous.videos as Video[])?.id
              }`}
            >
              <Previous className="group-hover:text-purple700" />
            </Link>
          ) : undefined}
        </div>
        <CandidateVideo
          profil={profil}
          video={currentVideo}
          name={currentVideo?.original_filename as string}
          setCurrentPosition={setCurrentPosition}
          currentPosition={currentPosition}
          isCarousel
        />
        <div className="flex-center" style={{ width: "44px" }}>
          {next && next.videos && next.videos?.length > 0 ? (
            <Link
              className="w-[36px] h-[36px] cursor-pointer hover:bg-white group rounded-full bg-grey100 flex-center"
              href={`/videos/${getPrincipalVideo(next.videos as Video[])?.id}`}
            >
              <Next className="group-hover:text-purple700" />
            </Link>
          ) : undefined}
        </div>
      </div>

      {/* <div className="flex flex-col h-full box-border items-center bg-black">
        <div
          className="m-[6px] h-[100px] xs:h-fit sm:h-fit md:h-fit w-[100px] xs:w-fit sm:w-fit md:w-fit right-0 top-0 xs:top-0 sm:top-0 md:top-0 flex justify-center items-center cursor-pointer bg-black text-grey100 rounded-[14px] hover:bg-[rgba(202,202,202,1)] group"
          onClick={(e) => {
            e.stopPropagation();
            if (setDisplayModal) setDisplayModal(false);
          }}
        >
          <Close
            className="group-hover:text-purple700"
            style={{ fontSize: xs || sm || md ? 36 : 48 }}
          />
        </div>
      </div> */}
    </div>
  );
}
