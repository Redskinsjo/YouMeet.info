import { createSchema, createYoga } from "graphql-yoga";
import resolvers from "@/resolvers";
import mongoose from "mongoose";
import { join } from "path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

mongoose.connect(`${process.env.MONGODB_URI}`);

const typeDefs = loadSchemaSync(join(import.meta.url, "../schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schema = createSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga({
  graphqlEndpoint: "/api/server",
  schema,
  graphiql: false,
  cors: {
    origin: [`${process.env.API_DOMAIN}`, `${process.env.PRO_DOMAIN}`],
    allowedHeaders: ["X-Custom-Header"],
    methods: ["POST", "OPTIONS", "GET"],
    credentials: true,
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
