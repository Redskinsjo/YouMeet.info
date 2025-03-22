import { ReactElement } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AES } from "crypto-js";
import { onError } from "@apollo/client/link/error";

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: `${process.env.API_URI}/api/server`,
});

const regex = /(?<=\/\/)[^\/_&?]+/gm;

const authLink = setContext(() => {
  const encrypt = AES.encrypt("app", `${process.env.JWT_SECRET}`).toString();

  return {
    headers: {
      "x-domain-youmeet": encrypt,
    },
  };
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
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
