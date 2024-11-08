import {
  Competency,
  GetManyCompetenciesQueryVariables,
  GetOneCompetencyQueryVariables,
} from "./generated.js";

export declare function getOne(
  variables: GetOneCompetencyQueryVariables
): Promise<Competency | null>;

export declare function getMany(
  variables: GetManyCompetenciesQueryVariables
): Promise<Competency[] | null>;
