import type {
  Competency,
  GetManyCompetenciesQueryVariables,
} from "./generated";

export declare function getMany(
  variables: GetManyCompetenciesQueryVariables
): Promise<Competency[] | null>;
