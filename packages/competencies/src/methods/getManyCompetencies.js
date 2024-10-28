import { uri, method, headers } from "./imports";
import { loadDocuments } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const query = loadDocuments("../queries/GetManyCompetencies.graphql", {
  loaders: [new GraphQLFileLoader()],
});

export default async function getManyCompetency(variables) {
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
  }
}
