import { createSchema, createYoga } from "graphql-yoga";
import resolvers from "@/resolvers";
import mongoose from "mongoose";
import typeDefs from "@youmeet/gql/schema";
import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";

mongoose.connect(`${process.env.MONGODB_URI}`);

const schema = createSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga({
  graphqlEndpoint: "/api/server",
  schema,
  graphiql: true,
  cors: {
    origin: [`${process.env.API_DOMAIN}`, `${process.env.PRO_DOMAIN}`],
    allowedHeaders: ["X-Custom-Header"],
    methods: ["POST", "OPTIONS", "GET"],
    credentials: true,
  },
  plugins: [useDisableIntrospection()],
  async context(context) {
    context.request.headers.set(
      "Access-Control-Allow-Methods",
      "POST, OPTIONS"
    );
  },
  fetchAPI: { Response },
});

const handler = handleRequest as any;

export { handler as GET, handler as POST, handler as OPTIONS };
