import { Button, useMediaQuery } from "@mui/material";
import {
  createElement,
  useState,
  useEffect,
  ReactElement,
  useCallback,
} from "react";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  companyFirstPartPages,
  offerFirstPartPages,
} from "@youmeet/components/formulaire-profil/formComponents/steps/FirstStep";
import { onCompanyForm, onOfferForm } from "@youmeet/functions/actions";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import {
  FormState,
  setLoading,
  setProfileStep,
} from "@youmeet/global-config/features/form";
import { FieldValues, useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import { StepContentProps } from "@youmeet/types/form/StepContent";
import { proExternallyHandleData } from "@youmeet/utils/handleProfileSubmit";
import { setError as setGlobalError } from "@youmeet/global-config/features/global";
import {
  OfferHandledData,
  ProFormHandledData,
} from "@youmeet/types/form/FormHandledData";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { submitFile } from "@youmeet/utils/submitFile";
import { createCompanyProfile } from "@youmeet/functions/request";
import { AvatarInput, BetaCompany, ProFormInput } from "@youmeet/gql/generated";
import { BackendError } from "@youmeet/utils/BackendErrorClass";
import {
  BACKEND_ERRORS,
  BACKEND_MESSAGES,
  PayloadBackendError,
  withData,
} from "@youmeet/types/api/backend";
import setFileUrl from "@youmeet/utils/setFileUrl";

export default function PageContent({
  defaultValues,
  category,
}: StepContentProps) {
  const user = useSelector((state: RootState) => state.user as UserState);
  const [transitioned, setTransitioned] = useState(false);
  const [last, setLast] = useState(false);
  const xs = useMediaQuery("(max-width:600px)");
  const { t } = useTranslation();
  const [pageIndex, setPageIndex] = useState(1);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = useSelector(
    (state: RootState) => (state.form as FormState).profileStep
  );
  const {
    watch,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    register,
    handleSubmit,
  } = useForm<FieldValues>({
    values: defaultValues,
  });

  const fields =
    category === "organisation" ? companyFirstPartPages : offerFirstPartPages;

  const currentField = fields[pageIndex - 1];
  const currentFieldName = currentField.props.name;
  const pages = { count: fields.length, index: pageIndex };

  const onNext = useCallback(() => {
    setTransitioned(true);
    clearErrors();
    setTimeout(() => {
      setPageIndex(pageIndex + 1 < fields.length + 1 ? pageIndex + 1 : 1);
      setTransitioned(false);
    }, 700);
  }, [setTransitioned, setPageIndex, pageIndex]);

  const onBack = useCallback(() => {
    setTransitioned(true);
    setTimeout(() => {
      setPageIndex(pageIndex - 1 > 0 ? pageIndex - 1 : 1);
      setTransitioned(false);
    }, 700);
  }, [setTransitioned, setPageIndex, pageIndex]);

  const customOnFormData = useCallback(
    async (fieldValues: FieldValues) => {
      dispatch(setLoading(true) as UnknownAction);

      try {
        const userId = user.id;
        const companyId = user.company?.id;

        if (!userId || !companyId) {
          setPageIndex(1);
          dispatch(setGlobalError("requestNotCompleted"));
          dispatch(setLoading(false) as UnknownAction);
          return;
        }
        const handledData = proExternallyHandleData(
          fieldValues,
          "organisation"
        ) as ProFormHandledData;

        const input = {
          name: handledData.name,
          location: handledData.location,
          linkedinProfilePage: handledData.linkedinProfilePage,
          resume: handledData.resume,
          userId,
        } as ProFormInput;

        const result = (await createCompanyProfile<BetaCompany>(
          {
            data: { ...input },
          },
          0,
          true
        )) as PayloadBackendError | withData<BetaCompany>;

        if (result && isPayloadError(result)) {
          throw new BackendError(result.type, result.message);
        } else {
          let files: { [key in "logo" & "video"]: File }[] = [];
          const logo = handledData.logo;
          const video = handledData.video;

          const uploadedList = {} as {
            logo?: AvatarInput;
            video?: AvatarInput;
          };
          if (logo?.size) files.push({ logo });
          else uploadedList.logo = logo as unknown as AvatarInput;
          if (video?.size) files.push({ video });
          else uploadedList.video = video as unknown as AvatarInput;

          for (let i = 0; i < files.length; i++) {
            const obj = files[i] as { logo?: File } & { video?: File };
            const file = (obj.logo as File) ?? (obj.video as File);

            const fileFormData = new FormData();
            fileFormData.append("file", file);

            const result2 = await submitFile(
              fileFormData,
              result?.data.id as string,
              obj.logo ? "logo" : "video"
            );

            if (result2 && isPayloadError(result2)) {
              throw new BackendError(result2.type, result2.message);
            } else {
              if (!!setFileUrl(result2)) {
                if (obj.logo) uploadedList.logo = result2;
                if (obj.video) uploadedList.video = result2;
              }
            }
          }

          const result3 = await onCompanyForm(
            { userId, companyId },
            uploadedList
          );

          if (result3 && isPayloadError(result3)) {
            throw new BackendError(result3.type, result3.message);
          } else {
            router.push(`/${result3.data}`);
          }
        }
      } catch (err: any) {
        setPageIndex(1);
        dispatch(setGlobalError("requestNotCompleted"));
      }

      dispatch(setLoading(false) as UnknownAction);
    },
    [user.id, user.company?.id]
  );

  const customOnOfferForm = useCallback(
    async (fieldValues: FieldValues) => {
      dispatch(setLoading(true) as UnknownAction);
      try {
        if (!user.company?.id) {
          throw new BackendError(
            BACKEND_ERRORS.MISSING_ARGUMENT,
            BACKEND_MESSAGES.MISSING_ARGUMENT
          );
        }
        const handledData = proExternallyHandleData(
          fieldValues,
          "offer"
        ) as OfferHandledData;

        const result = await onOfferForm(handledData, user.company.id);
        if (result && isPayloadError(result)) {
          throw new BackendError(result.type, result.message);
        } else {
          router.push(`/${result.data}`);
        }
      } catch (err: any) {
        setPageIndex(1);
        dispatch(setGlobalError("requestNotCompleted"));
      }
      dispatch(setLoading(false) as UnknownAction);
    },
    [user.company?.id]
  );

  useEffect(() => {
    if (pages) {
      setLast(pages.count === pages.index);
    }
    setLoading(false);
  }, [pages]);

  useEffect(() => {
    const query = searchParams;
    if (query.get("step"))
      dispatch(setProfileStep(Number(query.get("step")) as 1 | 2 | 3));
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex-center flex-col w-full my-[24px]">
        <form
          onSubmit={
            category === "offer"
              ? handleSubmit(customOnOfferForm)
              : handleSubmit(customOnFormData)
          }
          className={
            transitioned
              ? "slide_out relative w-full flex flex-col gap-[12px]"
              : "relative w-full flex flex-col gap-[12px]"
          }
        >
          <div className="rounded-[30px] w-full">
            <div className="w-full flex-center flex-col bg-grey100 border-[0.5px] border-solid border-grey300 dark:extraLightDarkBg rounded-xl p-[8px] box-border">
              {fields.map((field) => {
                const currentValue = watch(field.props.name);

                return createElement(
                  field.field as unknown as (props: any) => ReactElement,
                  {
                    key: field.props.id,
                    ...field.props,
                    type:
                      pageIndex === field.props.id
                        ? field.props.type
                        : "hidden",
                    value: currentValue,
                    step: step,
                    phonecode:
                      field.props.id === 4 ? watch("phonecode") : undefined,
                    errors,
                    setError,
                    clearErrors,
                    register,
                    setValue,
                    watch,
                    fromYouMeet: user.company?.name === "YouMeet",
                    category,
                  }
                );
              })}
            </div>
          </div>
          <div
            className={"flex gap-[12px] items-center justify-end h-[40px]"}
            style={{
              right: xs ? 0 : 48,
            }}
          >
            {pages?.index && pages.index > 1 ? (
              <TooltipedAsset placement="top" asset={t("form-come-back")}>
                <div className="flex-center">
                  <Button
                    disabled={transitioned}
                    onClick={() => {
                      if (onBack) onBack();
                    }}
                    className="h-full bg-purple900 hover:bg-purple500 text-white"
                  >
                    <FaArrowLeftLong className="text-[22px] cursor-pointer" />
                  </Button>
                </div>
              </TooltipedAsset>
            ) : undefined}

            <TooltipedAsset placement="top" asset={t("continue")}>
              <div>
                <Button
                  tabIndex={0}
                  disabled={
                    errors[currentFieldName] ||
                    transitioned ||
                    ((currentField.props.required ||
                      currentField.props.name === "logo") &&
                      !watch(currentFieldName))
                      ? true
                      : false
                  }
                  type={last ? "submit" : "button"}
                  onClick={
                    last
                      ? () => {}
                      : (e) => {
                          if (onNext) onNext();
                        }
                  }
                  className={
                    transitioned
                      ? "hidden"
                      : "bg-purple900 hover:bg-purple500 text-white subItem h-full"
                  }
                >
                  {last ? t("validate") : t("next")}
                </Button>
              </div>
            </TooltipedAsset>
          </div>
        </form>
      </div>
    </div>
  );
}
