import resolvers from "@youmeet/competencies/resolvers";
import mongoose from "mongoose";
import { createSchema, createYoga } from "graphql-yoga";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

mongoose.connect(`${process.env.MONGODB_URI}`);

const typeDefs = loadSchemaSync("competenciesAPISchema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const schema = createSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga({
  graphqlEndpoint: "/api/competencies",
  schema,
  graphiql: true,
  cors: {
    origin: "*",
    methods: ["POST", "OPTIONS"],
  },
  async context(context: any) {
    context.request.headers.set(
      "Access-Control-Allow-Methods",
      "POST, OPTIONS"
    );
  },
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
