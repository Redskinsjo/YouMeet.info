"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BetaCandidate, BetaUser } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import SelectField from "../../formulaire-profil/formComponents/fields/SelectField";
import DetailComponent from "../../DetailComponent";
import { HiPencil } from "react-icons/hi";
import { FieldValues, useForm } from "react-hook-form";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import TooltipedAsset from "../../TooltipedAsset";
import { onTargetJobUpdate } from "@youmeet/functions/actions";
import { Button, useMediaQuery } from "@mui/material";
import { setError } from "@youmeet/global-config/features/global";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";

const NewTargetJobComponent = ({ profil }: { profil: BetaUser }) => {
  const [isValidated, setIsValidated] = useState(true);
  const [candidateValidated, setCandidateValidated] = useState<
    BetaCandidate | undefined
  >();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { setValue, watch } = useForm<FieldValues>({
    values: { job: profil?.candidate?.targetJob?.id || "" },
  });
  const dispatch = useDispatch();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const lg = useMediaQuery("(max-width:1050px)");

  const customOnTargetJobUpdate = useCallback(
    async (extras: { userId: string; jobId: string }) => {
      const result = (await onTargetJobUpdate(extras)) as
        | PayloadBackendError
        | withData<BetaCandidate>;
      if (result && isPayloadError(result)) dispatch(setError("not-completed"));
      else if (!result?.data) dispatch(setError("not-completed"));
      else {
        setCandidateValidated((result as withData<BetaCandidate>).data);
        setIsValidated(true);
      }
    },
    []
  );

  useEffect(() => {
    if (profil?.candidate?.targetJob?.id) {
      setCandidateValidated(profil?.candidate);
    }
  }, [profil?.candidate]);

  return (
    <form
      action={customOnTargetJobUpdate.bind(null, {
        userId: profil.id as string,
        jobId: watch("job"),
      })}
    >
      {!isValidated ? (
        <div className="flex-bet gap-[12px]">
          <div className="w-full">
            <DetailComponent
              conversation={xs || sm || md || lg}
              fullWidth={xs || sm || md || lg}
              type="modal"
              noLabelColon
              noPadding
              account
              name="targetJob"
              labelNoWrap
              reversePlacement
              label={
                <h3 className="font-light subItem my-0 dark:text-grey300">
                  {t("say-us-which-job")}
                </h3>
              }
              value={
                <SelectField
                  name="job"
                  type="text"
                  placeholder={t("[experience]-job")}
                  location="job"
                  setValue={setValue}
                  watch={watch}
                  label={t("me-profile-infos-label-job")}
                  value={watch("job")}
                />
              }
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <TooltipedAsset asset={`${t("cancel")}`} placement="right">
              <div className="flex-center">
                <MdOutlineCancel
                  style={{ borderRadius: "100%" }}
                  className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 text-[25px] cursor-pointer"
                  onClick={() => setIsValidated(true)}
                />
              </div>
            </TooltipedAsset>
            <TooltipedAsset asset={`${t("validate")}`} placement="right">
              <div className="flex-center">
                <Button
                  className="bg-transparent border-0 w-fit min-w-0 p-0"
                  type="submit"
                >
                  <IoIosCheckmarkCircle
                    style={{ borderRadius: "100%" }}
                    className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 text-[25px] cursor-pointer"
                  />
                </Button>
              </div>
            </TooltipedAsset>
          </div>
        </div>
      ) : (
        <div>
          <DetailComponent
            type="modal"
            noLabelColon
            noPadding
            account
            name="targetJob"
            labelNoWrap
            reversePlacement
            label={
              <h3 className="font-light subItem my-0 dark:text-grey300">
                {t("me-profile-infos-label-job")}
              </h3>
            }
            value={
              <div className="flex-center gap-[12px]">
                {candidateValidated?.targetJob?.title ? (
                  <span className="dark:text-white">
                    {
                      candidateValidated?.targetJob?.title[
                        language as "fr" | "en"
                      ] as string
                    }
                  </span>
                ) : (
                  <span>-</span>
                )}

                <div className="flex-center">
                  <HiPencil
                    style={{ borderRadius: "100%" }}
                    className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 p-[4px] text-[18px] cursor-pointer"
                    onClick={() => setIsValidated(false)}
                  />
                </div>
              </div>
            }
          />
        </div>
      )}
    </form>
  );
};

export default NewTargetJobComponent;
