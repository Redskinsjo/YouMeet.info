import { Menu, MenuItem, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { deepPurple, grey } from "@mui/material/colors";
import MenuItemRouter from "./MenuItemRouter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { UserState, removeUser } from "@youmeet/global-config/features/user";
import { outfit } from "@youmeet/functions/fonts";
import { setName } from "@youmeet/utils/basics/setName";
import { onLogout } from "@youmeet/functions/actions";
import LogoutBtn from "./LogoutBtn";

export default function MenuAuthenticatedUser() {
  const user = useSelector(
    (state: RootState) => state?.user as unknown as UserState
  );
  const [anchorEl, setAnchorEl] = useState<
    | undefined
    | {
        el: EventTarget;
        type: string;
      }
  >(undefined);
  const open = anchorEl;
  const sm = useMediaQuery("(max-width:720px)");
  const xs = useMediaQuery("(max-width:600px)");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (event: React.MouseEvent, type: "logout" | "lang") => {
      setAnchorEl({ el: event.currentTarget, type });
    },
    []
  );
  const handleClose = useCallback(() => {
    setAnchorEl(undefined);
  }, []);

  const customOnLogout = useCallback(async () => {
    await onLogout();
    dispatch(removeUser("ok"));
  }, []);

  return (
    <div>
      {user && user.picture ? (
        <Image
          alt="authenticated-photo-profile"
          src={user.picture}
          width={25}
          height={25}
          className="flex items-center cursor-pointer"
          onClick={(e) => handleClick(e, "logout")}
          style={{
            border: `1px solid ${deepPurple[300]}`,
            width: xs || sm ? 25 : 25,
            height: "auto",
          }}
        />
      ) : (
        <div
          className={
            open
              ? "flex-center h-[25px] w-[25px] bg-deepPurple900 border-[0.5px] border-solid border-black text-white rounded-full cursor-pointer box-border"
              : "flex-center h-[25px] w-[25px] rounded-full bg-deepPurple900 border-[0.5px] border-solid border-black cursor-pointer text-white box-border"
          }
          onClick={(e) => handleClick(e, "logout")}
        >
          <BsFillPersonFill
            style={{
              border: "2px solid white",
              borderRadius: "100%",
            }}
          />
        </div>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl && (anchorEl.el as Element)}
        open={open !== undefined && open.type === "logout"}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div
          className="py-[6px] px-[16px] h-[36px] box-border subItem font-bold bg-white cursor-pointer"
          style={{ ...outfit.style }}
        >
          {user.firstname || user.lastname ? setName(user) : user.uniqueName}
        </div>

        <MenuItemRouter
          route={"/dashboard"}
          handleClose={handleClose}
          itemText={t("dashboard")}
        />

        {process.env.APP === "pro" && (
          <MenuItemRouter
            route={"/compte"}
            handleClose={handleClose}
            itemText={t("account")}
          />
        )}
        {process.env.APP === "candidate" &&
          user.email.toLowerCase() === "jonathan.carnos@gmail.com" && (
            <MenuItemRouter
              route="/backoffice"
              handleClose={handleClose}
              itemText={"Admin"}
            />
          )}

        <form action={"/api/auth/logout"} className="flex-center">
          <MenuItem
            component={LogoutBtn}
            sx={{
              color: grey[700],
              "&:hover": {
                backgroundColor: deepPurple[50],
              },
            }}
          />
        </form>
      </Menu>
    </div>
  );
}
