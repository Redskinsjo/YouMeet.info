import { useTranslation } from "react-i18next";
import DetailComponent from "@youmeet/components/DetailComponent";
import { MdOutlineCancel } from "react-icons/md";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Button } from "@mui/material";
import React from "react";

export default function NewAddConversationTheme({
  addTheme,
  themesCount,
  cancelThemes,
}: {
  addTheme?: () => void;
  themesCount: number;
  cancelThemes: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="w-full flex-bet p-[6px] h-[39px]">
      <DetailComponent
        noLabelColon
        label={
          themesCount !== undefined && themesCount > 0 ? (
            <div className="flex-center gap-[6px]">
              <TooltipedAsset asset={`${t("cancel")}`} placement="right">
                <div className="flex-center">
                  <MdOutlineCancel
                    style={{ borderRadius: "100%" }}
                    className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 text-[25px] cursor-pointer"
                    onClick={() => {
                      cancelThemes();
                    }}
                  />
                </div>
              </TooltipedAsset>
              <TooltipedAsset asset={`${t("validate")}`} placement="right">
                <div className="flex-center">
                  <Button
                    className="bg-transparent border-0 w-fit min-w-0 p-0"
                    type="submit"
                  >
                    <IoIosCheckmarkCircle
                      style={{ borderRadius: "100%" }}
                      className="text-deepPurple900 hover:text-white bg-deepPurple50 hover:bg-deepPurple300 text-[25px] cursor-pointer"
                    />
                  </Button>
                </div>
              </TooltipedAsset>
            </div>
          ) : (
            ""
          )
        }
        value={
          <div
            onClick={() => {
              if (addTheme && themesCount < 7) addTheme();
            }}
            className={
              "legend h-full cursor-pointer flex justify-end items-center dark:text-deepPurple200 text-deepPurple700 underline"
            }
          >
            {themesCount < 5 && t("add-theme")}
          </div>
        }
      />
    </div>
  );
}
