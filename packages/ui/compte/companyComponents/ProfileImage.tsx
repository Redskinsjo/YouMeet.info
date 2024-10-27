import { BetaCompany } from "@youmeet/gql/generated";
import React from "react";
import Image from "next/image";
import { ImImage } from "react-icons/im";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";

export type ProfileImageTypes = {
  company: BetaCompany | null | undefined;
};

export default function ProfileImage({ company }: ProfileImageTypes) {
  return (
    <div className="flex flex-col items-center fadeIn gap-[3px]">
      {!!setFileUrl(company?.logo) ? (
        <div className="bg-white rounded-xl flex-center">
          <Image
            src={setFileUrl(company?.logo) as string}
            alt={"logo de l'entreprise recruteuse"}
            width={140}
            height={140}
            className="rounded-lg shadow-lg"
            style={{
              objectFit: "contain",
            }}
            quality={100}
          />
        </div>
      ) : (
        <ImImage size={140} className="dark:text-white" />
      )}
    </div>
  );
}
