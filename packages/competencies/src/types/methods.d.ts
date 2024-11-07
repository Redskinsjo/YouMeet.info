import type {
  Competency,
  GetManyCompetenciesQueryVariables,
  GetOneCompetencyQueryVariables,
} from "./generated";

export declare function getOne(
  variables: GetOneCompetencyQueryVariables
): Promise<Competency | null>;

export declare function getMany(
  variables: GetManyCompetenciesQueryVariables
): Promise<Competency[] | null>;
