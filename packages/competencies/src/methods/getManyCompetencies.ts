import { loadDocuments } from "@graphql-tools/load";
import { uri, method, headers } from "./imports";
import { GetManyCompetencyQueryVariables } from "src/types/generated";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const getManyCompetencyQuery = loadDocuments(
  "../queries/GetManyCompetencies.graphql",
  {
    loaders: [new GraphQLFileLoader()],
  }
);

export default async function getManyCompetency(
  variables: GetManyCompetencyQueryVariables
) {
  const response = await fetch(uri, {
    method,
    headers,
    body: JSON.stringify({
      query: getManyCompetencyQuery,
      variables,
    }),
  });
  const data = await response.json();

  return data;
}
