type ConversationThemeType = "general" | "technical" | "behavorial";

export type ConversationTheme = {
  type: ConversationThemeType;
  text: string;
  prefix: string;
};
