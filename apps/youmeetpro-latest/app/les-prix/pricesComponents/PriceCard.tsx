import React from "react";
import Image from "next/image";
import { Button, useMediaQuery } from "@mui/material";
import { blueGrey, deepPurple, grey, purple } from "@mui/material/colors";
import BoldText from "@youmeet/ui/BoldText";
import { useTranslation } from "react-i18next";
import { RootState } from "@youmeet/global-config/store";
import { useSelector } from "react-redux";
import { UserState } from "@youmeet/global-config/features/user";
import { Subscription } from "@youmeet/types/app";
import { uri } from "@youmeet/functions/imports";
import { renderUrlQuery } from "@youmeet/utils/basics/renderUrlQuery";

const contents = [
  "contentPremium1",
  "contentPremium2",
  "contentPremium3",
  "contentPremium4",
];

const offers = [
  {
    id: 1,
    name: "credit",
    price: "by-use",
    icon: "https://res.cloudinary.com/de822mdsy/image/upload/v1702214946/youmeet-official/webp/cyborg_fguzhb.webp",
  },
  {
    id: 2,
    name: "premium",
    price: 45,
    icon: "https://res.cloudinary.com/de822mdsy/image/upload/v1702214946/youmeet-official/webp/cyborg_fguzhb.webp",
  },
];

export default function PriceCard({
  isSubscribedCandidates,
  isSubscribedChatbot,
  isSubscribedPremium,
}: {
  isSubscribedCandidates: undefined | Subscription;
  isSubscribedPremium: undefined | Subscription;
  isSubscribedChatbot: undefined | Subscription;
}) {
  const user = useSelector(
    (state: RootState) => state?.user as unknown as UserState
  );

  const { t } = useTranslation();
  const md = useMediaQuery("(max-width:900px)");
  const sm = useMediaQuery("(max-width:720px)");
  const xs = useMediaQuery("(max-width:600px)");
  const xss = useMediaQuery("(max-width:540px)");

  return (
    <div
      className={`flex-1 xs:flex-col sm:flex-col md:flex-col md2:flex-col box-border w-full bg-white dark:darkBg rounded-[30px] p-[48px] shadow-2xl font-bold border-[1px] border-solid border-blueGrey100 flex gap-[48px] offers:mr-0 offers:mb-[20px]`}
    >
      <div className="w-full flex-1 min-w-[300px]">
        <div className="sentences dark:text-white">{t("features")}:</div>
        <div
          className="mb-0 flex w-full flex-col flex-1 items-center justify-start break-word min-h-[288px] max-w-[300px]"
          style={{
            paddingLeft: xss ? 4 : xs ? 8 : sm ? 12 : 24,
            marginRight: xss ? 0 : 20,
          }}
        >
          {contents.map((content, i) => {
            return (
              <BoldText
                key={content.slice(0, 7) + i}
                fontSizeClass=""
                containerStyle={{
                  marginLeft: t(content)[0] === "-" ? "24px" : "0px",
                }}
                text={content}
                align="left"
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className="flex-center rounded-[30px]"
          style={{
            flexDirection: xss ? "row-reverse" : "column",
            gap: xss ? 12 : "initial",
            flex: xs || sm ? "none" : 1,
            maxWidth: "100vw",
          }}
        >
          <Image
            width={247.5}
            height={330}
            src={
              "https://res.cloudinary.com/de822mdsy/image/upload/v1702214946/youmeet-official/webp/cyborg_fguzhb.webp"
            }
            alt={
              "Un recruteur cyborg 2.0 qui utilise YouMeet Premium pour sourcer ses candidats"
            }
            style={{
              background: "rgba(96,125,139,0.1)",
              borderRadius: 30,
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      <div className="w-full min-w-[300px] flex flex-1 flex-col gap-[1px]">
        {offers.map((offer, i, arr) => {
          let shouldTry = true;
          if (offer.name === "verified" && isSubscribedCandidates)
            shouldTry = false;
          if (offer.name === "premium" && isSubscribedPremium)
            shouldTry = false;
          if (offer.name === "credit" && isSubscribedPremium) shouldTry = false;
          if (offer.name === "chatbot" && isSubscribedChatbot)
            shouldTry = false;

          return (
            <div
              key={offer.id}
              className="flex flex-col gap-[12px] py-[18px]"
              style={{
                borderBottom: i === 0 ? `1px solid ${grey[100]}` : "",
                margin:
                  offer.name === "credit"
                    ? "1px 0px 0px 0px"
                    : "0px 0px 1px 0px",
              }}
            >
              <h3
                className={
                  "titles text-blueGrey800 dark:text-blueGrey200 my-0 text-center"
                }
              >
                {t(offer.name)}
              </h3>
              <div className="flex items-center mx-auto justify-center gap-[12px]">
                {offer.name !== "credit" ? (
                  <div className="flex-center flex-col gap-[12px]">
                    <div
                      className="p-[8px] shadow-offerPrice w-[200px] text-white rounded-[30px] flex justify-center titles"
                      style={{
                        background:
                          offer.name === "verified"
                            ? `linear-gradient(135deg,${blueGrey[100]},${blueGrey[500]})`
                            : `linear-gradient(135deg,${purple[100]},${deepPurple[500]})`,
                      }}
                    >
                      {offer.price}

                      <span className="font-light text-[18px] ml-[4px] flex items-center">
                        €/m
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col text-light dark:text-grey100 justify-center">
                      <div className="legend">
                        m:
                        <span className="ml-[4px] font-light italic">
                          {t("month")}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-center flex-col gap-[12px] dark:text-white">
                    <div className="p-[8px] shadow-offerPrice w-[200px] dark:text-white rounded-[30px] border-[1px] border-solid border-grey500 flex justify-center titles">
                      {t(offer.price as string)}
                    </div>
                    <div className="flex-1">{t("choose-amount")}</div>
                  </div>
                )}
              </div>

              {shouldTry ? (
                <div className="flex-center">
                  <form
                    action={`${uri}/api/checkout?${renderUrlQuery({
                      redirect: "compte",
                      choice: offer.name,
                      customer: user.customerId || "",
                      email: user.email || "",
                      id: user.id,
                    })}`}
                    method="POST"
                  >
                    <Button
                      disabled={!shouldTry}
                      variant="contained"
                      className="min-w-[120px] rounded-[30px] text-black item dark:extraLightDarkBg dark:text-white"
                      type="submit"
                    >
                      {t("try")}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="flex-center">
                  <form>
                    <Button
                      disabled={!shouldTry}
                      variant="contained"
                      className="min-w-[120px] rounded-[30px] text-black item dark:extraLightDarkBg dark:text-white"
                    >
                      {t("you-own-already")}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
