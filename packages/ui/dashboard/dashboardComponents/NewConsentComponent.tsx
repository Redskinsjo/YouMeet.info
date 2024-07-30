"use client";
import React, { useCallback, useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { BetaUser } from "@youmeet/gql/generated";
import DetailComponent from "../../DetailComponent";
import { useTranslation } from "react-i18next";
import { deepPurple, grey } from "@mui/material/colors";
import { updateUser } from "@youmeet/functions/request";
import { useDispatch } from "react-redux";
import { setError } from "@youmeet/global-config/features/global";
import { UnknownAction } from "@reduxjs/toolkit";

const NewIsPublicComponent = ({ profil }: { profil: BetaUser }) => {
  const [consent, setConsent] = useState(profil.consent ?? false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const customUpdateConsent = useCallback(async () => {
    const result = await updateUser({
      userId: profil.id,
      data: { consent: !consent },
    });
    if (result) setConsent(!consent);
    else dispatch(setError("not-completed") as UnknownAction);
  }, [consent]);

  return (
    <DetailComponent
      type="modal"
      noLabelColon
      noPadding
      labelFullWidth
      labelNoWrap
      account
      label={
        <h3 className="font-light subItem my-0 dark:text-grey300">
          {t("give-consent")}
        </h3>
      }
      value={
        <FormControlLabel
          className="dark:text-white m-0"
          sx={{
            "& .MuiTypography-root": {
              width: "max-content",
            },
          }}
          control={
            <Switch
              sx={{
                "& span": {
                  color: consent ? deepPurple[300] : grey[300],
                },
                "& .MuiSwitch-track": {
                  backgroundColor: `${
                    consent ? deepPurple[300] : grey[500]
                  } !important`,
                },
              }}
              value={consent}
              checked={consent}
              onChange={customUpdateConsent}
            />
          }
          label={consent ? t("consented") : t("not-consented")}
          labelPlacement="start"
        />
      }
    />
  );
};

export default NewIsPublicComponent;
