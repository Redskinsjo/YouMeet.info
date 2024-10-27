"use client";
import DetailComponent from "@youmeet/ui/DetailComponent";
import Layout from "@youmeet/ui/Layout";
import { Meet, Translated, Video } from "@youmeet/gql/generated";
import { getLinkedinUrlFromId } from "@youmeet/utils/basics/formatLinkedin";
import { getUniversalFromCodeAndNumber } from "@youmeet/utils/basics/formatPhone";
import { setName } from "@youmeet/utils/basics/setName";
import Link from "next/link";
import { createElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaLinkedin } from "react-icons/fa";
import MainVideoComponent from "@youmeet/ui/profils/[candidateName]/candidateProfileComponents/MainVideoComponent";
import NewVideoComponent from "@youmeet/ui/NewVideoComponent";
import { getPrincipalVideo } from "@youmeet/utils/basics/getPrincipalVideo";
import { useMediaQuery } from "@mui/material";
import BoldText from "@youmeet/ui/BoldText";

export default function MeetChild({ meet }: { meet: Meet }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");

  const principalVideo = useMemo(() => {
    if (meet?.meetCandidate?.videos)
      return getPrincipalVideo(
        meet?.meetCandidate?.videos.filter((d) => d) as Video[]
      );
  }, []);

  const candidate = meet.meetCandidate;
  const recruiter = meet.meetRecruiter;

  const rPhone = recruiter?.phone;
  const cPhone = candidate?.phone;
  const rLinkedin = recruiter?.linkedinProfileId;
  const cLinkedin = candidate?.linkedinProfileId;
  return (
    <div className="flex flex-col gap-[24px]">
      <Layout newStyles={{ maxWidth: "1300px", width: "100%" }}>
        <div className="flex-bet p-[24px] gap-[24px] m-[24px] w-full xs:flex-col sm:flex-col">
          <div className="w-full flex-1 bg-grey50 rounded-[14px] h-full">
            <div>
              <h2 className="text-[20px] dark:text-grey300 font-bold mx-[12px]">
                <span className="font-normal">Bonjour</span>{" "}
                <span className="font-bold">{setName(recruiter)}</span>
              </h2>
              <BoldText text={t("only-you-can-see")} align="center" />
              {/* <DetailComponent
                noPadding={xs}
                label={t("me-profile-infos-label-fullname")}
                value={setName(recruiter)}
              />
              <DetailComponent
                noPadding={xs}
                label={t("me-profile-infos-label-email")}
                value={recruiter?.email as string}
              />
              <DetailComponent
                noPadding={xs}
                label={t("me-profile-infos-label-phone")}
                value={
                  rPhone?.code && rPhone.number ? (
                    getUniversalFromCodeAndNumber(rPhone?.code, rPhone?.number)
                  ) : (
                    <span className="italic text-[14px] pr-[5px] dark:text-grey300 font-extralight">
                      {"-"}
                    </span>
                  )
                }
              />
              <DetailComponent
                noPadding={xs}
                label={t("linkedin-profile-link")}
                value={
                  rLinkedin ? (
                    <Link
                      href={getLinkedinUrlFromId(rLinkedin)}
                      target="_blank"
                      className="flex-center dark:text-blue300"
                    >
                      {createElement(FaLinkedin)}
                    </Link>
                  ) : (
                    <span className="italic text-[14px] pr-[5px] dark:text-grey300 font-extralight">
                      {"-"}
                    </span>
                  )
                }
              /> */}
            </div>
          </div>
          <div className="w-full flex-1 bg-grey50 rounded-[14px] h-full">
            <h2 className="flex justify-end text-[20px] dark:text-grey300 font-bold mx-[12px]">
              Votre candidat
            </h2>
            <DetailComponent
              noPadding={xs}
              label={t("me-profile-infos-label-fullname")}
              value={setName(candidate)}
            />
            <DetailComponent
              noPadding={xs}
              label={t("me-profile-infos-label-email")}
              value={candidate?.email as string}
            />
            <DetailComponent
              noPadding={xs}
              label={t("me-profile-infos-label-phone")}
              value={
                cPhone?.code && cPhone.number ? (
                  getUniversalFromCodeAndNumber(cPhone?.code, cPhone?.number)
                ) : (
                  <span className="italic text-[14px] pr-[5px] dark:text-grey300 font-extralight">
                    {"-"}
                  </span>
                )
              }
            />
            <DetailComponent
              noPadding={xs}
              label={t("linkedin-profile-link")}
              value={
                cLinkedin ? (
                  <Link
                    href={getLinkedinUrlFromId(cLinkedin)}
                    target="_blank"
                    className="flex-center dark:text-blue300"
                  >
                    {createElement(FaLinkedin)}
                  </Link>
                ) : (
                  <span className="italic text-[14px] pr-[5px] dark:text-grey300 font-extralight">
                    {"-"}
                  </span>
                )
              }
            />
            <DetailComponent
              noPadding={xs}
              label={t("jobTitle")}
              value={
                (candidate?.job?.title as Translated)[
                  language as "fr" | "en"
                ] as string
              }
            />
          </div>
        </div>
      </Layout>
      <Layout newStyles={{ maxWidth: "1300px", width: "100%" }}>
        <div className="w-full">
          {candidate?.videos
            ?.filter((video) => video?.preview)
            .map((video) => (
              <NewVideoComponent
                key={video?.id}
                preview={true}
                principalVideo={video as Video}
              />
            ))}
        </div>
      </Layout>
      <Layout newStyles={{ maxWidth: "1300px", width: "100%" }}>
        <div className="w-full">
          <MainVideoComponent
            meet={meet}
            video={principalVideo}
            containerNewStyles={{ boxShadow: "none" }}
            featureAI={false}
          />
        </div>
      </Layout>
    </div>
  );
}
