"use client";
import DetailComponent from "../DetailComponent";
import { deepPurple, grey } from "@mui/material/colors";
import { FormControlLabel, Switch, useMediaQuery } from "@mui/material";
import { UserState } from "@youmeet/global-config/features/user";
import { RootState } from "@youmeet/global-config/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Switches() {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const user = useSelector((state: RootState) => state.user as UserState);
  const { t } = useTranslation();

  return (
    <div className="flex gap-[12px] xs:gap-[3px] sm:gap-[3px] md:gap-[3px]">
      <DetailComponent
        type="modal2"
        noLabelColon
        noPadding
        label={<></>}
        value={
          <FormControlLabel
            sx={{ margin: xs || sm || md ? "0px" : "inherit" }}
            className="m-0"
            control={
              <Switch
                value={user.videos.length > 0 ? true : false}
                checked={user.videos.length > 0 ? true : false}
                sx={{
                  "& span": {
                    color: user.videos.length > 0 ? deepPurple[300] : grey[300],
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: `${
                      user.videos.length > 0 ? deepPurple[300] : grey[500]
                    } !important`,
                  },
                }}
              />
            }
            label={t("video")}
            labelPlacement="start"
          />
        }
      />
      <DetailComponent
        type="modal2"
        noPadding
        noLabelColon
        label={<></>}
        value={
          <FormControlLabel
            sx={{ margin: xs || sm || md ? "0px" : "inherit" }}
            className="m-0"
            control={
              <Switch
                value={user.cvFile ? true : false}
                checked={user.cvFile ? true : false}
                sx={{
                  "& span": {
                    color: user.cvFile ? deepPurple[300] : grey[300],
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: `${
                      user.cvFile ? deepPurple[300] : grey[500]
                    } !important`,
                  },
                }}
              />
            }
            label={t("cv")}
            labelPlacement="start"
          />
        }
      />
    </div>
  );
}
