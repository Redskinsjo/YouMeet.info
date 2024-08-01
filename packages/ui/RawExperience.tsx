import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import RawValue from "./RawValue";
import { useTranslation } from "react-i18next";
import { formatToDatetime } from "@youmeet/utils/formatToDatetime";
import { BetaExperience } from "@youmeet/gql/generated";
import { outfit } from "@youmeet/functions/fonts";

const RawExperience = ({
  exp,
  index,
  array,
}: {
  exp: BetaExperience;
  index: number;
  array: BetaExperience[];
}) => {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const companyName = exp.company?.name ?? exp.companyName;

  return (
    <div key={`${(exp?.job as string) + index}`} className="w-full">
      <div
        className="dark:darkBg bg-grey100"
        style={{
          width: "100%",
          borderRadius: "14px",
          border: `0.5px solid ${grey[300]}`,
          boxSizing: "border-box",
        }}
      >
        <div
          className="dark:darkBg bg-white"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            color: "white",
            border: `0.5px solid ${grey[300]}`,
            padding: xs || sm ? "8px" : "12px",
            borderRadius: "14px",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: xs ? "center" : "inherit",
              gap: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
              }}
            >
              <div
                className="dark:text-grey600 text-blueGrey900"
                style={{
                  fontSize: "12px",
                  position: "relative",
                  left: "8px",
                  height: "18px",
                }}
              >
                {t("me-profile-infos-label-job")}
              </div>
              {exp.job?.title ? (
                <RawValue
                  field={exp.job?.title[language as "en" | "fr"] as string}
                  newStyles={{
                    container: {
                      flex: 1,
                      margin: "0px",
                    },
                    padding: "6px",
                    fontWeight: "bold",
                    fontSize: sm ? 14 : 18,
                    width: "max-content",
                    maxWidth: "170px",
                    whiteSpace: "nowrap",
                    overflow: "scroll",
                    ...outfit.style,
                  }}
                />
              ) : undefined}
            </Box>

            {exp.starting && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <p
                  className="dark:text-grey600 text-blueGrey900"
                  style={{
                    fontSize: "12px",
                    position: "relative",
                    left: "8px",
                    height: "18px",
                  }}
                >
                  {t("duration")}
                </p>
                <RawValue
                  field={`${
                    exp.ending
                      ? Math.floor(
                          (new Date(exp.ending).getTime() -
                            new Date(exp.starting).getTime()) /
                            1000 /
                            3600 /
                            24 /
                            30
                        )
                      : Math.floor(
                          (new Date().getTime() -
                            new Date(exp.starting).getTime()) /
                            1000 /
                            3600 /
                            24 /
                            30
                        )
                  } ${t("month")}`}
                  newStyles={{
                    container: {
                      margin: "0px",
                      height: "100%",
                    },
                    padding: "6px",
                    width: "max-content",
                    fontSize: sm ? 13 : "inherit",
                    ...outfit.style,
                  }}
                />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              marginLeft: "12px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {companyName && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <p
                  className="dark:text-grey600 text-blueGrey900"
                  style={{
                    fontSize: "12px",
                    position: "relative",
                    left: "8px",
                    height: "18px",
                  }}
                >
                  {t("me-profile-infos-label-company")}
                </p>
                <RawValue
                  field={companyName}
                  newStyles={{
                    container: {
                      flex: 1,
                      margin: "0px",
                      height: "100%",
                    },
                    fontWeight: "bold",
                    padding: "6px",
                    fontSize: sm ? 13 : "inherit",
                    width: "max-content",
                    maxWidth: "170px",
                    whiteSpace: "nowrap",
                    overflow: "scroll",
                    ...outfit.style,
                  }}
                />
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <p
                className="dark:text-grey600 text-blueGrey900"
                style={{
                  fontSize: "12px",
                  position: "relative",
                  left: "8px",
                  height: "18px",
                }}
              >
                {t("me-profile-infos-label-ending")}
              </p>
              <RawValue
                field={
                  exp.isLiveJob
                    ? t("me-profile-infos-label-isLiveJob")
                    : formatToDatetime(exp.ending, true, true, true, language)
                }
                newStyles={{
                  container: { margin: "0px", height: "100%" },
                  padding: "6px",
                  fontSize: sm ? 13 : "inherit",
                  ...outfit.style,
                }}
              />
            </Box>
          </Box>
        </div>
        {/* </Box> */}
      </div>

      {array && index !== array.length - 1 && (
        <Box
          sx={{
            height: "3px",
            borderRadius: "14px",
            backgroundColor: grey[300],
          }}
        ></Box>
      )}
    </div>
  );
};

export default RawExperience;
