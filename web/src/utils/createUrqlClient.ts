import { cacheExchange, DataField, Resolver, Cache } from "@urql/exchange-graphcache";
import Router from "next/router";
import { dedupExchange, Exchange, fetchExchange, stringifyVariables } from "urql";
import { pipe, tap } from 'wonka';
import { DeletePostMutationVariables, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation, VoteMutationVariables } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import gql from 'graphql-tag';
import { isServer } from "./isServer";

export const errorExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('not authenticated')) {
        Router.replace('/login'); 
    }
    })
  );
};

export const cursorPagination = (): Resolver => {

  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isItInTheCache = cache.resolve(cache.resolve(entityKey, fieldKey) as string, "posts") 
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = []; 
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;

      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data)
      // console.log('issa data', data, hasMore)
    })

    
    return {
      __typename: "PaginatedPosts",
      hasMore, // true or false
      posts: results
    }
  };
};

function invalidateAllPosts(cache: Cache) {

    const allFields = cache.inspectFields("Query");
    const fieldInfos = allFields.filter(info => info.fieldName === "posts");
    fieldInfos.forEach((fi) => {
      cache.invalidate('Query', 'posts', fi.arguments || {});
    });
};


export const createUrqlClient = (ssrExchange: any, ctx: any) => { 
  let cookie = ''
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {

    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie 
      ? {
        cookie
      } : undefined,
    },
    exchanges: [dedupExchange, cacheExchange({
      keys: {
        PaginatedPosts: () => null,
      },
      resolvers: {
        Query: {
          posts: cursorPagination()
        }
      },
      updates: {
        Mutation: {
          deletePost: (_result, args, cache, info) => {
              cache.invalidate({__typename: '_Post', id: (args as DeletePostMutationVariables).id})
          },
          vote: (_result, args, cache, info) => {
            const {postId, value} = args as VoteMutationVariables
            const data = cache.readFragment(
              gql`
                fragment __ on _Post {
                  id
                  points
                  voteStatus
                }
              `,
              {id: postId} as any
            )
            if (data) {
              if (data.voteStatus === value) {
                return;
              }
              const newPointValue = (data.points as number) + value;
              cache.writeFragment(
                gql`
                  fragment __ on _Post {
                    points
                    voteStatus
                  }
                `,
                { id: postId, points: newPointValue, voteStatus: value } as any
              );
            }
          },
          createPost: (_result, args, cache, info) => {
            invalidateAllPosts(cache);
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery> (
              cache,
              {query: MeDocument},
              _result, 
              () => ({me: null}))
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache, 
              {query: MeDocument},
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  }
                }
             });
             invalidateAllPosts(cache);
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(cache, 
              {query: MeDocument},
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  }
                }
             })
          },
        }
      }
    }),
    errorExchange,
    ssrExchange,
    fetchExchange
    ],
  };
};