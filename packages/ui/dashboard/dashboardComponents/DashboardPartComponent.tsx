"use client";
import NewTargetJobComponent from "./NewTargetJobComponent";
import { BetaUser } from "@youmeet/gql/generated";
import NewConsentComponent from "./NewConsentComponent";
import NewTargetContractTypeComponent from "./NewTargetContractTypeComponent";
import NewVideoComponent from "./NewVideoComponent";
import ProfileViewsComponent from "./ProfileViewsComponent";
import { Tab, Tabs, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UserNotices from "./UserNotices";
import AffiliatesComponent from "./AffiliatesComponent";
import dynamic from "next/dynamic";

const DashboardAddFTExperiences = dynamic(
  () => import("./DashboardAddFTExperiences"),
  { ssr: false }
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="p-[24px]">{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DashboardPartComponent({
  profil,
}: {
  profil: BetaUser;
}) {
  const { t } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const [value, setValue] = useState(0);

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      localStorage.setItem("dashboardTab", newValue.toString());
    },
    []
  );

  useEffect(() => {
    const tab = localStorage.getItem("dashboardTab");
    if (tab) setValue(parseInt(tab));
  }, []);

  return (
    <div className="w-full flex flex-col gap-[6px] xs:gap-[1px] sm:gap-[1px] md:gap-[1px] bg-white dark:extraLightDarkBg">
      <DashboardAddFTExperiences />
      <div className="border-[0.5px] border-solid border-grey300 dark:border-grey900 xs:max-w-full sm:max-w-full md:max-w-full w-full flex flex-col gap-[6px] xs:gap-[1px] sm:gap-[1px] md:gap-[1px] bg-white dark-extraLightDarkBg">
        <Tabs
          value={value}
          onChange={handleChange}
          className="px-[24px] dark:extraLightDarkBg"
          aria-label="basic tabs example"
        >
          <Tab
            className="dark:text-white"
            label={t("analytics")}
            {...a11yProps(0)}
          />
          <Tab className="dark:text-white" label={t("job")} {...a11yProps(1)} />
          <Tab
            className="dark:text-white"
            label={t("video")}
            {...a11yProps(1)}
          />
          <Tab
            className="dark:text-white"
            label={t("notice")}
            {...a11yProps(2)}
          />
          {!!profil.affiliations && profil.affiliations.length > 0 && (
            <Tab
              className="dark:text-white"
              label={t("affiliates")}
              {...a11yProps(3)}
            />
          )}
        </Tabs>

        <div className="dark:extraLightDarkBg">
          <CustomTabPanel value={value} index={0}>
            <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
              <ProfileViewsComponent
                width={xs || sm ? 300 : 400}
                height={xs || sm ? 225 : 300}
                profil={profil}
                hideTooltip={() => {}}
                showTooltip={() => {}}
                tooltipOpen={false}
                updateTooltip={() => {}}
              />
            </div>
            {/* <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
              <NewIsPublicComponent profil={profil} />
            </div> */}
            {/* <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
              <NewConsentComponent profil={profil} />
            </div> */}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
              <NewTargetJobComponent profil={profil} />
            </div>
            <div className="indent-4 xs:indent-0 border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify p-[12px]">
              <NewTargetContractTypeComponent profil={profil} />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="indent-4 xs:indent-0 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify">
              <NewVideoComponent profil={profil} />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div className="indent-4 xs:indent-0 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify">
              <UserNotices />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <div className="indent-4 xs:indent-0 dark:extraLightDarkBg sm:indent-0 md:indent-0 text-justify">
              <AffiliatesComponent profil={profil} />
            </div>
          </CustomTabPanel>

          {/* <div className="indent-4 xs:indent-0 sm:indent-0 md:indent-0 text-justify border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg">
        <NewExperiencesDisplay profil={profil} />
      </div> */}
        </div>
      </div>
    </div>
  );
}
