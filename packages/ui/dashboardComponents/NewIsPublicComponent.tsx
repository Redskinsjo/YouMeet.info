"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { BetaUser, UpdateUserDocument, Video } from "@youmeet/gql/generated";
import DetailComponent from "../DetailComponent";
import { useTranslation } from "react-i18next";
import { client } from "@youmeet/gql/index";
import { deepPurple, grey } from "@mui/material/colors";
import TooltipedAsset from "../TooltipedAsset";
import { setError } from "@youmeet/global-config/features/global";
import { UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { onUpdateisPublic } from "@youmeet/functions/actions";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { useRouter } from "next/navigation";

const NewIsPublicComponent = ({ profil }: { profil: BetaUser }) => {
  const [isPublic, setIsPublic] = useState(profil.isPublic ?? false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const cantEnable =
    !isPublic &&
    (!profil.candidate ||
      !profil.candidate.avatars ||
      profil.candidate?.avatars?.length === 0 ||
      (profil.videos as Video[]).length === 0 ||
      !profil?.candidate?.targetJob?.id);

  const automaticUpdateIsPublic = useCallback(async () => {
    if ((profil.videos as Video[]).length === 0) {
      const response = await client.mutate({
        mutation: UpdateUserDocument,
        variables: { data: { isPublic: false }, userId: profil.id },
      });
      const updated = response.data?.updateUser;
      if (updated) setIsPublic(updated.isPublic as boolean);
    }
  }, [profil.videos]);

  const customUpdateIsPublic = useCallback(async () => {
    const result = await onUpdateisPublic(profil.id as string, !isPublic);
    if (result && isPayloadError(result)) {
      dispatch(setError("not-completed") as UnknownAction);
    } else setIsPublic(!isPublic);
  }, [isPublic]);

  useEffect(() => {
    if (profil?.id) automaticUpdateIsPublic();
  }, [profil.videos]);

  return cantEnable ? (
    <TooltipedAsset asset={t("should-fulfill-profile")}>
      <div>
        <DetailComponent
          type="modal"
          noLabelColon
          noPadding
          labelNoWrap
          account
          newStyles={{
            cursor: cantEnable ? "not-allowed" : "pointer",
          }}
          label={
            <h3 className="font-light subItem my-0 dark:text-grey300">
              {t("set-profile-isPublic")}
            </h3>
          }
          value={
            <FormControlLabel
              className="dark:text-white dark:darkDisabled m-0"
              sx={{
                "& .MuiTypography-root": {
                  width: "max-content",
                },
              }}
              control={
                <Switch
                  disabled={cantEnable}
                  value={isPublic}
                  checked={isPublic}
                  sx={{
                    cursor: cantEnable ? "not-allowed" : "pointer",
                    "& span": {
                      color: isPublic ? deepPurple[300] : grey[300],
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: `${
                        isPublic ? deepPurple[300] : grey[500]
                      } !important`,
                    },
                    "& .Mui-disabled ~ .MuiSwitch-track ": {
                      opacity: "0.38 !important",
                    },
                  }}
                  onChange={async (e) => {
                    if (cantEnable) return;
                    customUpdateIsPublic();
                  }}
                />
              }
              label={isPublic ? t("visible") : t("unvisible")}
              labelPlacement="start"
            />
          }
        />
      </div>
    </TooltipedAsset>
  ) : (
    <DetailComponent
      type="modal"
      noLabelColon
      noPadding
      labelFullWidth
      account
      label={
        <h3 className="font-light subItem my-0 dark:text-grey300">
          {t("set-profile-isPublic")}
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
              value={isPublic}
              checked={isPublic}
              sx={{
                "& span": {
                  color: isPublic ? deepPurple[300] : grey[300],
                },
                "& .MuiSwitch-track": {
                  backgroundColor: `${
                    isPublic ? deepPurple[300] : grey[500]
                  } !important`,
                },
              }}
              onChange={customUpdateIsPublic}
            />
          }
          label={isPublic ? t("visible") : t("unvisible")}
          labelPlacement="start"
        />
      }
    />
  );
};

export default NewIsPublicComponent;
