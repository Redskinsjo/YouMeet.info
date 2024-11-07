import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `https://www.youmeet.info/api/competencies`,
  documents: ["./src/queries/*.graphql"],
  emitLegacyCommonJSImports: false,
  generates: {
    "./src/types/generated.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
  overwrite: true,
};

export default config;
