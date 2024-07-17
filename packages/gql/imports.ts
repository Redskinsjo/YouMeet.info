import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

export const schema = await loadSchema("schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});
