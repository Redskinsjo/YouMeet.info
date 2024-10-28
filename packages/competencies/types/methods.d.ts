import {
  GetManyCompetenciesQueryVariables,
  GetOneCompetencyQueryVariables,
} from "./generated";

/**
 * Récupérer une compétence.
 * @argument {object} variables - Argument à passer. Requis.
 * @param {string} variables.title - Titre de la compétence.
 * @param {boolean} variables.includeDefinition - True, si vou souhaitez récupérer plus d'informations que seulement le title.
 */

export declare function getOneCompetency(
  variables: GetOneCompetencyQueryVariables
): Promise<Competency | null>;

/**
 * Récupérer plusieurs compétence.
 * @argument {object} variables - Argument à passer. Requis.
 * @param {object} variables.data - Données à fournir pour filtrer les résultats.
 * @property {string} variables.data.title - Titre de la compétence.
 * @param {object} variables.params - Paramètres supplémentaires.
 * @property {number} variables.params.skip - Nombre de compétences à ignorer.
 * @property {number} variables.params.take - Nombre de compétences à récupérer. Défaut: 10.
 * @param {boolean} variables.includeDefinition - True, si vou souhaitez récupérer plus d'informations que seulement le title.
 */
export declare function getManyCompetencies(
  variables: GetManyCompetenciesQueryVariables
): Promise<Competency[] | null>;
