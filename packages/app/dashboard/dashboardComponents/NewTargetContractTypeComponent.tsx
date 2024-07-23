"use client";
import React, { useEffect, useState } from "react";
import { BetaCandidate, BetaUser } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import DetailComponent from "@youmeet/components/DetailComponent";
import { HiPencil } from "react-icons/hi";
import { FieldValues, useForm } from "react-hook-form";
import ContractTypeField from "@youmeet/app/formulaire-profil/formComponents/fields/ContractTypeField";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";
import { onTargetContractTypeUpdate } from "@youmeet/functions/actions";
import { setError } from "@youmeet/global-config/features/global";
import { Button, useMediaQuery } from "@mui/material";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { renderContractType } from "@youmeet/utils/renderContractType";

const NewTargetContractTypeComponent = ({ profil }: { profil: BetaUser }) => {
  const [isValidated, setIsValidated] = useState(true);
  const [candidateValidated, setCandidateValidated] = useState<
    BetaCandidate | undefined
  >();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    values: { targetContractType: profil?.candidate?.targetContractType ?? "" },
  });
  const dispatch = useDispatch();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const lg = useMediaQuery("(max-width:1050px)");

  const customOnTargetContractTypeUpdate = async (extras: {
    userId: string;
    contractType: string;
  }) => {
    const result = (await onTargetContractTypeUpdate(extras)) as
      | PayloadBackendError
      | withData<BetaCandidate>;

    if (result && isPayloadError(result)) dispatch(setError("not-completed"));
    else if (!result?.data) dispatch(setError("not-completed"));
    else {
      setCandidateValidated((result as withData<BetaCandidate>).data);
      setIsValidated(true);
    }
  };

  useEffect(() => {
    if (profil?.candidate?.targetContractType) {
      setCandidateValidated(profil?.candidate);
    }
  }, [profil?.candidate]);

  return (
    <form
      action={customOnTargetContractTypeUpdate.bind(null, {
        userId: profil.id as string,
        contractType: watch("targetContractType"),
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
              labelNoWrap
              name="targetContractType"
              reversePlacement
              label={
                <h3 className="font-light subItem my-0 dark:text-grey300">
                  {t("say-us-which-contract-type")}
                </h3>
              }
              value={
                <ContractTypeField
                  errors={errors}
                  value={watch("targetContractType")}
                  setValue={setValue}
                  required
                  name="contractType"
                  location="contractType"
                  label={t("contractType")}
                  type="text"
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
            noPadding
            account
            name="targetContractType"
            reversePlacement
            noLabelColon
            labelNoWrap
            label={
              <h3 className="font-light subItem my-0 dark:text-grey300">
                {t("contractType")}
              </h3>
            }
            value={
              <div className="flex-center gap-[12px]">
                {candidateValidated?.targetContractType ? (
                  <span className="dark:text-white">
                    {renderContractType(
                      candidateValidated.targetContractType,
                      language as "fr" | "en"
                    )}
                  </span>
                ) : (
                  <span className="dark:text-white">-</span>
                )}
                {isValidated ? (
                  <div className="flex-center">
                    <HiPencil
                      style={{ borderRadius: "100%" }}
                      className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 p-[4px] text-[18px] cursor-pointer"
                      onClick={() => setIsValidated(false)}
                    />
                  </div>
                ) : undefined}
              </div>
            }
          />
        </div>
      )}
    </form>
  );
};

export default NewTargetContractTypeComponent;
