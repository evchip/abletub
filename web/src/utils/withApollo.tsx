import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PaginatedPosts } from "generated/graphql";
import { NextPageContext } from "next";
import { createWithApollo } from "./createWithApollo";
import withApollo from "next-with-apollo";
import { ApolloProvider } from '@apollo/react-hooks';

export default withApollo(
({initialState}: any) => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }).restore(initialState || {})
  });
}, 
{
  render: ({ Page, props }) => {
    return (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    );
  }
})
  


