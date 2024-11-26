import { useCallback, useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import { BetaUser } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@youmeet/global-config/store";
import { GlobalState, setTab } from "@youmeet/global-config/features/global";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DashboardTabs({ profil }: { profil: BetaUser }) {
  const tab = useSelector(
    (state: RootState) => (state.global as GlobalState).tab
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      dispatch(setTab(newValue));
      localStorage.setItem("dashboardTab", newValue.toString());
    },
    []
  );

  useEffect(() => {
    const tab = localStorage.getItem("dashboardTab");
    if (tab) dispatch(setTab(parseInt(tab)));
  }, []);

  return (
    <Tabs
      value={tab}
      onChange={handleChange}
      className="px-[24px] dark:extraLightDarkBg overflow-x-scroll"
      sx={{
        "& .MuiTabs-flexContainer": {
          overflowX: "scroll",
        },
      }}
    >
      <Tab
        className="dark:text-white"
        label={t("analytics")}
        {...a11yProps(0)}
      />
      <Tab className="dark:text-white" label={t("job")} {...a11yProps(1)} />
      <Tab className="dark:text-white" label={t("video")} {...a11yProps(1)} />
      <Tab className="dark:text-white" label={t("notice")} {...a11yProps(2)} />
      {!!profil.affiliations && profil.affiliations.length > 0 && (
        <Tab
          className="dark:text-white"
          label={t("affiliates")}
          {...a11yProps(3)}
        />
      )}
    </Tabs>
  );
}
