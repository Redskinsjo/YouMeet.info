import { Box, Button, useMediaQuery } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LoginButton = ({
  newStyles,
  setDisplayLoginModal,
  disabled,
  mui,
}: {
  newStyles?: { [attr: string]: string | number };
  setDisplayLoginModal?: Dispatch<SetStateAction<boolean | undefined>>;
  disabled?: boolean;
  mui?: boolean;
}) => {
  const { t } = useTranslation();
  const sm = useMediaQuery("(max-width:720px)");
  const xs = useMediaQuery("(max-width:600px)");
  const md = useMediaQuery("(max-width:900px)");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div>
        {!mui ? (
          <div
            onClick={() => {
              if (setDisplayLoginModal && !disabled) setDisplayLoginModal(true);
            }}
            className={"header-item text-white h-[36px]"}
          >
            <Button
              className="px-[18px] py-[4px] cursor-pointer border-0 text-thisBlue bg-deepPurple50 no-underline item xs:subItem sm:subItem md:subItem h-full"
              style={{ ...newStyles }}
              tabIndex={0}
              disabled={disabled}
            >
              {t("login")}
            </Button>
          </div>
        ) : (
          <Box
            onClick={() => {
              if (setDisplayLoginModal && !disabled) setDisplayLoginModal(true);
            }}
            sx={{
              height: "34px",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "14px",
            }}
          >
            <Button
              style={{
                padding: "4px 18px",
                cursor: "pointer",
                border: "unset",
                color: deepPurple[900],
                backgroundColor: deepPurple[50],
                textDecoration: "none",
                fontSize: xs || sm || md ? "14px" : "18px",
                height: "100%",
                ...newStyles,
              }}
              tabIndex={0}
              disabled={disabled}
            >
              {t("login")}
            </Button>
          </Box>
        )}
      </div>
    )
  );
};

export default LoginButton;
