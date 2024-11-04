import { Menu } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MenuItemRouter from "./MenuItemRouter";
import { RxHamburgerMenu } from "react-icons/rx";

export default function MenuHeaderForMobile() {
  const [anchorEl, setAnchorEl] = useState<
    | undefined
    | {
        el: EventTarget;
        type: string;
      }
  >(undefined);
  const open = anchorEl;
  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent, type: "logout" | "lang") => {
    setAnchorEl({ el: event.currentTarget, type });
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <div className="hidden xs:block sm:block md:block flex-1">
      <div
        className={
          open
            ? "flex-center h-[38px] w-[38px] dark:bg-deepPurple900 bg-blue900 border-[0.5px] border-solid border-black text-white rounded-full cursor-pointer box-border p-[6px]"
            : "flex-center h-[38px] w-[38px] rounded-full dark:bg-deepPurple900 bg-blue900 border-[0.5px] border-solid border-black cursor-pointer text-white box-border p-[6px]"
        }
        onClick={(e) => handleClick(e, "logout")}
      >
        <RxHamburgerMenu className="w-full h-full" />
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl && (anchorEl.el as Element)}
        open={open !== undefined && open.type === "logout"}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          "aria-hidden": "true",
        }}
      >
        <MenuItemRouter
          route={"/"}
          handleClose={handleClose}
          itemText={t("home")}
        />
        <MenuItemRouter
          route={"/le-produit/mise-en-relation"}
          handleClose={handleClose}
          itemText={t("linking")}
        />
        {/* <MenuItemRouter
          route={"/le-produit/ats"}
          handleClose={handleClose}
          itemText={t("ats")}
        /> */}
        <MenuItemRouter
          route={"/blog"}
          handleClose={handleClose}
          itemText={t("blog")}
        />
      </Menu>
    </div>
  );
}
