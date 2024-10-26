import {
  GetManyCompetenciesQueryVariables,
  GetOneCompetencyQueryVariables,
} from "./generated";

/**
 * Récupérer une compétence.
 * @param {string} variables.id - ID de la compétence.
 * @param {string} variables.title - Titre de la compétence.
 * @param {string} variables.slug - Slug de la compétence.
 */

export declare function getOneCompetency(
  variables: GetOneCompetencyQueryVariables
): Promise<Competency | null>;

/**
 * Récupérer plusieurs compétence.
 * @argument {object} variables - Argument. Requis.
 * @param {object} variables.data - Données à fournir pour filtrer les résultats.
 * @property {string} variables.data.id - ID de la compétence.
 * @property {string} variables.data.title - Titre de la compétence.
 * @param {object} variables.params - Paramètres supplémentaires.
 * @property {number} variables.params.skip - Nombre de compétences à ignorer.
 * @property {number} variables.params.take - Nombre de compétences à récupérer. Défaut: 10.
 */
export declare function getManyCompetencies(
  variables: GetManyCompetenciesQueryVariables
): Promise<Competency[] | null>;
