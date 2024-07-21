import React from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: `${process.env.API_URI}/api/server`,
});

export const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  ssrMode: true,
});

export default function GraphQLProvider({ children }: any) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
