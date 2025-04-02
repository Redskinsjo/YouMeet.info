import { Translated } from "@youmeet/gql/generated";

export type ReducedArticle = { id?: string; title: Translated; slug?: string };

export type ReducedVideo = { id?: string; name: string; slug?: string };
