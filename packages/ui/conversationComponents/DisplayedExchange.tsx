import BoldText from "../BoldText";
import DetailComponent from "../DetailComponent";
import Layout from "../Layout";
import {
  BetaQueue,
  BetaWhatsappExchange,
  Translated,
} from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Image from "next/image";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";
import SimpleField from "../formComponents/fields/SimpleField";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import NewAddVideoComponent from "../NewAddVideoComponent";

export default function DisplayedExchange({
  queue,
  exchange,
  type,
  setValue,
  step,
}: {
  queue: BetaQueue;
  exchange: BetaWhatsappExchange;
  type: string;
  setValue: UseFormSetValue<FieldValues>;
  step: number;
}) {
  const dispatch = useDispatch();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const [isVideoAnswering, setIsVideoAnswering] = useState(false);

  return (
    type !== "hidden" &&
    exchange?.question?.generated && (
      <Layout
        newStyles={{
          width: xs || sm || md ? "100vw" : "900px",
          maxWidth: xs || sm || md ? "100vw" : "900px",
        }}
      >
        <div className="flex flex-col gap-[36px] fadeIn w-full mb-[60px]">
          <div className="p-[12px] box-border bg-grey50 dark:mediumDarkBg border-[0.5px] border-solid border-grey300 rounded-[14px] shadow-custom">
            <DetailComponent
              type="modal"
              labelNoWrap
              noLabelColon
              label={""}
              value={
                <div className="flex-center flex-col gap-[12px]">
                  {setFileUrl(queue.offerTarget?.company?.logo) ? (
                    <Image
                      src={setFileUrl(queue.offerTarget?.company?.logo) ?? ""}
                      alt="logo de l'entreprise qui recrute"
                      width={90}
                      height={80}
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <div className="w-[90px] h-[80px] border-[1px] border-solid border-black rounded-[14px] shadow-custom" />
                  )}
                  <span className="font-semibold dark:text-white">
                    {queue.offerTarget?.company?.name}
                  </span>
                </div>
              }
            />

            {queue.offerTarget?.job?.title && (
              <DetailComponent
                type="modal"
                labelNoWrap
                label={t("offer-applied")}
                value={
                  (queue.offerTarget?.job?.title as Translated)[
                    language as "fr" | "en"
                  ] as string
                }
              />
            )}

            {queue.status && (
              <DetailComponent
                type="modal"
                labelNoWrap
                label={t("conversation-state")}
                value={
                  <div
                    className={
                      queue.status === "cancelled"
                        ? "text-red600 dark:text-red50 w-full flex justify-end items-center"
                        : queue.status === "valid"
                        ? "text-green600 dark:text-green50 w-full flex justify-end items-center"
                        : "text-blueGrey600 dark:text-blueGrey50 w-full flex justify-end items-center"
                    }
                  >
                    {t(queue.status)}
                  </div>
                }
              />
            )}
          </div>

          <div className="flex flex-col gap-[6px]">
            <div className="flex-bet w-full">
              {exchange.question.type ? (
                <div className="p-[6px] bg-deepPurple50 rounded-[7px] dark:bg-deepPurple700 dark:text-white text-deepPurple900">
                  {t(exchange.question.type)}
                </div>
              ) : (
                <div />
              )}
              <div className="p-[6px] bg-deepPurple50 rounded-[7px] dark:bg-deepPurple700 dark:text-white text-deepPurple900">
                Question {step + 1}
              </div>
            </div>
            <BoldText
              text={`${exchange?.question?.generated}`}
              links
              fontSizeClass="p-[12px] bg-cyan50 dark:extraLightDarkBg shadow-custom rounded-[14px]"
              formatDisplay
              questionsHighlight
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            {/* <DetailComponent
              label={t("an-other-option")}
              value={
                <div
                  className={
                    !isVideoAnswering
                      ? "underline text-blue600 cursor-pointer"
                      : "underline text-blueGrey600 cursor-pointer"
                  }
                  onClick={() => {
                    setIsVideoAnswering(!isVideoAnswering);
                  }}
                >
                  <BoldText
                    text={
                      !isVideoAnswering
                        ? t("answer-with-a-video")
                        : t("classic-answer")
                    }
                    containerStyle={{ margin: "0px" }}
                  />
                </div>
              }
            /> */}
            {isVideoAnswering && queue.target && exchange.id ? (
              <NewAddVideoComponent
                profil={queue.target}
                exchangeId={exchange.id}
                setVideoId={(videoId) => setValue(`exchange-${step}`, videoId)}
              />
            ) : (
              <SimpleField
                name={`exchange-${step}`}
                type={type}
                label={t("internship-response-label")}
                multiline
                rows={6}
                required
                setValue={setValue}
              />
            )}
          </div>
        </div>
      </Layout>
    )
  );
}
