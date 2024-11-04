import BoldText from "../../TextChild";
import { DynamicData, ParagraphWithTitleTypes } from "@youmeet/types/cgu";
import { grey } from "@mui/material/colors";
import Paragraph from "./Paragraph";

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
    <div className="p-[24px]">
      <div
        {...params}
        className={
          titles && titles?.length > 0
            ? "flex-center flex-col gap-[24px] p-[24px] w-full box-border rounded-lg bg-grey50 dark:extraLightDarkBg"
            : "flex-center flex-col gap-[24px] p-[24px] w-full box-border rounded-lg bg-grey100 dark:lightDarkBg"
        }
        style={{
          border:
            titles && titles?.length > 0 ? "none" : `0.5px solid ${grey[300]}`,
        }}
      >
        {!!title && <h2 className="item font-bold dark:text-white">{title}</h2>}
        {!!detail && !detail.variable && (
          <div className="legend">
            <BoldText text={`${detail}+`} align="justify" />
          </div>
        )}
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
        <Paragraph paragraph={paragraph} />
        {!!paragraphs &&
          paragraphs.map((par) => {
            const variable = (par.paragraph as DynamicData)?.variable;
            let key = par.title;
            if (!key && variable)
              key = (par.paragraph as DynamicData)?.content("ok")?.slice(0, 20);
            if (!key && !variable)
              key = (par.paragraph as string)?.slice(0, 20);
            return (
              <ParagraphWithTitle
                key={key}
                paragraph={par.paragraph}
                detail={par.detail}
                points={par.points}
                rgpd={par.rgpd}
                title={par.title}
                titles={par.titles}
                paragraphs={par.paragraphs}
              />
            );
          })}
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
              key={t.title?.slice(0, 9)}
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
    </div>
  );
}
