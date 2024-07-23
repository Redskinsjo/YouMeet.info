import { GptCompetency } from "@youmeet/gql/generated";

export default function CompetencyMainTitle({
  competency,
}: {
  competency: GptCompetency;
}) {
  const title = competency?.title
    ? competency?.title[0].toUpperCase() + competency?.title.slice(1)
    : "";
  return (
    <div className="flex w-full">
      <div className="flex-1 flex-center px-[48px] xs:px-[12px] sm:px-[12px]">
        {title && (
          <h1 role="heading" className="m-0 dark:text-white">
            {title}
          </h1>
        )}
      </div>
      <div className="flex-1 px-[48px] xs:px-[12px] sm:px-[12px]"></div>
    </div>
  );
}
