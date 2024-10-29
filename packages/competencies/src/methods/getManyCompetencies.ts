import { uri, method, headers } from "./imports";
import { loadDocuments } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import {
  Competency,
  GetManyCompetenciesQueryVariables,
} from "../types/generated";

const query = loadDocuments("../queries/GetManyCompetencies.graphql", {
  loaders: [new GraphQLFileLoader()],
});

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
export default async function getManyCompetency(
  variables: GetManyCompetenciesQueryVariables
): Promise<Competency[] | null> {
  try {
    const response = await fetch(uri, {
      method,
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: "no-store",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
