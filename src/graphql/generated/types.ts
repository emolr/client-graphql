export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
