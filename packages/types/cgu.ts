export type DynamicData = {
  variable: string;
  content: (arg: string) => string;
};

export type ParagraphWithTitleTypes = {
  title?: string;
  paragraph?: DynamicData | string;
  paragraphs?: Omit<ParagraphWithTitleTypes[], "paragraphs">;
  points?: string[] | DynamicData[];
  detail?: DynamicData;
  titles?: ParagraphWithTitleTypes[];
  rgpd?: boolean;
};
