"use client";
import { BetaExperience } from "@youmeet/gql/generated";
import { Tooltip } from "@mui/material";
import { ReactElement } from "react";
import { getColor, getTooltip } from "@youmeet/ui/TooltipedChild";
import { grey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

type AttributeCss = { [key: string]: number | string };

export default function TooltipedAsset({
  asset,
  children,
  handleOpen,
  placement = "bottom-start",
  newStyles,
  newOnClick,
}: {
  asset: BetaExperience | string | ReactElement;
  children: ReactElement;
  handleOpen?: (companyId: string) => void;
  placement?:
    | "bottom-start"
    | "bottom-end"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  newStyles?: { [key: string]: number | string | AttributeCss };
  newOnClick?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Tooltip
      title={getTooltip(asset, t)}
      describeChild
      style={{
        height: "100%",
        ...newStyles,
      }}
      enterDelay={20}
      placement={placement}
      PopperProps={{
        sx: {
          cursor: !handleOpen ? "default" : "pointer",
        },
        onClick: () => {
          if (typeof asset === "object" && handleOpen) {
            if ("duration" in asset)
              return handleOpen(asset?.company?.id as string);
          } else if (typeof asset === "string" && handleOpen) {
            return handleOpen(asset as string);
          }
        },
      }}
      slotProps={{
        tooltip: {
          onClick: newOnClick,
          sx: {
            fontSize: !handleOpen ? 16 : 20,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: !handleOpen
              ? getColor(typeof asset === "string" ? asset : "").dark
              : getColor(typeof asset === "string" ? asset : "").light,
            borderRadius: !handleOpen ? "none" : 8,
            padding: !handleOpen ? "none" : "3px 18px",
            width: "auto",
            animation: handleOpen
              ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
              : "none",
            backgroundColor: "white",
            color: !handleOpen ? grey[900] : "white",
            fontWeight: "600",
            textRendering: "geometricPrecision",
            "&:hover": {
              animation: "none",
              color: !handleOpen
                ? grey[900]
                : getColor(typeof asset === "string" ? asset : "").medium,
              backgroundColor: !handleOpen
                ? getColor(typeof asset === "string" ? asset : "").light
                : "white",
            },
            ...newStyles,
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}
