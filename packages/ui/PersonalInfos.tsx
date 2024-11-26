"use client";
import { Suspense, useState } from "react";
import isProfileEmpty from "@youmeet/utils/basics/isProfileEmpty";
import { BetaDetails, BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";

const TogglePersonalInfo = dynamic(() => import("./TogglePersonalInfo"), {
  ssr: false,
  loading: () => (
    <div className="flex-center w-full border-[0.5px] border-solid border-grey300 h-[55px]">
      <Skeleton width={"50%"} height={18} />
    </div>
  ),
});

const NewProfileComponent = dynamic(() => import("./NewProfileComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[140px] p-[6px] border-[0.5px] border-solid border-grey300">
      <div className="flex-bet">
        <Skeleton width={60} height={18} />
        <Skeleton width={48} height={18} />
      </div>
      <div className="flex-bet">
        <Skeleton width={48} height={18} />
        <Skeleton width={60} height={18} />
      </div>
      <div className="flex-bet">
        <Skeleton width={60} height={18} />
        <Skeleton width={120} height={18} />
      </div>
      <div className="flex-bet">
        <Skeleton width={48} height={18} />
        <Skeleton width={48} height={18} />
      </div>
      <div className="flex-bet">
        <Skeleton width={48} height={18} />
        <Skeleton width={48} height={18} />
      </div>
      <div className="flex-bet">
        <Skeleton width={48} height={18} />
        <Skeleton width={96} height={18} />
      </div>
    </div>
  ),
});
const ProfileDescription = dynamic(() => import("./ProfileDescription"), {
  ssr: false,
  loading: () => (
    <div className="h-max p-[24px] border-[0.5px] border-solid border-grey300 flex-center flex-col">
      <div className="flex-center justify-end w-full mb-[24px]">
        <Skeleton width={"60%"} height={24} />
      </div>
      <div className="flex-center justify-end w-full mb-[12px]">
        <Skeleton width={"80%"} height={16} />
      </div>
      <div className="flex flex-col gap-[12px] w-full">
        <div className="rounded-xl border-[1px] border-solid border-grey100 w-full px-[12px] box-border">
          <div className="flex my-[6px] gap-[12px]">
            <Skeleton width={"40%"} height={16} />
            <Skeleton width={"20%"} height={16} />
          </div>
          <div>
            <div className="flex-bet my-[6px] gap-[12px]">
              <Skeleton width={"20%"} height={12} />
              <Skeleton width={"20%"} height={12} />
            </div>
            <div className="flex-bet my-[6px] gap-[12px]">
              <Skeleton width={"20%"} height={14} />
              <Skeleton width={16} height={20} />
            </div>
          </div>
        </div>
        <div className="rounded-xl border-[1px] border-solid border-grey100 w-full px-[12px] box-border">
          <div className="flex my-[6px] gap-[12px]">
            <Skeleton width={"40%"} height={16} />
            <Skeleton width={"20%"} height={16} />
          </div>
        </div>
        <div className="rounded-xl border-[1px] border-solid border-grey100 w-full px-[12px] box-border">
          <div className="flex my-[6px] gap-[12px]">
            <Skeleton width={"40%"} height={16} />
            <Skeleton width={"20%"} height={16} />
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function PersonalInfos({
  profil,
  details,
  account,
}: {
  profil?: BetaUser;
  details?: BetaDetails;
  account?: boolean;
}) {
  const [personalInfo, setPersonalInfo] = useState<boolean>(false);
  return (
    <>
      <TogglePersonalInfo setPersonalInfo={setPersonalInfo} />

      {!!personalInfo && !!profil && !isProfileEmpty(profil) ? (
        <Suspense>
          <NewProfileComponent
            details={details as BetaDetails}
            profil={profil}
            account={account}
          />
        </Suspense>
      ) : undefined}

      {!!personalInfo &&
        !!profil?.description &&
        !profil?.hiddenFields?.includes("description") && (
          <Suspense>
            <ProfileDescription profil={profil} account={account} />
          </Suspense>
        )}
    </>
  );
}
