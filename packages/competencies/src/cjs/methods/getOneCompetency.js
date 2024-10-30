const { uri, method, headers } = require("../../imports");
const { loadDocumentsSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const path = require("path");

const queryPath = path?.join(
  __dirname,
  "../../queries/GetOneCompetency.graphql"
);
const query = loadDocumentsSync(queryPath, {
  loaders: [new GraphQLFileLoader()],
});

Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Récupérer une compétence.
 * @argument {object} variables - Argument à passer. Requis.
 * @param {object} variables.data - Données à fournir pour filtrer les résultats.
 * @property {string} variables.data.title - Titre de la compétence.
 * @param {boolean} variables.includeDefinition - True, si vou souhaitez récupérer plus d'informations que seulement le title.
 */
async function getOneCompetency(variables) {
  try {
    const response = await fetch(uri, {
      method,
      headers,
      body: JSON.stringify({
        query: query[0].rawSDL,
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
}
exports.getOneCompetency = getOneCompetency;
