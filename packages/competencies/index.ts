import resolvers from "./resolvers";
import mongoose from "mongoose";
import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { readFileSync } from "node:fs";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(`${process.env.MONGODB_URI}`);

const schemaFile = readFileSync("./schema.graphql").toString("utf-8");

const schema = createSchema({
  typeDefs: schemaFile,
  resolvers,
});

function main() {
  const yoga = createYoga({
    schema,
    graphiql: true,
    graphqlEndpoint: "/",
    cors: {
      origin: [`${process.env.WWW_DOMAIN}`, `${process.env.PRO_DOMAIN}`],
      allowedHeaders: ["X-Custom-Header"],
      methods: ["POST", "OPTIONS", "GET"],
      credentials: true,
    },
  });
  const server = createServer(yoga);
  server.listen(
    process.env.NODE_ENV === "development" ? 4000 : process.env.API_URI,
    () => {
      console.info("Server is running on http://localhost:4000/graphql");
    }
  );
}

main();
