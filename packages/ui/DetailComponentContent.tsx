"use client";
import { BetaUser, UpdateUserDocument } from "@youmeet/gql/generated";
import { useMediaQuery } from "@mui/material";
import React, { createElement } from "react";
import { outfit } from "@youmeet/functions/fonts";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { client } from "@youmeet/gql/index";
import {
  UserState,
  setHiddenFields,
} from "@youmeet/global-config/features/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import TooltipedAsset from "./TooltipedAsset";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { Attr } from "@youmeet/types/attributes";

export default function DetailComponent({
  label,
  value,
  type,
  conversation,
  user,
  newClasses,
  onClick,
  newStyles,
  fontSize,
  noLabelColon,
  noPadding,
  name,
  fullWidth = false,
  labelFullWidth,
  labelNoWrap,
  labelUnderline,
  account,
  noGap,
  profil,
  valueInBold,
  reversePlacement,
  labelInBold,
  labelComponent = "div",
  valueColor,
}: {
  label: string | (string | React.JSX.Element)[] | React.JSX.Element;
  value: string | (string | React.JSX.Element)[] | React.JSX.Element;
  type?: "modal" | "modal2";
  conversation?: boolean;
  user?: BetaUser | null;
  name?: string;
  newClasses?: string;
  onClick?: () => void;
  newStyles?: Attr;
  fontSize?: string;
  noLabelColon?: boolean;
  noPadding?: boolean;
  fullWidth?: boolean;
  labelFullWidth?: boolean;
  labelNoWrap?: boolean;
  labelUnderline?: boolean;
  account?: boolean;
  noGap?: boolean;
  profil?: BetaUser;
  valueInBold?: boolean;
  reversePlacement?: boolean;
  labelInBold?: boolean;
  labelComponent?: "div" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  valueColor?: string;
}) {
  const dispatch = useDispatch();
  const appUser = useSelector((state: RootState) => state.user as UserState);
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const searchParams = useSearchParams();

  const LabelComponent = createElement(labelComponent, {}, label);

  return type === "modal" &&
    ((profil && name && !profil?.hiddenFields?.includes(name) && !account) ||
      account ||
      !profil) ? (
    <div
      className={`flex justify-between w-full min-w-[25px] box-border gap-[6px] box-border ${
        newClasses || ""
      }`}
      style={{
        alignItems: conversation ? "flex-start" : "center",
        flexDirection: conversation ? "column" : "row",
        padding: noGap ? "0px" : noPadding ? "0px" : "12px",
        ...newStyles,
      }}
      onClick={onClick}
    >
      <div
        className="flex font-bold w-fit dark:text-white text-black"
        style={{
          textAlign: "start",
          fontSize: fontSize || "14px",
          whiteSpace:
            labelNoWrap || (!xs && !sm && !md) || !searchParams.get("new")
              ? "nowrap"
              : "initial",
          width: labelFullWidth ? "100%" : "fit-content",
          textDecoration: labelUnderline ? "underline" : "unset",
          fontWeight: labelInBold ? 700 : 300,
        }}
      >
        {label === "user" && user
          ? user?.fullname
          : label === "user" && !user && name
          ? name
          : label === "assistant"
          ? "YouMeet"
          : LabelComponent}
        {noLabelColon ? "" : ":"}
      </div>
      <div
        className={
          name === "description"
            ? "w-full flex flex-col-reverse items-end"
            : "w-full flex justify-end items-center"
        }
        style={{
          width: fullWidth
            ? "100%"
            : noPadding && !conversation
            ? "fit-content"
            : "100%",
          justifyContent: conversation ? "center" : "end",
          flexDirection:
            account && conversation
              ? "column-reverse"
              : reversePlacement
              ? "row-reverse"
              : "row",
        }}
      >
        <div
          className="rounded-[14px] box-border flex justify-end break-any dark:text-white dark:extraLightDarkBg"
          style={{
            ...outfit.style,
            fontSize: fontSize || "15px",
            width: fullWidth
              ? "100%"
              : conversation
              ? "fit-content"
              : "max-content",

            padding: noPadding ? "0px" : "12px",
            fontWeight: valueInBold ? 500 : "initial",
          }}
        >
          <div
            className="rounded-[7px] dark:lightDarkBg w-full text-black dark:text-white flex-center"
            style={{
              padding: noPadding ? "2px 4px" : "4px 8px",
              whiteSpace: conversation ? "nowrap" : "normal",
              color: valueColor ?? "inherit",
            }}
          >
            {value}
          </div>
        </div>
        {account &&
        name &&
        name !== "firstname" &&
        name !== "lastname" &&
        appUser?.hiddenFields &&
        appUser?.hiddenFields.includes(name) ? (
          <TooltipedAsset asset={t("explain-show-field")}>
            <div className="w-[36px] flex-center z-10">
              <AiOutlineEyeInvisible
                className="item cursor-pointer dark:text-white"
                onClick={async () => {
                  if (appUser?.hiddenFields) {
                    const response = await client.mutate({
                      mutation: UpdateUserDocument,
                      variables: {
                        data: {
                          hiddenFields: appUser.hiddenFields.filter(
                            (f) => !name
                          ),
                        },
                        userId: appUser.id,
                      },
                    });
                    const updated = response.data?.updateUser;
                    if (updated)
                      dispatch(
                        setHiddenFields(updated.hiddenFields as string[])
                      );
                  }
                }}
              />
            </div>
          </TooltipedAsset>
        ) : account &&
          name &&
          name !== "firstname" &&
          name !== "lastname" &&
          appUser?.hiddenFields &&
          !appUser?.hiddenFields.includes(name) ? (
          <TooltipedAsset asset={t("explain-hide-field")}>
            <div className="w-[36px] flex-center z-10">
              <AiOutlineEye
                className="item cursor-pointer dark:text-grey300 text-grey700"
                onClick={async () => {
                  if (appUser?.hiddenFields) {
                    const response = await client.mutate({
                      mutation: UpdateUserDocument,
                      variables: {
                        data: {
                          hiddenFields: [...appUser.hiddenFields, name],
                        },
                        userId: appUser.id,
                      },
                    });
                    const updated = response.data?.updateUser;
                    if (updated)
                      dispatch(
                        setHiddenFields(updated.hiddenFields as string[])
                      );
                  }
                }}
              />
            </div>
          </TooltipedAsset>
        ) : undefined}
      </div>
    </div>
  ) : type === "modal2" &&
    ((profil && name && !profil?.hiddenFields?.includes(name) && !account) ||
      account ||
      !profil) ? (
    <div
      className={`flex justify-between w-full min-w-[25px] box-border gap-[6px] box-border ${
        newClasses || ""
      }`}
      style={{
        alignItems: conversation ? "flex-start" : "center",
        flexDirection: conversation ? "column" : "row",
        padding: noGap ? "0px" : noPadding ? "0px" : "12px",
        ...newStyles,
      }}
      onClick={onClick}
    >
      <div
        className="flex font-bold w-fit dark:text-white text-black"
        style={{
          textAlign: "start",
          fontSize: fontSize || "14px",
          whiteSpace:
            labelNoWrap || (!xs && !sm && !md) || !searchParams.get("new")
              ? "nowrap"
              : "initial",
          width: labelFullWidth ? "100%" : "fit-content",
          textDecoration: labelUnderline ? "underline" : "unset",
          fontWeight: labelInBold ? 700 : 300,
        }}
      >
        {label === "user" && user
          ? user?.fullname
          : label === "user" && !user && name
          ? name
          : label === "assistant"
          ? "YouMeet"
          : LabelComponent}
        {noLabelColon ? "" : ":"}
      </div>
      <div
        className="w-full flex justify-end items-center"
        style={{
          justifyContent: conversation ? "center" : "end",
          width: noPadding && !conversation ? "fit-content" : "100%",
          flexDirection:
            account && conversation
              ? "column-reverse"
              : reversePlacement
              ? "row-reverse"
              : "row",
        }}
      >
        <div
          className="rounded-[14px] box-border flex justify-end break-any dark:text-white dark:extraLightDarkBg"
          style={{
            ...outfit.style,
            fontSize: fontSize || "15px",
            width: fullWidth
              ? "100%"
              : conversation
              ? "fit-content"
              : "max-content",
            justifyContent: conversation ? "center" : "end",
            padding: noPadding ? "0px" : "12px",
            fontWeight: valueInBold ? 500 : "initial",
          }}
        >
          <div
            className="rounded-[7px] dark:lightDarkBg w-full text-black dark:text-white flex-center"
            style={{
              padding: noPadding ? "2px 4px" : "4px 8px",
              whiteSpace: conversation ? "nowrap" : "normal",
              color: valueColor ?? "inherit",
            }}
          >
            {value}
          </div>
        </div>
        {account &&
        name &&
        appUser?.hiddenFields &&
        appUser?.hiddenFields.includes(name) ? (
          <TooltipedAsset asset={t("explain-show-field")}>
            <div className="w-[36px] flex-center z-10">
              <AiOutlineEye
                className="item text-black cursor-pointer"
                onClick={async () => {
                  if (appUser?.hiddenFields) {
                    const response = await client.mutate({
                      mutation: UpdateUserDocument,
                      variables: {
                        data: {
                          hiddenFields: appUser.hiddenFields.filter(
                            (f) => !name
                          ),
                        },
                        userId: appUser.id,
                      },
                    });
                    const updated = response.data?.updateUser;
                    if (updated)
                      dispatch(
                        setHiddenFields(updated.hiddenFields as string[])
                      );
                  }
                }}
              />
            </div>
          </TooltipedAsset>
        ) : account &&
          name &&
          appUser?.hiddenFields &&
          !appUser?.hiddenFields.includes(name) ? (
          <TooltipedAsset asset={t("explain-hide-field")}>
            <div className="w-[36px] flex-center z-10">
              <AiOutlineEyeInvisible
                className="item text-black cursor-pointer"
                onClick={async () => {
                  if (appUser?.hiddenFields) {
                    const response = await client.mutate({
                      mutation: UpdateUserDocument,
                      variables: {
                        data: {
                          hiddenFields: [...appUser.hiddenFields, name],
                        },
                        userId: appUser.id,
                      },
                    });
                    const updated = response.data?.updateUser;
                    if (updated)
                      dispatch(
                        setHiddenFields(updated.hiddenFields as string[])
                      );
                  }
                }}
              />
            </div>
          </TooltipedAsset>
        ) : undefined}
      </div>
    </div>
  ) : (profil && name && !profil?.hiddenFields?.includes(name) && !account) ||
    !profil ? (
    <div
      className={
        conversation
          ? `flex items-start justify-between box-border flex-col w-full min-h-[25px] p-[12px] gap-[6px] ${
              newClasses || ""
            }`
          : `flex items-center justify-between box-border w-full min-h-[25px] p-[12px] gap-[6px] ${
              newClasses || ""
            }`
      }
      style={{ ...newStyles }}
      onClick={onClick}
    >
      <div
        className="mr-[12px] text-[14px] font-bold text-grey500 dark:text-white text-black flex-center"
        style={{
          fontWeight: labelInBold ? 700 : 300,
          whiteSpace:
            labelNoWrap || (!xs && !sm && !md) || !searchParams.get("new")
              ? "nowrap"
              : "initial",
        }}
      >
        {label === "user"
          ? user?.fullname
          : label === "assistant"
          ? "YouMeet"
          : LabelComponent}
        {noLabelColon ? "" : ":"}
      </div>
      <div className="text-[14px] p-[12px] rounded-[14px] box-border max-w-full flex justify-end dark:extraLightDarkBg dark:text-white">
        <div
          className="rounded-[7px] dark:lightDarkBg w-full text-black dark:text-white flex-center"
          style={{
            padding: noPadding ? "2px 4px" : "4px 8px",
            whiteSpace: conversation ? "nowrap" : "normal",
            color: valueColor ?? "inherit",
          }}
        >
          {conversation ? (
            <div
              className="w-full flex justify-end dark:text-white"
              style={{
                fontWeight: valueInBold ? 500 : "initial",
                color: valueColor ?? "inherit",
              }}
            >
              {value}
            </div>
          ) : (
            value
          )}
        </div>
      </div>
    </div>
  ) : undefined;
}
