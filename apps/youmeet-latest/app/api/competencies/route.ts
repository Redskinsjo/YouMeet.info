import resolvers from "@youmeet/competencies-api-schema/resolvers";
import mongoose from "mongoose";
import { createSchema, createYoga } from "graphql-yoga";
import typeDefs from "@youmeet/competencies-api-schema/schema";
import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";
import { maxDepthPlugin } from "@escape.tech/graphql-armor-max-depth";

mongoose.connect(`${process.env.MONGODB_URI}`);

const schema = createSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga({
  graphqlEndpoint: "/api/competencies",
  schema,
  graphiql: false,
  cors: {
    origin: "*",
    methods: ["POST", "OPTIONS"],
  },
  plugins: [
    useDisableIntrospection(),
    maxDepthPlugin({
      n: 3,
    }),
  ],
  async context(context: any) {
    context.request.headers.set(
      "Access-Control-Allow-Methods",
      "POST, OPTIONS"
    );
  },
  fetchAPI: { Response },
});

const handler = handleRequest as any;

export { handler as GET, handler as POST, handler as OPTIONS };
