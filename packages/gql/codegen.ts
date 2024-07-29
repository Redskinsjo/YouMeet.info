import { CodegenConfig } from "@graphql-codegen/cli";
import { uri } from "@youmeet/functions/imports";

const config: CodegenConfig = {
  schema: `schema.graphql`,
  documents: ["./queries/*.graphql"],
  emitLegacyCommonJSImports: false,
  generates: {
    "./generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-resolvers",
        "typed-document-node",
      ],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
  require: ["ts-node"],
  overwrite: true,
};

export default config;
