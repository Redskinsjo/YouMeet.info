"use client";
import BoldText from "../../../BoldText";
import SubPartContainer from "../../../SubPartContainer";
import NewAddConversationTheme from "./NewAddConversationTheme";
import ConversationThemesComponent from "./ConversationThemesComponent";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "@youmeet/global-config/features/global";
import { resetModal, setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@youmeet/global-config/store";
import { UserState } from "@youmeet/global-config/features/user";
import { FieldValues, useForm } from "react-hook-form";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { BackendError } from "@youmeet/utils/basics/BackendErrorClass";
import { useRouter, useSearchParams } from "next/navigation";
import {
  onAddCustomisation,
  onAddQuestion,
  onAddQueue,
} from "@youmeet/functions/actions";
import { BetaUser } from "@youmeet/gql/generated";
import ConversationsInProgress from "./ConversationsInProgress";
import { setName } from "@youmeet/utils/basics/setName";
import { BACKEND_ERRORS, BACKEND_MESSAGES } from "@youmeet/types/api/backend";

const EmptyTheme = { type: "general", prefix: "", text: "" };

export default function ConversationComponent({
  profil,
}: {
  profil: BetaUser;
}) {
  const search = useSearchParams();
  const jobId = search.get("jobId") || profil.candidate?.targetJob?.id || "";
  const offerId = search.get("offerId");
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user as UserState);
  const {
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({ defaultValues: { themes: [] } });

  const isInProgressConversation = !!profil.recruiterQueues?.some(
    (qu) => qu?.status === "pending" || qu?.status === "in-progress"
  );

  const { t } = useTranslation();

  const customOnAddConversationTheme = useCallback(
    async (fieldValues: FieldValues) => {
      dispatch(setModal({ display: "upload" }) as UnknownAction);
      router.push("/message");
      try {
        const themes = fieldValues.themes;
        // const result = await onAddConversationTheme(themes, {
        //   targetId: profil.id || "",
        //   originId: user.id,
        //   jobId: jobId ?? (profil.candidate?.targetJob?.id || ""),
        //   offerId: offerId ?? "",
        //   companyName: user.company?.name ?? "",
        //   candidateName: setName(profil),
        // });

        const originId = user.id;
        const targetId = profil.id || "";
        const offerIdArg = offerId ?? "";
        const jobIdArg = jobId ?? (profil.candidate?.targetJob?.id || "");
        const companyName = user.company?.name ?? "";
        const candidateName = setName(profil);

        const result = await onAddCustomisation(originId, jobIdArg);

        if (result && isPayloadError(result)) {
          throw new BackendError(result.type, result.message);
        } else if (!result?.data) {
          throw new BackendError(
            BACKEND_ERRORS.PROCESSING,
            BACKEND_MESSAGES.PROCESSING
          );
        } else {
          const customisationId = result.data.id ?? "";

          for (let i = 0; i < themes.length; i++) {
            const result2 = await onAddQuestion(themes[i], {
              originId,
              candidateName,
              companyName,
              customisationId,
              jobId: jobIdArg,
            });

            if (result2 && isPayloadError(result2)) {
              throw new BackendError(result2.type, result2.message);
            } else if (!result2.data) {
              throw new BackendError(
                BACKEND_ERRORS.PROCESSING,
                BACKEND_MESSAGES.PROCESSING
              );
            } else {
              continue;
            }
          }

          const result3 = await onAddQueue({
            customisationId,
            jobId: jobIdArg,
            offerId: offerIdArg,
            originId,
            targetId,
          });

          if (result3 && isPayloadError(result3)) {
            throw new BackendError(result3.type, result3.message);
          } else if (!result3.data) {
            throw new BackendError(
              BACKEND_ERRORS.PROCESSING,
              BACKEND_MESSAGES.PROCESSING
            );
          } else {
            reset();
            localStorage.removeItem("themes");
            resetModal("ok");
            dispatch(
              setModal({ display: "backofficeConfirm" }) as UnknownAction
            );
            router.push("/message");
          }
        }

        // if (result && isPayloadError(result)) {
        //   throw new BackendError(result.type, result.message);
        // } else if (!result?.data) {
        //   throw new BackendError(
        //     BACKEND_ERRORS.PROCESSING,
        //     BACKEND_MESSAGES.PROCESSING
        //   );
        // } else {
        //   reset();
        //   localStorage.removeItem("themes");
        //   resetModal("ok");
        //   dispatch(setModal({ display: "backofficeConfirm" }) as UnknownAction);
        // }
      } catch (err: any) {
        resetModal("ok");
        dispatch(setError("requestNotCompleted"));
        router.push("/message");
      }
    },
    [watch("themes"), user.id, user.company?.name]
  );

  useEffect(() => {
    const localThemes = localStorage.getItem("themes");
    if (localThemes) {
      const parsedThemes = JSON.parse(localThemes);
      if (parsedThemes) setValue("themes", parsedThemes);
    }
    router.prefetch("/message");
  }, []);

  return (
    !!jobId &&
    !!offerId && (
      <div className="flex w-full gap-[12px] md2:flex-col flex-wrap content-start shadow-custom">
        <SubPartContainer radius="0px">
          <div className="flex flex-col gap-[12px] p-[12px]">
            <div className="w-full flex-center">
              <h3 className="my-0 text-center item dark:text-white text-black">
                {t("conversation")}
              </h3>
            </div>
            <div className="w-full flex-center">
              <BoldText
                text={t("conversation-text")}
                containerStyle={{ margin: "0px" }}
                align="left"
              />
            </div>
            <div className="border-[1px] border-solid border-white rounded-xl dark:mediumDarkBg rounded-xl">
              <form
                className="p-[6px] rounded-xl flex flex-col gap-[6px]"
                onSubmit={handleSubmit(customOnAddConversationTheme)}
              >
                <h3>{t("conversations-inprogress")}</h3>
                <ConversationsInProgress profil={profil} />
                <h3>{t("themes")}</h3>
                {isInProgressConversation ? (
                  <div className="w-full h-[120px] flex-center">
                    <BoldText
                      text={t("cannot-conversation-when-inprogress")}
                      containerStyle={{ width: "100%", textAlign: "center" }}
                    />
                  </div>
                ) : (
                  <ConversationThemesComponent
                    themes={watch("themes")}
                    errors={errors}
                    setValue={setValue}
                  />
                )}
                {!isInProgressConversation && (
                  <NewAddConversationTheme
                    addTheme={() => {
                      const newThemes = [...watch("themes"), EmptyTheme];
                      localStorage.setItem("themes", JSON.stringify(newThemes));
                      setValue("themes", newThemes);
                    }}
                    cancelThemes={() => {
                      localStorage.removeItem("themes");
                      setValue("themes", []);
                    }}
                    themesCount={watch("themes").length}
                  />
                )}
                {!isInProgressConversation && (
                  <BoldText text={t("validation-activate-conversation")} />
                )}
              </form>
            </div>
          </div>
        </SubPartContainer>
      </div>
    )
  );
}
