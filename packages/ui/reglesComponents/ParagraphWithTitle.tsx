type DynamicData = { variable: string; content: (arg: string) => string };

export default function ParagraphWithTitle({
  title,
  paragraph,
  points,
  detail,
}: {
  title: string;
  paragraph: DynamicData | string | undefined;
  points: string[] | undefined;
  detail: DynamicData | undefined;
}) {
  return (
    <div className="flex-center flex-col gap-[24px] bg-grey200 p-[24px] border-[0.5px] border-solid border-grey300 rounded-lg hover:bg-grey100">
      {title && <div className="item">{title}</div>}
      {detail && detail.variable && (
        <div className="legend">
          {(detail as DynamicData).content((detail as DynamicData).variable)}
        </div>
      )}
      {paragraph && !(paragraph as DynamicData).variable && (
        <div className="legend">{paragraph as string}</div>
      )}
      {paragraph && (paragraph as DynamicData).variable && (
        <div className="legend">
          {(paragraph as DynamicData).content(
            (paragraph as DynamicData).variable
          )}
        </div>
      )}
      {points && (
        <ul className="flex flex-col">
          {points.map((point) => (
            <li key={point.slice(0, 7)} className="darkLi legend">
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
