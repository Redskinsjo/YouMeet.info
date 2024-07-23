/* eslint-disable no-empty-pattern */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem } from "@mui/material";
import { setLocale } from "@youmeet/global-config/features/global";
import { useDispatch } from "react-redux";
import { deepPurple, purple } from "@mui/material/colors";

const Locale = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { i18n } = useTranslation();

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div className="h-full flex items-center cursor-pointer">
        <div
          className="flex items-center h-full"
          onClick={(e) => handleClick(e as unknown as MouseEvent)}
        >
          <div
            className="subItem w-[36px] rounded-xl h-[32px] flex-center text-grey900 dark:text-grey300 hover:bg-black hover:text-white"
            tabIndex={-1}
          >
            {i18n.language.toUpperCase()}
          </div>
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {["en", "fr"].map((l: string) => (
            <MenuItem
              key={l}
              onClick={async () => {
                i18n?.changeLanguage(l);
                dispatch(setLocale(l));
                handleClose();
                return await localStorage.setItem("locale", l);
              }}
              aria-label={l === "fr" ? "locale-menuitem" : undefined}
              className={"legend"}
              sx={{
                color: i18n.language === l ? deepPurple[500] : deepPurple[900],
                borderRadius: "15px",
                margin: "3px",
                background:
                  i18n.language === l ? purple[50] : "white !important",
                "&:hover": {
                  cursor: "pointer",
                  color:
                    i18n.language === l ? deepPurple[900] + " !important" : "",
                  backgroundColor:
                    i18n.language === l
                      ? deepPurple[100] + " !important"
                      : deepPurple[100] + " !important",
                },
              }}
            >
              {l.toUpperCase()}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  );
};
export default Locale;
