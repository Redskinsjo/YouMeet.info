import resolvers from "@youmeet/competencies/resolvers";
import mongoose from "mongoose";
import { createSchema, createYoga } from "graphql-yoga";
import typeDefs from "@youmeet/competencies-api-schema";

mongoose.connect(`${process.env.MONGODB_URI}`);

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
