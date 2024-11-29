"use client";
import { RootState } from "@youmeet/global-config/store";
import { useSelector } from "react-redux";
import { UserState } from "@youmeet/global-config/features/user";
import { useTranslation } from "react-i18next";
import { CustomModalProps, trads } from "@youmeet/types/CustomModal";
import { useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import UserRemarkComponent from "../../dashboardComponents/UserRemarkComponent";
import { renderUrlQuery } from "@youmeet/utils/basics/renderUrlQuery";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import Link from "next/link";
import ModalClose from "../ModalClose";
import { modals } from "../modals";

const BoldText = dynamic(() => import("@youmeet/ui/TextChild"), { ssr: false });

export default function CustomModalContent({
  type,
  cta,
  title,
  content,
}: CustomModalProps) {
  const [choice, setChoice] = useState(
    type === "accountCandidate" ? "cv" : "premium"
  );
  const user = useSelector(
    (state: RootState) => state?.user as unknown as UserState
  );
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const pathname = usePathname();

  const data = modals && type && modals[type] ? modals[type] : undefined;

  return (
    <div className="flex-center flex-col gap-[24px] box-border xs:px-[12px] sm:px-[12px] md:px-[12px] w-[600px]">
      <h3 className="text-purple900 sentences">
        {data?.title && (
          <BoldText
            text={`${t((title as string) ?? (data?.title as trads)[language])}`}
          />
        )}
      </h3>
      <div className="text-blueGrey700 text-[19px] xs:text-[22px] sm:text-[22px] md:text-[22px] text-justify">
        {data?.content && (
          <BoldText
            text={`${t(
              (content as string) ?? (data?.content as trads)[language]
            )}`}
            align="center"
          />
        )}
      </div>
      {type === "remark" && <UserRemarkComponent />}
      {(type === "account" || type === "accountCandidate") && (
        <form
          action={`/api/create-checkout-session?${renderUrlQuery({
            choice,
            id: user?.id,
            email: user?.email,
            customer: user?.customerId,
            redirect: encodeURIComponent(pathname),
          })}`}
          method="POST"
          className="flex-center"
        >
          <div className="flex-col flex-center gap-[24px]">
            {type === "account" && (
              <div className="flex-center gap-[12px]">
                <InputLabel id="choice">{t("subscription-choice")}:</InputLabel>
                <Select
                  labelId="choice"
                  value={choice}
                  label="Votre choix"
                  variant="standard"
                  onChange={(e) => setChoice(e.target.value)}
                >
                  <MenuItem value={"premium"}>Premium 45€/m</MenuItem>
                  {/* <MenuItem value={"chatbot"}>Chatbot 59€/m</MenuItem> */}
                </Select>
              </div>
            )}
            <div className="flex items-center">
              <HiChevronDoubleRight className="emphasizeVisualLeft text-deepPurple500" />
              <Button type="submit">
                {data?.cta && (
                  <BoldText
                    text={`${t(
                      (cta as string) ?? (data?.cta as trads)[language]
                    )}`}
                    containerStyle={{ margin: 0 }}
                  />
                )}
              </Button>
              <HiChevronDoubleLeft className="emphasizeVisualRight text-deepPurple500" />
            </div>
          </div>
        </form>
      )}
      {type === "search" && (
        <Link href={"/formulaire-profil"}>
          <Button className="subItem">
            {data?.cta && (
              <BoldText
                text={`${t((cta as string) ?? (data?.cta as trads)[language])}`}
                containerStyle={{ margin: 0 }}
              />
            )}
          </Button>
        </Link>
      )}
    </div>
  );
}
