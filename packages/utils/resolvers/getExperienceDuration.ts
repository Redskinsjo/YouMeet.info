import { ExperienceInput } from "../../gql/generated";

const endMs = (exp: ExperienceInput) =>
  exp.isLiveJob
    ? new Date().getTime()
    : new Date(exp.ending as string).getTime();
const startMs = (exp: ExperienceInput) =>
  new Date(exp.starting as string).getTime();

export const getExperienceDuration = (exp: ExperienceInput) => {
  const diffMs = endMs(exp) - startMs(exp);
  return Math.round(diffMs / 1000 / 3600 / 24 / 30);
};
