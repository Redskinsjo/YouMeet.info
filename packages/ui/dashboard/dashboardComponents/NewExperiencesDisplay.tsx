"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BetaExperience, BetaUser } from "@youmeet/gql/generated";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { MdContactPhone } from "react-icons/md";
import TooltipedAsset from "../../TooltipedAsset";
import { setModal } from "@youmeet/global-config/features/modal";
import { HiPencil } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import { UnknownAction } from "@reduxjs/toolkit";

const RawExperience = dynamic(() => import("../../RawExperience"));
const BoldText = dynamic(() => import("../../BoldText"));

const NewExperiencesDisplay = ({
  profil,
}: {
  profil: Partial<BetaUser> | undefined;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user as UserState);
  const [experiences, setExperiences] = useState(profil?.experiences);

  useEffect(() => {
    router.prefetch("/formulaire-profil?step=2");
    router.prefetch("/message");
  }, []);

  return (
    <div className="flex dark:darkBg lightBg flex-col gap-[12px] p-[12px] xs:p-[12px] sm:p-[12px] md:p-[12px] w-full rounded-[12px] box-border">
      <div className="flex flex-col gap-[12px]">
        <h3 className="font-light subItem my-0 dark:text-grey300">
          {t("experiences")}
        </h3>

        <div className="h-[24px] flex-bet item">
          {user.consent && experiences && experiences.length > 0 ? (
            <BoldText
              text={t("account-after-consent")}
              containerStyle={{
                margin: "0px",
                fontSize: "16px",
              }}
              align="justify"
            />
          ) : (
            <div className="flex-1"></div>
          )}
          <TooltipedAsset asset={`${t("modify-perso-info")}.`}>
            <div className="flex-center">
              <HiPencil
                style={{ borderRadius: "100%" }}
                className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 p-[4px] text-[24px] cursor-pointer"
                onClick={() => {
                  router.push("/formulaire-profil?step=2");
                }}
              />
            </div>
          </TooltipedAsset>
        </div>

        {/* {experiences && experiences?.length > 0 && (
          <BoldText
            text={t("account-experiences-text")}
            fontSizeClass=""
            containerStyle={{ margin: 0 }}
            align="justify"
          />
        )} */}

        <div className="flex flex-col">
          {experiences && experiences.length > 0 ? (
            experiences?.map(
              (
                exp: BetaExperience | null | undefined,
                index: number,
                array: (BetaExperience | null | undefined)[]
              ) =>
                exp ? (
                  <div
                    key={exp.id}
                    className="flex-center gap-[6px] xs:flex-col-reverse xs:my-[6px]"
                  >
                    <RawExperience
                      exp={exp as BetaExperience}
                      index={index}
                      array={array as BetaExperience[]}
                    />
                    <TooltipedAsset asset={t("add-ref-contact")}>
                      <div
                        className="h-full flex-center cursor-pointer"
                        onClick={() => {
                          dispatch(
                            setModal({
                              display: "account",
                              experience: exp,
                            }) as UnknownAction
                          );
                          router.push("/message");
                        }}
                      >
                        <div
                          className={
                            "rounded-lg flex-center p-[4px] dark:bg-white dark:hover:bg-grey300 bg-black text-white hover:bg-white hover:text-black"
                          }
                        >
                          <MdContactPhone />
                        </div>
                      </div>
                    </TooltipedAsset>
                  </div>
                ) : undefined
            )
          ) : (
            <div
              className="w-full flex-center legend italic dark:text-white"
              style={{
                textRendering: "geometricPrecision",
              }}
            >
              {t("no-experience")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewExperiencesDisplay;
