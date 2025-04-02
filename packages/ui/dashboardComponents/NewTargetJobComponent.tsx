import { useCallback, useEffect, useRef, useState } from "react";
import { BetaCandidate, BetaUser } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import SelectField from "../formComponents/fields/SelectField";
import DetailComponent from "../DetailComponent";
import { HiPencil } from "react-icons/hi";
import { FieldValues, useForm } from "react-hook-form";
import { useMediaQuery } from "@mui/material";
import { setError } from "@youmeet/global-config/features/global";
import { withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { uri } from "@youmeet/functions/imports";

const NewTargetJobComponent = ({
  profil,
  noWrap = true,
}: {
  profil: BetaUser;
  noWrap?: boolean;
}) => {
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

  const customOnTargetJobUpdate = async (extras: {
    userId: string;
    jobId: string;
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
  };

  useEffect(() => {
    if (profil?.candidate?.targetJob?.id) {
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
              name="targetJob"
              labelNoWrap={noWrap}
              reversePlacement
              label={
                <h3 className="font-light subItem my-0 text-grey700 dark:text-grey300">
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
                  fnc={() => {
                    customOnTargetJobUpdate({
                      userId: profil.id as string,
                      jobId: watch("job"),
                      dataType: "job",
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
            noLabelColon
            noPadding
            account
            name="targetJob"
            labelNoWrap={noWrap}
            reversePlacement
            label={
              <h3 className="font-light subItem my-0 text-grey700 dark:text-grey300">
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
