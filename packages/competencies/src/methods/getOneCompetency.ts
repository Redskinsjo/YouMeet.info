import { loadDocuments } from "@graphql-tools/load";
import { uri, method, headers } from "./imports";
import { GetOneCompetencyQueryVariables } from "src/types/generated";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const getOneCompetencyQuery = loadDocuments(
  "../queries/GetOneCompetencies.graphql",
  {
    loaders: [new GraphQLFileLoader()],
  }
);

export default async function getOneCompetency(
  variables: GetOneCompetencyQueryVariables
) {
  const response = await fetch(uri, {
    method,
    headers,
    body: JSON.stringify({
      query: getOneCompetencyQuery,
      variables,
    }),
  });
  const data = await response.json();

  return data;
}
