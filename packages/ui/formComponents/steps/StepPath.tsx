import { Stepper, Step, Box, StepLabel, useMediaQuery } from "@mui/material";
import { purple } from "@mui/material/colors";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type StepPathProps = {
  category: "profile" | "organisation";
  step: 1 | 2 | 3;
  handleStepNavigation: (
    type: "previous" | "next" | "direct" | "home",
    value?: number,
  ) => void;
};

const mapStepsFrom = (t: any) => ({
  profile: [
    t("me-profile-personal-infos"),
    t("me-profile-job-infos"),
    t("me-profile-contact-infos"),
  ],
  organisation: [
    t("me-organisation-public-infos"),
    t("me-profile-personal-infos"),
  ],
});

const StepPath = ({ step, handleStepNavigation, category }: StepPathProps) => {
  const [skipped] = useState(new Set<number>());
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:1000px)");
  const { t } = useTranslation();
  const steps = mapStepsFrom(t)[category];

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  return (
    <>
      <Stepper
        activeStep={step - 1}
        className="min-h-[26px] flex flex-col justify-around absolute top-[24px] w-full rounded-2xl"
        style={{
          padding: xs ? 0 : 12,
          top: xs ? 92 : sm ? 130 : 24,
        }}
        connector={<></>}
      >
        <>
          <h1 className="text-center">{t("the-form")}</h1>
          <Box sx={{ display: "flex", gap: "3px" }}>
            {steps.map((label: string, index: number) => {
              const stepProps: { $completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepSkipped(index)) {
                stepProps.$completed = false;
              }

              const pro = false;

              let returnedLabel;
              if (pro && md && !xs && !sm && index === 0) returnedLabel = "Pro";
              if (pro && md && !xs && !sm && index === 1)
                returnedLabel = "Perso";
              if (!pro && md && !xs && !sm && index === 0)
                returnedLabel = "Perso";
              if (!pro && md && !xs && !sm && index === 1)
                returnedLabel = "Pro";
              if (!pro && md && !xs && !sm && index === 2)
                returnedLabel = "Contact";

              return (
                <Step
                  key={label}
                  {...stepProps}
                  sx={{ padding: xs ? "0px 2px" : "inherit" }}
                >
                  <Box
                    sx={
                      index < step - 1
                        ? {
                            "&:hover": {
                              backgroundColor: `${purple[700]} !important`,
                              cursor: "pointer",
                              padding: "4px",
                            },
                            ".MuiStepLabel-label": {
                              fontWeight: 400,
                            },
                            "&:hover .MuiStepLabel-label": {
                              color: "white",
                            },
                            "&:hover .MuiSvgIcon-root": {
                              color: purple[50],
                            },
                          }
                        : {}
                    }
                    className={
                      index !== step - 1
                        ? "cursor-pointer path-step bg-cyan50"
                        : "cursor-default path-step bg-purple700"
                    }
                    onClick={() => {
                      handleStepNavigation("direct", index + 1);
                    }}
                    style={{
                      padding: xs ? "4px" : sm ? "8px 16px" : "10px 22px",
                    }}
                  >
                    <StepLabel
                      {...labelProps}
                      StepIconProps={{
                        className:
                          index !== step - 1
                            ? "cursor-pointer rounded-full"
                            : "cursor-default rounded-full",
                      }}
                      componentsProps={{
                        label: {
                          className:
                            index !== step - 1
                              ? "cursor-pointer truncate legend font-semibold"
                              : "cursor-default truncate legend text-white",
                        },
                      }}
                      sx={{
                        ".Mui-completed": {
                          svg: {
                            color: purple[900],
                          },
                        },
                        ".MuiSvgIcon-root.Mui-active": {
                          color: purple[500],
                        },
                        ".MuiSvgIcon-root": {
                          color: purple[100],
                        },
                      }}
                      style={{ fontSize: 9 }}
                    >
                      {md && !sm && !xs ? returnedLabel : label}
                    </StepLabel>
                  </Box>
                </Step>
              );
            })}
          </Box>
        </>
      </Stepper>
    </>
  );
};

export default StepPath;
