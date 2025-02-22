"use client";
import { useCallback, useEffect, useState } from "react";
import { BetaCandidate, BetaUser } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import DetailComponent from "../DetailComponent";
import { HiPencil } from "react-icons/hi";
import { FieldValues, useForm } from "react-hook-form";
import ContractTypeField from "../formComponents/fields/ContractTypeField";
import { setError } from "@youmeet/global-config/features/global";
import { useMediaQuery } from "@mui/material";
import { withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { uri } from "@youmeet/functions/imports";

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
    defaultValues: {
      contractType: profil?.candidate?.targetContractType ?? "",
    },
  });
  const dispatch = useDispatch();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const lg = useMediaQuery("(max-width:1050px)");

  const customOnTargetContractTypeUpdate = useCallback(
    async (extras: {
      userId: string;
      contractType: string;
      dataType: "job" | "contractType";
    }) => {
      const response = await fetch(`${uri}/api/dashboard`, {
        method: "POST",
        body: JSON.stringify(extras),
      });
      const result = await response.json();

      if (result && isPayloadError(result)) {
        dispatch(setError("not-completed"));
      } else if (!result?.data) {
        dispatch(setError("not-completed"));
      } else {
        setCandidateValidated((result as withData<BetaCandidate>).data);
        setIsValidated(true);
      }
    },
    [watch("contractType")]
  );

  useEffect(() => {
    if (profil?.candidate?.targetContractType) {
      setCandidateValidated(profil?.candidate);
    }
  }, [profil?.candidate]);

  return (
    <form>
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
              name="contractType"
              reversePlacement
              label={
                <h3 className="font-light subItem my-0 text-grey700 dark:text-grey300">
                  {t("say-us-which-contract-type")}
                </h3>
              }
              value={
                <ContractTypeField
                  errors={errors}
                  value={watch("contractType")}
                  setValue={setValue}
                  required
                  name="contractType"
                  location="contractType"
                  label={t("contractType")}
                  type="text"
                  fnc={() => {
                    customOnTargetContractTypeUpdate({
                      userId: profil.id as string,
                      contractType: watch("contractType"),
                      dataType: "contractType",
                    });
                  }}
                />
              }
            />
          </div>
        </div>
      ) : (
        <div>
          <DetailComponent
            type="modal"
            noPadding
            account
            name="contractType"
            reversePlacement
            noLabelColon
            labelNoWrap
            label={
              <h3 className="font-light subItem my-0 text-grey700 dark:text-grey300">
                {t("contractType")}
              </h3>
            }
            value={
              <div className="flex-center gap-[12px]">
                {candidateValidated?.targetContractType ? (
                  <span className="dark:text-white">
                    {t(candidateValidated.targetContractType)}
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
