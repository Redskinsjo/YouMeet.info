import { Avatar, BetaCandidate, BetaUser } from "@youmeet/gql/generated";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import { useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export type PublicProfileSliderTypes = {
  candidate?: BetaCandidate | undefined | null;
  setShouldSlider: Dispatch<SetStateAction<boolean>>;
  accountUser?: BetaUser;
  dark?: boolean;
};

const PublicProfileSlider = ({
  candidate,
  setShouldSlider,
  accountUser,
  dark,
}: PublicProfileSliderTypes) => {
  const [avatarPosition, setAvatarPosition] = useState<number>(0);
  const [everyAvatarsLength, setEveryAvatarsLength] = useState<number>(0);

  const displayedAvatars = useMemo(() => {
    const candidateAvatars: (Avatar & { user?: boolean; pro?: boolean })[] =
      candidate && candidate.avatars
        ? candidate.avatars.map((av) => ({ ...av, user: true }))
        : [];
    const companyLogo: (Avatar & { user?: boolean; pro?: boolean })[] =
      accountUser && accountUser.company && accountUser.company.logo
        ? [accountUser.company.logo].map((av) => ({ ...av, pro: true }))
        : [];

    setEveryAvatarsLength(candidateAvatars.concat(companyLogo).length);

    return candidateAvatars
      .concat(companyLogo)
      .slice(avatarPosition, avatarPosition + 1);
  }, [avatarPosition, candidate]);

  const avatars = useMemo(
    () =>
      displayedAvatars?.map((avatar, index, arr) => {
        const zValue = Math.abs(index - arr.length + 1) * 10;

        let ratio: number = 0;
        if (avatar?.width && avatar.height) {
          ratio = avatar.width / avatar.height;
        }

        return (
          avatar && (
            <Image
              key={avatar.url}
              src={setFileUrl(avatar) || ""}
              alt={"image" + index}
              width={220}
              height={!!ratio ? 240 / ratio : 260}
              className={`rounded-lg xs:h-[350px] sm:h-[350px] md:h-[350px]`}
              style={{
                objectFit: avatar?.user ? "cover" : "contain",
                left: 20 * index,
                top: 4 * index,
                zIndex: zValue,
                border: "1px solid black",
              }}
            />
          )
        );
      }),
    [displayedAvatars]
  );

  const maxImgContW = 200 * 2 + 10 * 2 + 50;
  return (
    <div className="flex flex-col items-center gap-[3px]">
      <AiOutlineEyeInvisible
        className="public-profile-icon dark:text-deepPurple200 text-deepPurple700"
        onClick={() => setShouldSlider(false)}
      />

      <div
        className={`flex-center w-full relative sm:w-[${maxImgContW}px] md:w-[${maxImgContW}px] lg:w-[${maxImgContW}px] xl:w-[${maxImgContW}px] overflow-hidden fadeIn`}
      >
        {displayedAvatars.length > 1 ? (
          <div className="w-[28px]">
            {displayedAvatars && avatarPosition !== 0 && (
              <FaAngleLeft
                className="public-profile-icon dark:text-deepPurple200 text-deepPurple700"
                onClick={() => setAvatarPosition(avatarPosition - 1)}
              />
            )}
          </div>
        ) : undefined}
        <div className="flex gap-[2px] xs:flex-col sm:flex-col md:flex-col">
          {avatars}
        </div>

        {displayedAvatars &&
          avatarPosition < displayedAvatars.length &&
          everyAvatarsLength > 1 && (
            <div className="w-[28px]">
              <FaAngleRight
                className="public-profile-icon dark:text-deepPurple200 text-deepPurple700"
                style={{ color: dark ? grey[500] : "initial" }}
                onClick={() => setAvatarPosition(avatarPosition + 1)}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default PublicProfileSlider;
