import BoldText from "../../BoldText";
import { DynamicData, ParagraphWithTitleTypes } from "@youmeet/types/cgu";
import { grey } from "@mui/material/colors";
import React from "react";

export default function ParagraphWithTitle({
  title,
  paragraph,
  paragraphs,
  points,
  detail,
  titles,
  rgpd,
}: ParagraphWithTitleTypes) {
  let params = {};
  if (rgpd) params = { "ng-bind-html": "rgpdHTML" };
  return (
    <div
      {...params}
      className={
        titles && titles?.length > 0
          ? "flex-center flex-col gap-[24px] p-[24px] rounded-lg bg-grey50 dark:extraLightDarkBg"
          : "flex-center flex-col gap-[24px] p-[24px] rounded-lg bg-grey100 dark:lightDarkBg"
      }
      style={{
        border:
          titles && titles?.length > 0 ? "none" : `0.5px solid ${grey[300]}`,
      }}
    >
      {!!title && <h2 className="item font-bold dark:text-white">{title}</h2>}
      {!!detail && !!detail.variable && (
        <div className="legend">
          <BoldText
            text={`${(detail as DynamicData).content(
              (detail as DynamicData).variable
            )}+`}
            align="justify"
          />
        </div>
      )}
      {!!paragraph && !(paragraph as DynamicData).variable && (
        <div className="legend">
          <BoldText text={`${paragraph}+`} align="justify" />
        </div>
      )}
      {!!paragraph && (paragraph as DynamicData).variable && (
        <div className="legend">
          <BoldText
            text={`${(paragraph as DynamicData).content(
              (paragraph as DynamicData).variable
            )}+`}
            align="justify"
          />
        </div>
      )}
      {!!paragraphs &&
        paragraphs.map((par) =>
          (par as DynamicData).variable ? (
            <div
              className="legend"
              key={(par as DynamicData)
                .content((par as DynamicData).variable)
                .slice(0, 20)}
            >
              <BoldText
                text={`${(par as DynamicData).content(
                  (par as DynamicData).variable
                )}+`}
                align="justify"
              />
            </div>
          ) : (
            <div className="legend" key={(par as string).slice(0, 20)}>
              <BoldText text={`${par}+`} align="justify" />
            </div>
          )
        )}
      {!!points && (
        <ul className="flex flex-col">
          {points.map((point) =>
            (point as DynamicData)?.variable ? (
              <BoldText
                key={(point as DynamicData)
                  .content((point as DynamicData)?.variable)
                  .slice(0, 20)}
                component="li"
                fontSizeClass="dark:darkLi legend"
                text={`${(point as DynamicData).content(
                  (point as DynamicData).variable
                )}+`}
                align="justify"
              />
            ) : (
              <BoldText
                key={(point as string).slice(0, 20)}
                component="li"
                fontSizeClass="dark:darkLi legend"
                text={`${point}+`}
                align="justify"
              />
            )
          )}
        </ul>
      )}
      {!!titles &&
        titles.map((t: ParagraphWithTitleTypes) => (
          <ParagraphWithTitle
            key={t.title.slice(0, 9)}
            title={t.title}
            paragraph={t.paragraph}
            paragraphs={t.paragraphs}
            detail={t.detail}
            points={t.points}
            titles={t.titles}
            rgpd={t.rgpd}
          />
        ))}
    </div>
  );
}
