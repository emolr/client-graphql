import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export type PokemonChoicesQueryQueryVariables = {
  first?: Maybe<Scalars['Int']>;
};

export type PokemonChoicesQueryQuery = { __typename?: 'Query' } & {
  pokemons: Array<{ __typename?: 'Pokemon' } & Pick<Pokemon, 'id' | 'name'>>;
};

export const PokemonChoicesQueryDocument = gql`
  query PokemonChoicesQuery($first: Int) {
    pokemons(first: $first) {
      id
      name
    }
  }
`;
export type PokemonChoicesQueryComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    PokemonChoicesQueryQuery,
    PokemonChoicesQueryQueryVariables
  >,
  'query'
>;

export const PokemonChoicesQueryComponent = (
  props: PokemonChoicesQueryComponentProps
) => (
  <ApolloReactComponents.Query<
    PokemonChoicesQueryQuery,
    PokemonChoicesQueryQueryVariables
  >
    query={PokemonChoicesQueryDocument}
    {...props}
  />
);

export type PokemonChoicesQueryProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  PokemonChoicesQueryQuery,
  PokemonChoicesQueryQueryVariables
> &
  TChildProps;
export function withPokemonChoicesQuery<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    PokemonChoicesQueryQuery,
    PokemonChoicesQueryQueryVariables,
    PokemonChoicesQueryProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    PokemonChoicesQueryQuery,
    PokemonChoicesQueryQueryVariables,
    PokemonChoicesQueryProps<TChildProps>
  >(PokemonChoicesQueryDocument, {
    alias: 'pokemonChoicesQuery',
    ...operationOptions
  });
}
export type PokemonChoicesQueryQueryResult = ApolloReactCommon.QueryResult<
  PokemonChoicesQueryQuery,
  PokemonChoicesQueryQueryVariables
>;
