import { BetaExperience } from "@youmeet/gql/generated";
import { deepPurple, grey } from "@mui/material/colors";
import { ReactElement, forwardRef } from "react";

export const getTooltip = (
  asset: BetaExperience | string | ReactElement,
  translate: (str: string) => string
) => {
  if (typeof asset === "object") {
    if ("duration" in asset) {
      return "Digital - ESN - " + (asset as BetaExperience)?.duration + " mois";
    } else {
      return asset as ReactElement;
    }
  }
  return translate(asset as string);
};

export const getColor = (asset: BetaExperience | string) => {
  if (typeof asset === "object") {
    if ("name" in asset) {
      return {
        extraLight: deepPurple[50],
        light: deepPurple[200],
        medium: deepPurple[500],
        dark: deepPurple[900],
      };
    } else if ("duration" in asset) {
      return {
        extraLight: grey[50],
        light: grey[200],
        medium: grey[500],
        dark: grey[900],
      };
    }
  }
  return {
    extraLight: grey[50],
    light: grey[200],
    medium: grey[500],
    dark: grey[900],
  };
};

export const getText = (asset: BetaExperience | string) => {
  if (typeof asset === "object") {
    if ("duration" in asset) {
      return (asset as BetaExperience)?.company?.name;
    }
  }
  return asset as string;
};

const TooltipChild = (
  props: {
    asset: BetaExperience | string;
  },
  ref: any
) => {
  return (
    <div
      {...props}
      ref={ref}
      className="list-none px-[12px] py-[10px] my-[12px] rounded-lg cursor-default item"
      style={{
        border: "1px solid " + getColor(props.asset).medium,
        backgroundColor: getColor(props.asset).extraLight,
        color: getColor(props.asset).dark,
      }}
    >
      {getText(props.asset)}
    </div>
  );
};

export default forwardRef(TooltipChild);
