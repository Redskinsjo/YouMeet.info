const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { loadDocumentsSync } = require("@graphql-tools/load");
const path = require("path");
const { headers, method, uri } = require("./imports");

const queryPath = path.join(
  __dirname,
  "./../queries/GetManyCompetencies.graphql"
);
const query = loadDocumentsSync(queryPath, {
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
const getMany = async function (variables) {
  if (!query || !query[0]) console.log("Query is null");
  try {
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

    return res.data.competencies;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
exports.getMany = getMany;
