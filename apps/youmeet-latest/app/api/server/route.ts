import { createSchema, createYoga } from "graphql-yoga";
import resolvers from "@/resolvers";
import mongoose from "mongoose";
// import { schema as typeDefs } from "@youmeet/gql/imports";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const filename = fileURLToPath(import.meta.url);
const _dirname = dirname(filename);
const filepath = join(_dirname, "schema.graphql");

const typeDefs = readFileSync(filepath).toString("utf-8");

mongoose.connect(`${process.env.MONGODB_URI}`);

const schema = createSchema({
  typeDefs,
  resolvers,
});

console.log(typeDefs, "typeDefs");

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
