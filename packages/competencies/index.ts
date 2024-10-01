import resolvers from "./resolvers";
import mongoose from "mongoose";
import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { readFileSync } from "node:fs";

mongoose.connect(`${process.env.MONGODB_URI}`);

const schemaFile = readFileSync("./schema.graphql").toString("utf-8");

const schema = createSchema({
  typeDefs: schemaFile,
  resolvers,
});

function main() {
  const yoga = createYoga({ schema, graphiql: true });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
