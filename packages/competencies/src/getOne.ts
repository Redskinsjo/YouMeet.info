import path from "path";
import type {
  Competency,
  GetOneCompetencyQueryVariables,
} from "./types/generated";
import { loadDocumentsSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { headers, method, uri } from "./imports";

const queryPath = path?.join(__dirname, "./queries/GetOneCompetency.graphql");
const query = loadDocumentsSync(queryPath, {
  loaders: [new GraphQLFileLoader()],
});

/**
 * Récupérer une compétence.
 * @argument {object} variables - Argument à passer. Requis.
 * @param {object} variables.data - Données à fournir pour filtrer les résultats.
 * @property {string} variables.data.title - Titre de la compétence.
 * @param {boolean} variables.includeDefinition - True, si vou souhaitez récupérer plus d'informations que seulement le title.
 */
export const getOne = async function (
  variables: GetOneCompetencyQueryVariables
): Promise<Competency | null> {
  try {
    if (!query || !query[0]) console.log("Query is null");
    const response = await fetch(uri, {
      method,
      headers,
      body: JSON.stringify({
        query: query[0]?.rawSDL,
        variables,
      }),
      cache: "no-store",
    });
    const res = await response.json();

    return res.data.oneCompetency;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
