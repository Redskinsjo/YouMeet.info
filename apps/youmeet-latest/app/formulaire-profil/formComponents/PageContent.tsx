import { Button, useMediaQuery } from "@mui/material";
import {
  createElement,
  useState,
  useEffect,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react";
import TooltipedAsset from "@youmeet/ui/TooltipedAsset";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong } from "react-icons/fa6";
import BoldText from "@youmeet/ui/BoldText";
import { onFormData } from "@youmeet/functions/actions";
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
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { setError as setAppError } from "@youmeet/global-config/features/global";
import { AvatarInput } from "@youmeet/gql/generated";
import { submitFile } from "@youmeet/utils/submitFile";
import { BackendError } from "@youmeet/utils/BackendErrorClass";
import { ProfileFormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import { dev } from "@youmeet/functions/imports";
import { createError } from "@youmeet/functions/request";
import { firstPartPages } from "@youmeet/ui/formulaire-profil/formComponents/steps/FirstStep";

export default function PageContent({
  defaultValues,
}: {
  defaultValues: Partial<ProfileFormDefaultValues> | undefined;
}) {
  const [transitioned, setTransitioned] = useState(false);
  const [last, setLast] = useState(false);
  const xs = useMediaQuery("(max-width:600px)");
  const md = useMediaQuery("(max-width:900px)");
  const { t } = useTranslation();
  const [pageIndex, setPageIndex] = useState(1);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const step = useSelector(
    (state: RootState) => (state.form as FormState).profileStep
  );
  const user = useSelector((state: RootState) => state.user as UserState);
  const {
    watch,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    values: defaultValues,
  });

  const currentField = firstPartPages[pageIndex - 1];
  const currentFieldName = currentField.props.name;
  const pages = { count: firstPartPages.length, index: pageIndex };

  const onNext = (setTransitioned: Dispatch<SetStateAction<boolean>>) => {
    setTransitioned(true);
    setTimeout(() => {
      setPageIndex(
        pageIndex + 1 < firstPartPages.length + 1 ? pageIndex + 1 : 1
      );
      setTransitioned(false);
    }, 700);
    setPageIndex(pageIndex + 1 < firstPartPages.length + 1 ? pageIndex + 1 : 1);
    setTransitioned(false);
  };
  const onBack = (setTransitioned: Dispatch<SetStateAction<boolean>>) => {
    setTransitioned(true);
    setTimeout(() => {
      setPageIndex(pageIndex - 1 > 0 ? pageIndex - 1 : 1);
      setTransitioned(false);
    }, 700);
    setPageIndex(pageIndex - 1 > 0 ? pageIndex - 1 : 1);
    setTransitioned(false);
  };

  const customOnFormData = async (
    extras: { userId: string },
    formData: FormData
  ) => {
    dispatch(setLoading(true) as UnknownAction);

    const uploadedList = [] as AvatarInput[];
    const files: File[] = [];

    const avatar = (formData.get("avatars") as File) || undefined;

    if (avatar?.size) files.push(avatar);

    try {
      for (let i = 0; i < files.length; i++) {
        const fileFormData = new FormData();
        fileFormData.append("file", files[i]);
        const result = await submitFile(fileFormData, extras.userId, "avatar");

        if (result && isPayloadError(result)) {
          throw new BackendError(result.type, result.message);
        } else uploadedList.push(result);
      }
    } catch (err: any) {
      await createError({
        data: {
          environment: dev ? "development" : "production",
          message: err.message,
          pro: false,
          query: "unknown",
          status: err.status,
          statusText: err.statusText ?? "",
          type: err.type,
        },
      });
      setPageIndex(1);
      if (err.type === 8) {
        dispatch(setAppError("fileTooLarge"));
      } else {
        dispatch(setAppError("not-completed"));
      }
      return;
    }

    const result = await onFormData(extras, formData, uploadedList);

    if (result && isPayloadError(result)) {
      setPageIndex(1);
      dispatch(setAppError("not-completed"));
      dispatch(setLoading(false));
    } else {
      router.push("/dashboard");
    }
    dispatch(setLoading(false) as UnknownAction);
  };

  useEffect(() => {
    if (pages) {
      setLast(pages.count === pages.index);
    }
    setLoading(false);
  }, [pages]);

  useEffect(() => {
    const query = searchParams;
    if (query.get("step")) {
      dispatch(setProfileStep(Number(query.get("step")) as 1 | 2 | 3));
    }
    router.prefetch("/dashboard");
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-center">
        {currentFieldName === "linkedinProfileId" ? (
          <>
            {!md && (
              <BoldText text={t("subscribe-linkedin-format")} align="left" />
            )}
            {md && (
              <BoldText text={t("subscribe-linkedin-copylink")} align="left" />
            )}
          </>
        ) : undefined}
      </div>
      <div className="h-full flex-center flex-col w-full my-[24px]">
        <form
          action={() => {
            customOnFormData.bind(null, { userId: user.id });
          }}
          className={
            transitioned
              ? "slide_out relative w-full flex flex-col gap-[12px]"
              : "relative w-full flex flex-col gap-[12px]"
          }
        >
          <div className="rounded-[30px] w-full">
            <div className="w-full flex-center flex-col bg-grey100 border-[0.5px] border-solid border-grey300 dark:extraLightDarkBg rounded-xl p-[8px] box-border">
              {firstPartPages.map((field) => {
                const currentField = firstPartPages[field.props.id - 1];
                const currentValue = watch(currentField.props.name);

                return createElement(
                  field.field as unknown as (props: any) => ReactElement,
                  {
                    key: field.props.id,
                    ...field.props,
                    type: pageIndex === field.props.id ? "text" : "hidden",
                    value: currentValue,
                    step: step,
                    errors,
                    clearErrors,
                    setError,
                    setValue,
                    phonecode:
                      field.props.id === 4 ? watch("phonecode") : undefined,
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
                    onClick={() => {
                      if (onBack) onBack(setTransitioned);
                    }}
                    className="h-full bg-purple900 hover:bg-purple500 text-white"
                  >
                    <FaArrowLeftLong className="text-[22px] cursor-pointer" />
                  </Button>
                </div>
              </TooltipedAsset>
            ) : undefined}

            <TooltipedAsset placement="top" asset={t("continue")}>
              <Button
                tabIndex={0}
                disabled={
                  errors[currentFieldName] ||
                  transitioned ||
                  (currentField.props.required && !watch(currentFieldName)) ||
                  (currentField.props.required &&
                    typeof watch(currentFieldName) === "object" &&
                    watch(currentFieldName).length === 0)
                    ? true
                    : false
                }
                type={last ? "submit" : "button"}
                onClick={
                  last
                    ? () => {}
                    : (e) => {
                        if (onNext) onNext(setTransitioned);
                      }
                }
                className={
                  transitioned
                    ? "hidden"
                    : "bg-purple900 hover:bg-purple500 text-white subItem"
                }
              >
                {last ? t("validate") : t("next")}
              </Button>
            </TooltipedAsset>
          </div>
        </form>
      </div>
    </div>
  );
}
