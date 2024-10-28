import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `http://localhost:3000/api/competencies`,
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
  },
  overwrite: true,
};

export default config;
