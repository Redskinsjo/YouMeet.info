import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { MenuItem } from "@mui/material";
import { usePathname } from "next/navigation";
import { deepPurple, purple } from "@mui/material/colors";

const MenuItemRouter = ({
  route,
  handleClose,
  itemText,
  disabled,
  setDisplayLoginModal,
  onClick,
}: {
  route?: string;
  handleClose: () => void;
  itemText: string;
  disabled?: true;
  setDisplayLoginModal?: Dispatch<SetStateAction<boolean | undefined>>;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  return route === pathname || disabled ? (
    <MenuItem
      className="subItem"
      onClick={handleClose}
      sx={{
        borderRadius: "15px",
        margin: "3px",
        backgroundColor: pathname === route ? purple[50] : "white",
        color: pathname === route ? deepPurple[500] : "inherit",
        cursor: disabled
          ? "not-allowed"
          : pathname === route
            ? "default"
            : "pointer",
        "&:hover": {
          backgroundColor: deepPurple[50],
          color: deepPurple[900],
        },
      }}
    >
      {itemText}
    </MenuItem>
  ) : setDisplayLoginModal ? (
    <MenuItem
      className="subItem"
      onClick={() => {
        setDisplayLoginModal(true);
        handleClose();
      }}
      sx={{
        borderRadius: "15px",
        margin: "3px",
        backgroundColor: pathname === route ? purple[50] : "white",
        cursor: pathname === route ? "default" : "pointer",
        "&:hover": {
          backgroundColor: pathname === route ? deepPurple[50] : deepPurple[50],
          color: deepPurple[900],
        },
      }}
    >
      {itemText}
    </MenuItem>
  ) : route ? (
    <Link
      title={`Naviguer vers la page ${itemText}`}
      href={route}
      style={{ textDecorationLine: "none", color: deepPurple[500] }}
      aria-hidden="true"
    >
      <MenuItem
        className="subItem"
        onClick={() => {
          if (onClick) onClick();
          handleClose();
        }}
        sx={{
          borderRadius: "15px",
          margin: "3px",
          backgroundColor: pathname === route ? purple[50] : "white",
          cursor: pathname === route ? "default" : "pointer",
          "&:hover": {
            backgroundColor:
              pathname === route ? deepPurple[50] : deepPurple[50],
            color: deepPurple[900],
          },
        }}
      >
        {itemText}
      </MenuItem>
    </Link>
  ) : (
    <MenuItem
      className="subItem"
      style={{ textDecorationLine: "none", color: deepPurple[500] }}
      onClick={() => {
        if (onClick) onClick();
        handleClose();
      }}
      sx={{
        borderRadius: "15px",
        margin: "3px",
        backgroundColor: pathname === route ? purple[50] : "white",
        cursor: pathname === route ? "default" : "pointer",
        "&:hover": {
          backgroundColor: pathname === route ? deepPurple[50] : deepPurple[50],
          color: deepPurple[900],
        },
      }}
    >
      {itemText}
    </MenuItem>
  );
};

export default MenuItemRouter;
