import React from "react";
import { IoMailOutline } from "react-icons/io5";
import { AiOutlineDislike } from "react-icons/ai";
import { IoMdStats, IoIosHeart } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSolidConversation } from "react-icons/bi";
import { CustomIconProps } from "@youmeet/types/CustomIconProps";
import { Button } from "@mui/material";
import { PiShareNetworkFill } from "react-icons/pi";
import { IoInformationCircle } from "react-icons/io5";

const iconsMapping = {
  email: IoMailOutline,
  dislike: AiOutlineDislike,
  search: AiOutlinePlus,
  stats: IoMdStats,
  like: IoIosHeart,
  interview: BiSolidConversation,
  share: PiShareNetworkFill,
  file: IoInformationCircle,
} as any;

const CustomIcon = ({
  onClick,
  name,
  newStyles,
  onlyIcon,
  disabled = false,
}: CustomIconProps) => {
  const customIcon = React.createElement(iconsMapping[name], {
    className: "cursor-pointer hover:fill-slate-400 text-white item",
    style: newStyles,
    onClick,
  });

  return onlyIcon ? (
    customIcon
  ) : (
    <Button
      disabled={disabled}
      className={
        disabled
          ? "py-[2px] px-[6px] h-full flex items-center rounded bg-grey500"
          : "py-[2px] px-[6px] h-full flex items-center rounded bg-deepPurple900"
      }
      style={{ ...newStyles }}
    >
      {customIcon}
    </Button>
  );
};

export default CustomIcon;
