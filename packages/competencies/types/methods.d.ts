import {
  GetManyCompetencyQueryVariables,
  GetOneCompetencyQueryVariables,
} from "./generated";

/**
 * Method to get one competency
 * @param variables Arguments to get a competency
 */
export declare function getOneCompetency(
  variables: GetOneCompetencyQueryVariables
): Promise<Competency | null>;

/**
 * Method to get many competencies
 * @param variables Arguments to get many competencies
 */
export declare function getOneCompetency(
  variables: GetManyCompetencyQueryVariables
): Promise<Competency[] | null>;
