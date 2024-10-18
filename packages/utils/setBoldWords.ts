import { getCompetencySlug } from "@youmeet/functions/request";
import {
  GetCompetenciesTitleDocument,
  Competency,
} from "@youmeet/gql/generated";
import { isCompetency } from "@youmeet/types/TypeGuards";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const useLinksRegex = () => {
  const { data, loading } = useQuery(GetCompetenciesTitleDocument);
  const [regex, setRegex] = useState<RegExp | string>("");
  useEffect(() => {
    if (!loading) {
      if (data?.competencies) {
        const regex = new RegExp(
          data?.competencies?.map((comp) => comp?.title).join("|"),
          "gi"
        );
        setRegex(regex);
      }
    }
  }, [loading]);

  return regex;
};

const isIntertwining = (text: string, word: string) => {
  const index = text.indexOf(word);

  const hasIncluded = word.includes("@");

  const preStr = text.slice(0, index).split("").toReversed();
  const isInside = preStr.reduce(
    (acc, curr) => {
      if (curr === "@" && !acc.foundEnd) return { ...acc, result: true };
      if (curr === "=") return { ...acc, foundEnd: true };
      return acc;
    },
    { foundEnd: false, result: false }
  );

  return hasIncluded || isInside.result;
};

export const setBoldWords = async (
  text: string,
  regex: RegExp | string,
  noEndingFormatting: boolean = false
): Promise<undefined | { text: string; slugs: { [key: number]: string } }> => {
  if (text && regex) {
    const found = [...new Set(text.match(regex))];

    let copy = text;
    let slugs = {};
    for (let i = 0; i < found.length; i++) {
      const keyword = found[i];
      const comp = (await getCompetencySlug<Competency>({
        title: keyword,
      })) as Competency;
      if (comp && isCompetency(comp)) {
        if (comp?.slug && !isIntertwining(copy, keyword)) {
          (slugs as any)[i] = comp.slug;
          copy = copy.replaceAll(keyword, `@${keyword}${i}=`);
        }
      }
    }

    copy = noEndingFormatting ? `${copy}` : `${copy}+`;

    return { text: copy, slugs };
  }
  return undefined;
};
