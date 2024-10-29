import { uri, method, headers } from "./imports";
import { loadDocuments } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { Competency, GetOneCompetencyQueryVariables } from "../types/generated";

const query = loadDocuments("../queries/GetOneCompetency.graphql", {
  loaders: [new GraphQLFileLoader()],
});

/**
 * Récupérer une compétence.
 * @argument {object} variables - Argument à passer. Requis.
 * @param {object} variables.data - Données à fournir pour filtrer les résultats.
 * @property {string} variables.data.title - Titre de la compétence.
 * @param {boolean} variables.includeDefinition - True, si vou souhaitez récupérer plus d'informations que seulement le title.
 */
export default async function getOneCompetency(
  variables: GetOneCompetencyQueryVariables
): Promise<Competency | null> {
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
