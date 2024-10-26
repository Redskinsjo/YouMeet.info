import {
  GetManyCompetencyQueryVariables,
  GetOneCompetencyQueryVariables,
} from "../generated";

export type getOneCompetency = (
  args: GetOneCompetencyQueryVariables
) => Promise<Competency | null>;
export type getManyCompetencies = (
  args: GetManyCompetencyQueryVariables
) => Promise<Competency[] | null>;
