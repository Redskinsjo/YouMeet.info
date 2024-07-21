import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { fileURLToPath } from "url";
import { dirname } from "path";

const filename = fileURLToPath(import.meta.url);
const _dirname = dirname(filename);

export const schema = loadSchemaSync("schema.graphql", {
  loaders: [new GraphQLFileLoader()],
  cwd: _dirname,
});
