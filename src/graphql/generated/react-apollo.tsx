import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Pokemon = {
  __typename?: 'Pokemon';
  id: Scalars['Int'];
  name: Scalars['String'];
  image: Scalars['String'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  pokemon: Pokemon;
  pokemons: Array<Pokemon>;
};


export type QueryPokemonArgs = {
  id: Scalars['Int'];
};


export type QueryPokemonsArgs = {
  offset?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
};

export type PokemonChoicesQueryQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
}>;


export type PokemonChoicesQueryQuery = { __typename?: 'Query', pokemons: Array<{ __typename?: 'Pokemon', id: number, name: string }> };


export const PokemonChoicesQueryDocument = gql`
    query PokemonChoicesQuery($first: Int) {
  pokemons(first: $first) {
    id
    name
  }
}
    `;
export type PokemonChoicesQueryComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PokemonChoicesQueryQuery, PokemonChoicesQueryQueryVariables>, 'query'>;

    export const PokemonChoicesQueryComponent = (props: PokemonChoicesQueryComponentProps) => (
      <ApolloReactComponents.Query<PokemonChoicesQueryQuery, PokemonChoicesQueryQueryVariables> query={PokemonChoicesQueryDocument} {...props} />
    );
    

/**
 * __usePokemonChoicesQueryQuery__
 *
 * To run a query within a React component, call `usePokemonChoicesQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePokemonChoicesQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePokemonChoicesQueryQuery({
 *   variables: {
 *      first: // value for 'first'
 *   },
 * });
 */
export function usePokemonChoicesQueryQuery(baseOptions?: Apollo.QueryHookOptions<PokemonChoicesQueryQuery, PokemonChoicesQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PokemonChoicesQueryQuery, PokemonChoicesQueryQueryVariables>(PokemonChoicesQueryDocument, options);
      }
export function usePokemonChoicesQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PokemonChoicesQueryQuery, PokemonChoicesQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PokemonChoicesQueryQuery, PokemonChoicesQueryQueryVariables>(PokemonChoicesQueryDocument, options);
        }
export type PokemonChoicesQueryQueryHookResult = ReturnType<typeof usePokemonChoicesQueryQuery>;
export type PokemonChoicesQueryLazyQueryHookResult = ReturnType<typeof usePokemonChoicesQueryLazyQuery>;
export type PokemonChoicesQueryQueryResult = Apollo.QueryResult<PokemonChoicesQueryQuery, PokemonChoicesQueryQueryVariables>;