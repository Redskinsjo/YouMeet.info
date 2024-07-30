import { BetaCandidate, BetaCompany, BetaUser } from "@youmeet/gql/generated";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { AiOutlineEye } from "react-icons/ai";

export type ProfileImageTypes = {
  accountCandidate?: BetaCandidate | undefined;
  profil?: BetaUser | BetaCompany;
  setShouldSlider: Dispatch<SetStateAction<boolean>>;
};

const ProfileImage = ({
  accountCandidate,
  profil,
  setShouldSlider,
}: ProfileImageTypes) => {
  let eyeCondition;

  if (profil && "fullname" in profil) {
    eyeCondition =
      (accountCandidate &&
        accountCandidate.avatars &&
        accountCandidate?.avatars?.length > 0) ||
      (profil && profil.company && profil.company.logo)
        ? true
        : false;
    return (
      <div className="flex flex-col items-center fadeIn gap-[3px]">
        {eyeCondition ? (
          <AiOutlineEye
            className="public-profile-icon dark:text-deepPurple200 text-deepPurple700"
            onClick={() => setShouldSlider(true)}
          />
        ) : undefined}

        {profil && profil.picture ? (
          <Image
            src={profil.picture as string}
            alt={"principalAvatar"}
            width={140}
            height={140}
            className="rounded-lg shadow-lg"
            style={{
              objectFit: "cover",
            }}
            quality={100}
          />
        ) : (
          <div className="flex flex-col mt-[12px] items-center fadeIn gap-[3px] bg-white p-[3px] rounded-[3px]">
            <div
              className={
                "object-cover w-[140px] h-[140px] flex-center text-[72px] p-[9px] text-white bg-black"
              }
            >
              {profil && profil?.firstname
                ? profil?.firstname[0].toUpperCase()
                : "."}{" "}
              {profil && profil?.lastname
                ? profil?.lastname[0].toUpperCase()
                : "."}
            </div>
          </div>
        )}
      </div>
    );
  } else if (profil && "name" in profil) {
    // si la data est un BetaCompany pour /recruteurs/[id]

    return (
      <div className="flex flex-col items-center fadeIn gap-[3px]">
        {profil && profil.logo ? (
          <Image
            src={profil.logo?.url as string}
            alt={"principalAvatar"}
            width={140}
            height={140}
            className="rounded-lg shadow-lg"
            style={{
              objectFit: "cover",
            }}
            quality={100}
          />
        ) : undefined}
      </div>
    );
  }
  return undefined;
};

export default ProfileImage;
