"use client";
import SeeMore from "../_components/SeeMore";
import { Offer, Translated } from "@youmeet/gql/generated";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function FTCardOffer({
  el,
  length,
}: {
  el: Offer;
  length?: number;
}) {
  const router = useRouter();
  const params = useParams();
  const inView = !!params.offre;
  const {
    i18n: { language },
  } = useTranslation();
  const job = el?.job;
  const company = el?.company;
  const required = (title: string | null | undefined) =>
    title ? title[0].toUpperCase() + title?.slice(1) : undefined;

  // const listReqs = (
  //   list: (Competency | null)[] | (CompetenceFt | null)[] | undefined | null
  // ) => (list ? list.map((c: any) => required(c?.title || c?.libelle)) : []);
  // const requirements = listReqs(el?.requirements) || listReqs(el?.competences);

  const jobTitle =
    (job?.title && (job?.title as Translated)[language as "fr" | "en"]) ||
    el?.intitule;
  const title = jobTitle
    ?.split(" ")
    .map((w) => {
      if (w.length > 3) return w[0].toUpperCase() + w.slice(1).toLowerCase();
      else return w.toLowerCase();
    })
    .join(" ");
  const qualification = el.qualificationLibelle;
  const location = el?.location || el?.lieuTravail?.libelle;
  const contractType = el?.contractType || el?.typeContratLibelle;
  const slug = `/offres/${el?.slug}`;
  if (slug) router.prefetch(slug);
  const logo = useMemo(() => {
    let result;
    const str = setFileUrl(company?.logo) || el?.entreprise?.logo;
    let res;
    if (str) {
      res = fetch(str)
        .then((res) => {
          if (res && res.ok) result = str;
        })
        .catch((e) => e);
    }
    return result;
  }, []);
  const companyName = company?.name || el?.entreprise?.nom || el.companyName;

  const tools = el.outilsBureautiques;
  const workPeriod = el.dureeTravailLibelleConverti;
  const postsCount = el.nombrePostes;
  const exp = el.experienceLibelle;
  const permis = el.permis;

  const titleEl = (
    <div className="font-semibold text-[20px] xs:text-[16px] sm:text-[16px] break-words box-border underline-offset-2 leading-6">
      {title}
    </div>
  );

  const width =
    length && length > 1
      ? "w-[300px] xs:w-[49%] sm:w-[49%]"
      : "w-[300px] xs:w-full sm:w-full";

  const elClassName = `fadeIn bg-white p-[12px] box-border flex-bet flex-col gap-[24px] xs:gap-[12px] sm:gap-[12px] h-[300px] shadow-xl border-[0.5px] border-grey300 border-solid rounded-xl xs:overflow-hidden xs:overflow-y-scroll sm:overflow-hidden sm:overflow-y-scroll ${width}`;

  return (
    <div className={elClassName}>
      <div className="w-full p-[4px] flex flex-col gap-[3px]">
        {slug ? (
          <Link href={slug} className="text-deepPurple900">
            {titleEl}
          </Link>
        ) : (
          titleEl
        )}
        <div className="text-grey700 font-extralight text-[16px] xs:text-[13px] sm:text-[13px]">
          {qualification}
        </div>
      </div>

      <div className="w-full text-grey900 font-semilight text-[16px] xs:text-[13px] sm:text-[13px]">
        <div className="font-semibold">{location}</div>
        <div>
          <span className="font-extralight text-[13px] xs:text-[11px] sm:text-[11px]">
            Type:
          </span>
          <span className="px-[6px] text-[14px] xs:text-[12px] sm:text-[12px]">
            {contractType}
          </span>
        </div>
      </div>

      <div className="w-full flex-bet text-grey900 font-semilight text-[16px] xs:text-[13px] sm:text-[13px]">
        <div>
          <div>
            <span className="font-extralight text-[13px] xs:text-[11px] sm:text-[11px]">
              Exp:
            </span>
            <span className="px-[6px] text-[14px] xs:text-[12px] sm:text-[12px]">
              {exp}
            </span>
          </div>
          <div className="text-[14px] xs:text-[12px] sm:text-[12px]">
            {workPeriod}
          </div>
        </div>
        <div>
          <div>
            <span className="font-extralight text-[13px] xs:text-[11px] sm:text-[11px]">
              Nmb postes:
            </span>
            <span className="px-[6px] text-[14px] xs:text-[12px] sm:text-[12px]">
              {postsCount}
            </span>
          </div>
          <div>{tools?.map((t, i) => t && <span key={t + i}>{t}</span>)}</div>
          <div className="text-[14px] xs:text-[12px] sm:text-[12px]">
            {permis?.map(
              (p, i) =>
                p?.libelle && <span key={p.libelle + i}>{p.libelle}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex-bet w-full xs:flex-col-reverse sm:flex-col-reverse">
        <SeeMore el={el} />
        <div className="flex-center">
          {logo && <Image src={logo} alt="logo" width={40} height={40} />}
          <span className="text-[12px] xs:text-[13px] sm:text-[13px] text-center lightBg p-[1px]">
            {companyName}
          </span>
        </div>
      </div>
    </div>
  );
}
