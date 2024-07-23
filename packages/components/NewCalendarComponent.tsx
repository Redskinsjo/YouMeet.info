import React, { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import { Subscription } from "@youmeet/types/app";
import SubPartContainer from "@youmeet/components/SubPartContainer";
import { blueGrey } from "@mui/material/colors";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const NewCalendarComponent = ({
  dark,
  interviewOffer,
  setDay,
  day,
  isSubscribed,
  setDisplayModal,
  subscribedLoading,
}: {
  dark?: boolean;
  day: string | undefined;
  interviewOffer: React.JSX.Element | undefined;
  setDay: Dispatch<SetStateAction<string | undefined>>;
  isSubscribed: undefined | Subscription;
  setDisplayModal: Dispatch<SetStateAction<boolean>>;
  subscribedLoading: boolean;
}) => {
  const { t } = useTranslation();
  const [value, onChange] = useState<Value>(new Date());
  return (
    <SubPartContainer
      radius="14px 14px 0px 0px"
      // newStyles={{ background: "rgba(0,0,0,0.7)" }}
      newStyles={{
        background: dark
          ? "black"
          : `linear-gradient(90deg, white, ${blueGrey[50]}, white)`,
        padding: "0px",
      }}
    >
      <div
        className={"relative p-[6px] bg-blueGrey500 rounded-b-0"}
        // style={{ background: "rgba(0,0,0,0.7)" }}
        style={{
          background: dark
            ? "black"
            : `linear-gradient(90deg, white, ${blueGrey[50]}, white)`,
        }}
      >
        <div className="flex flex-col gap-[24px]">
          <h2 className="my-[12px] p-0 text-center text-black">
            {t("offer-interview")}
          </h2>
          {/* {isSubscribed ? (
            <Calendar
              className="w-full rounded-t-xl"
              onChange={onChange}
              value={value}
              onClickDay={(day) => {
                if (isSubscribed) setDay(day.toString());
              }}
            />
          ) : (
            <BecomePremium
              dark
              isSubscribed={isSubscribed}
              setDisplayModal={setDisplayModal}
              subscribedLoading={subscribedLoading}
            />
          )} */}
          <div className="w-min flex-center flex-col gap-[12px]">
            <Calendar
              className={"max-w-[330px] rounded-t-xl border-0 h-fit"}
              onChange={onChange}
              value={value}
              onClickDay={(day) => {
                // if (isSubscribed)
                setDay(day.toString());
              }}
              tileClassName={({ activeStartDate, date, view }) => {
                if (new Date().getDate() === date.getDate())
                  return "max-w-[72px] rounded-[14px] bg-grey300";
                if (day && new Date(day).getDate() === date.getDate())
                  return "max-w-[72px] rounded-[14px] bg-deepPurple700 text-white";
                return "max-w-[72px] rounded-[14px]";
              }}
            />
            {interviewOffer}
          </div>
        </div>
      </div>
    </SubPartContainer>
  );
};

export default NewCalendarComponent;
