export type DynamicData = {
  variable: string;
  content: (arg: string) => string;
};

export type ParagraphWithTitleTypes = {
  title: string;
  paragraph?: DynamicData | string;
  paragraphs?: DynamicData[] | string[];
  points?: string[] | DynamicData[];
  detail?: DynamicData;
  titles?: ParagraphWithTitleTypes[];
  rgpd?: boolean;
};
