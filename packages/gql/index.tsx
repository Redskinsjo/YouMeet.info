import React, { ReactElement } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AES } from "crypto-js";

const httpLink = createHttpLink({
  uri: `${process.env.API_URI}/api/server`,
});

const regex = /(?<=\/\/)[^\/_&?]+/gm;

const authLink = setContext((_, { headers }) => {
  const origin = headers.get("origin") || "";

  const match = origin.match(regex);
  const originHost = match ? match[0] : "";
  const encrypt = AES.encrypt(
    originHost,
    `${process.env.JWT_SECRET}`
  ).toString();

  console.log("Encrypted", encrypt);
  return {
    headers: {
      ...headers,
      "x-domain-youmeet": encrypt,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  ssrMode: true,
});

export default function GraphQLProvider({
  children,
}: {
  children: ReactElement;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
