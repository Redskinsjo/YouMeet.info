import { BetaExperience } from "@youmeet/gql/generated";

export const endMs = (exp: BetaExperience) =>
  exp.isLiveJob
    ? new Date().getTime()
    : new Date(exp.ending as string).getTime();
export const startMs = (exp: BetaExperience) =>
  new Date(exp.starting as string).getTime();

const isCompatible = (
  profileExp: BetaExperience,
  candidateExp: BetaExperience,
) =>
  endMs(profileExp) > startMs(candidateExp) &&
  startMs(profileExp) < endMs(candidateExp);

export default isCompatible;
