"use client";
import {
  onAnswerConversation,
  onConversationEngagement,
} from "@youmeet/functions/actions";
import BoldText from "@youmeet/components/BoldText";
import DetailComponent from "@youmeet/components/DetailComponent";
import Logo from "@youmeet/components/Logo";
import {
  BetaQueue,
  BetaWhatsappExchange,
  BetaWhatsappThread,
} from "@youmeet/gql/generated";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import {
  Dispatch,
  SetStateAction,
  createElement,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button, useMediaQuery } from "@mui/material";
import DisplayedExchange from "@youmeet/app/dashboard/conversations/conversationComponents/DisplayedExchange";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";
import { FaArrowLeftLong } from "react-icons/fa6";
import { resetModal, setModal } from "@youmeet/global-config/features/modal";
import { UnknownAction } from "@reduxjs/toolkit";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function ConversationChild({ queue }: { queue: BetaQueue }) {
  const [loading, setLoading] = useState(true);
  const [thread, setThread] = useState<BetaWhatsappThread | undefined>();
  const [pageIndex, setPageIndex] = useState(1);
  const { t } = useTranslation();
  const [last, setLast] = useState(false);
  const pages = { count: (thread?.exchanges ?? []).length, index: pageIndex };
  const xs = useMediaQuery("(max-width:600px)");
  const [transitioned, setTransitioned] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { watch, setValue, reset } = useForm<FieldValues>({
    values: {
      "exchange-0": "",
      "exchange-1": "",
      "exchange-2": "",
      "exchange-3": "",
      "exchange-4": "",
    },
  });

  const customOnConversationEngagement = async () => {
    setLoading(true);
    if (queue.id) {
      const result = await onConversationEngagement(queue.id);

      if (result && !isPayloadError(result)) {
        setThread(result.data);
      }
    }
    setLoading(false);
  };

  const customOnAnswerConversation = async (extras: {
    exchanges: BetaWhatsappExchange[];
  }) => {
    dispatch(setModal({ display: "upload" }) as UnknownAction);
    const result = await onAnswerConversation(
      watch(),
      extras.exchanges,
      queue.target?.id ?? "",
      thread?.id ?? ""
    );
    if (!result?.data || isPayloadError(result)) {
      dispatch(resetModal("ok") as UnknownAction);
      dispatch(
        setModal({
          display: "not-completed",
          message: result.message,
        }) as UnknownAction
      );
    } else {
      reset();
      dispatch(resetModal("ok") as UnknownAction);

      router.push("/dashboard");
    }
  };

  const onNext = (setTransitioned: Dispatch<SetStateAction<boolean>>) => {
    setTransitioned(true);
    setTimeout(() => {
      setPageIndex(
        pageIndex + 1 < (thread?.exchanges ?? []).length + 1 ? pageIndex + 1 : 1
      );
      setTransitioned(false);
    }, 700);
    setPageIndex(
      pageIndex + 1 < (thread?.exchanges ?? []).length + 1 ? pageIndex + 1 : 1
    );
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

  useEffect(() => {
    customOnConversationEngagement();
    router.prefetch("/dashboard");
  }, []);

  useEffect(() => {
    if (pages) {
      setLast(pages.count === pages.index);
    }
    setLoading(false);
  }, [pages]);

  return (
    <div className="overflow-hidden min-h-screen">
      {loading ? (
        <div className="w-full h-[120px] flex-center flex-col text-red:600">
          <Logo gif />
        </div>
      ) : !thread || thread.exchanges?.length === 0 ? (
        <div className="w-full h-[120px] flex-center flex-col text-red:600">
          <Logo />
          <BoldText text={t("conversation-not-available")} align="center" />
        </div>
      ) : (
        <form
          className="flex-center flex-col"
          action={customOnAnswerConversation.bind(null, {
            exchanges: thread.exchanges as BetaWhatsappExchange[],
          })}
        >
          {(thread.exchanges ?? [])?.map((exchange, index) => {
            if (exchange) {
              return createElement(DisplayedExchange, {
                key: exchange.id,
                type: pageIndex === index + 1 ? "text" : "hidden",
                exchange,
                step: exchange.step ?? index,
                queue,
                setValue,
              });
            }
            return undefined;
          })}

          <div className="w-full">
            <DetailComponent
              label={
                last
                  ? t("send-conversation-responses")
                  : t("pass-next-question")
              }
              value={
                <div
                  className={
                    "flex gap-[12px] items-center justify-end h-[40px]"
                  }
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
                    <>
                      <Button
                        tabIndex={0}
                        disabled={!watch(`exchange-${pageIndex - 1}`)}
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
                    </>
                  </TooltipedAsset>
                </div>
              }
            />
          </div>
        </form>
      )}
    </div>
  );
}
