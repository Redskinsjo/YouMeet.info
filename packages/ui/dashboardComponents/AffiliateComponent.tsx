"use client";
import DetailComponent from "../DetailComponent";
import { BetaUser, Translated, Video } from "@youmeet/gql/generated";
import { getProfilePhone } from "@youmeet/utils/basics/formatPhone";
import { setName } from "@youmeet/utils/basics/setName";
import VideoComponent from "./VideoComponent";
import { useTranslation } from "react-i18next";
import { getPrincipalVideo } from "@youmeet/utils/basics/getPrincipalVideo";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { createElement } from "react";
import NoData from "../NoData";

export default function AffiliateComponent({ child }: { child: BetaUser }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const details = child?.details;
  const phone = details?.phone;
  const candidate = child?.candidate;
  const job = candidate?.targetJob;
  const jobTitle = job
    ? (job?.title as Translated)[language as "fr" | "en"]
    : "";
  const video = getPrincipalVideo(child.videos as Video[]);
  return (
    <div className="flex xs:flex-col sm:flex-col md2:flex-col gap-[6px] border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg">
      <div className="bg-grey50 dark:lightDarkBg p-[12px] flex flex-col flex-1 max-w-[400px]">
        {!!setName(child) && (
          <DetailComponent
            noPadding
            label={t("me-profile-infos-label-fullname")}
            value={setName(child)}
          />
        )}
        {!!child?.email && (
          <DetailComponent noPadding label={t("email")} value={child?.email} />
        )}
        {!!child?.linkedinProfileId && (
          <DetailComponent
            noPadding
            label={t("linkedin-profile-link")}
            value={
              <Link
                href={child?.linkedinProfileId}
                target="_blank"
                className="flex-center dark:text-blue300"
              >
                {createElement(FaLinkedin)}
              </Link>
            }
          />
        )}
        {!!phone?.code &&
          !!phone.number &&
          !!getProfilePhone(phone?.code, phone?.number) && (
            <DetailComponent
              noPadding
              label={t("phone")}
              value={getProfilePhone(phone?.code, phone?.number)}
            />
          )}
        {!!jobTitle && (
          <DetailComponent noPadding label={t("jobTitle")} value={jobTitle} />
        )}
      </div>
      {video ? (
        <VideoComponent
          profil={child}
          video={video}
          affiliated
          videoWidth="300px"
        />
      ) : (
        <div className="flex-1">
          <NoData name="video" />
        </div>
      )}
    </div>
  );
}
