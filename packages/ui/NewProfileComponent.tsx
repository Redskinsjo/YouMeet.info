import React, { createElement, useEffect, useMemo } from "react";
import { getProfilePhone } from "@youmeet/utils/basics/formatPhone";
import TooltipedAsset from "./TooltipedAsset";
import { HiPencil } from "react-icons/hi";
import { setUpCase } from "@youmeet/utils/resolvers/resolveFullname";
import {
  getLinkedinUrlFromId,
  linkedinIdRegex,
} from "@youmeet/utils/basics/formatLinkedin";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import DetailComponent from "./DetailComponent";
import { useRouter } from "next/navigation";
import { BetaDetails, BetaUser } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

export default function NewProfileComponent({
  profil,
  details,
  account,
}: {
  profil: BetaUser;
  details: BetaDetails;
  account?: boolean;
}) {
  const router = useRouter();
  const { t } = useTranslation();
  router.prefetch("/formulaire-profil?step=1");

  const linkedin = useMemo(() => {
    if (profil.linkedinProfileId) {
      if (linkedinIdRegex.test(profil?.linkedinProfileId || ""))
        return profil?.linkedinProfileId;
      else return getLinkedinUrlFromId(profil?.linkedinProfileId || "");
    }
    return "";
  }, [profil.linkedinProfileId]);

  return (
    <div className="infos-component">
      <>
        {!account ? (
          <div className="flex-1" />
        ) : (
          <div className="h-[24px] flex-center item">
            <TooltipedAsset asset={`${t("modify-perso-info")}.`}>
              <Button
                className="buttonMui"
                onClick={() => {
                  router.push("/formulaire-profil?step=1");
                }}
              >
                {t("modify-perso-info")}
                <HiPencil
                  style={{ borderRadius: "100%" }}
                  className="p-[4px] text-[18px] cursor-pointer"
                />
              </Button>
            </TooltipedAsset>
          </div>
        )}
        {(profil?.firstname || account) && (
          <DetailComponent
            profil={profil}
            noPadding
            name="firstname"
            account={account}
            type="modal"
            label={t("me-profile-infos-label-firstname")}
            value={
              profil?.firstname ? (
                setUpCase(profil?.firstname)
              ) : account ? (
                <span className="italic text-[14px] pr-[5px] font-extralight dark:text-grey300">
                  {"-"}
                </span>
              ) : (
                ""
              )
            }
          />
        )}
        {(profil?.lastname || account) && (
          <DetailComponent
            profil={profil}
            noPadding
            name="lastname"
            account={account}
            type="modal"
            label={t("me-profile-infos-label-lastname")}
            value={
              profil?.lastname ? (
                setUpCase(profil?.lastname)
              ) : account ? (
                <span className="italic text-[14px] pr-[5px] dark:text-grey300 font-extralight">
                  {"-"}
                </span>
              ) : (
                ""
              )
            }
          />
        )}
        {(profil?.email || account) && (
          <DetailComponent
            profil={profil}
            noPadding
            name="email"
            account={account}
            type="modal"
            label={t("email")}
            value={
              profil?.email ? (
                setUpCase(profil?.email)
              ) : account ? (
                <span className="italic text-[14px] pr-[5px] dark:text-grey300 font-extralight">
                  {"-"}
                </span>
              ) : (
                ""
              )
            }
          />
        )}
        {(profil?.languages || account) && (
          <DetailComponent
            profil={profil}
            noPadding
            name="languages"
            account={account}
            type="modal"
            label={t("me-profile-infos-label-languages")}
            value={
              profil.languages?.every((lang) => !!lang) &&
              profil.languages.length > 0 ? (
                profil?.languages.join(", ")
              ) : account ? (
                <span className="italic text-[14px] pr-[5px] dark:text-grey300 font-extralight">
                  {"-"}
                </span>
              ) : (
                ""
              )
            }
          />
        )}
        {(linkedin || account) && (
          <DetailComponent
            profil={profil}
            noPadding
            name="linkedin"
            account={account}
            type="modal"
            label={t("linkedin-profile-link")}
            value={
              linkedin ? (
                <Link
                  href={linkedin}
                  target="_blank"
                  className="flex-center dark:text-blue300"
                >
                  {createElement(FaLinkedin)}
                </Link>
              ) : account ? (
                <span className="italic text-[14px] pr-[5px] dark:text-grey300 font-extralight">
                  {"-"}
                </span>
              ) : (
                ""
              )
            }
          />
        )}
        {((details?.phone?.code && details?.phone.number) || account) && (
          <DetailComponent
            profil={profil}
            noPadding
            name="phone"
            account={account}
            type="modal"
            label={t("me-profile-infos-label-phone")}
            value={
              details?.phone?.code && details?.phone?.number ? (
                getProfilePhone(details.phone?.code, details.phone?.number)
              ) : account ? (
                <span className="italic text-[14px] pr-[5px] dark:text-grey300 font-extralight">
                  {"-"}
                </span>
              ) : (
                ""
              )
            }
          />
        )}
        {(profil?.age || account) && (
          <DetailComponent
            profil={profil}
            noPadding
            name="age"
            account={account}
            type="modal"
            label={t("me-profile-infos-label-age")}
            value={
              profil?.age ? (
                String(profil?.age)
              ) : account ? (
                <span className="italic text-[14px] pr-[5px] dark:text-grey300 font-extralight">
                  {"-"}
                </span>
              ) : (
                ""
              )
            }
          />
        )}
        {(profil?.candidate?.salaryExpected || account) && (
          <DetailComponent
            profil={profil}
            noPadding
            name="salaryExpected"
            account={account}
            type="modal"
            label={t("me-profile-infos-label-salary")}
            value={
              profil?.candidate?.salaryExpected ? (
                profil?.candidate?.salaryExpected
              ) : account ? (
                <span className="italic text-[14px] pr-[5px] dark:text-grey300 font-extralight">
                  {"-"}
                </span>
              ) : (
                ""
              )
            }
          />
        )}
      </>
    </div>
  );
}
