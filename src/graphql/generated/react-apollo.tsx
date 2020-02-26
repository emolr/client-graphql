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

export type PokemonChoicesPokemonsQueryVariables = {
  first?: Maybe<Scalars['Int']>;
};

export type PokemonChoicesPokemonsQuery = { __typename?: 'Query' } & {
  pokemons: Array<{ __typename?: 'Pokemon' } & Pick<Pokemon, 'id' | 'name'>>;
};

export const PokemonChoicesPokemonsDocument = gql`
  query PokemonChoicesPokemons($first: Int) {
    pokemons(first: $first) {
      id
      name
    }
  }
`;
export type PokemonChoicesPokemonsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    PokemonChoicesPokemonsQuery,
    PokemonChoicesPokemonsQueryVariables
  >,
  'query'
>;

export const PokemonChoicesPokemonsComponent = (
  props: PokemonChoicesPokemonsComponentProps
) => (
  <ApolloReactComponents.Query<
    PokemonChoicesPokemonsQuery,
    PokemonChoicesPokemonsQueryVariables
  >
    query={PokemonChoicesPokemonsDocument}
    {...props}
  />
);

export type PokemonChoicesPokemonsProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  PokemonChoicesPokemonsQuery,
  PokemonChoicesPokemonsQueryVariables
> &
  TChildProps;
export function withPokemonChoicesPokemons<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    PokemonChoicesPokemonsQuery,
    PokemonChoicesPokemonsQueryVariables,
    PokemonChoicesPokemonsProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    PokemonChoicesPokemonsQuery,
    PokemonChoicesPokemonsQueryVariables,
    PokemonChoicesPokemonsProps<TChildProps>
  >(PokemonChoicesPokemonsDocument, {
    alias: 'pokemonChoicesPokemons',
    ...operationOptions
  });
}
export type PokemonChoicesPokemonsQueryResult = ApolloReactCommon.QueryResult<
  PokemonChoicesPokemonsQuery,
  PokemonChoicesPokemonsQueryVariables
>;
