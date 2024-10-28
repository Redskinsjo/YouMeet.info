import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `https://www.youmeet.info/api/competencies`,
  documents: ["./src/queries/*.graphql"],
  emitLegacyCommonJSImports: false,
  generates: {
    "./types/generated.ts": {
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
  overwrite: true,
};

export default config;
