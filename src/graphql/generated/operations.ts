export type Maybe<T> = T | null;
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

export type PokemonsQueryVariables = {
  first?: Maybe<Scalars['Int']>;
};

export type PokemonsQuery = { __typename?: 'Query' } & {
  pokemons: Array<{ __typename?: 'Pokemon' } & Pick<Pokemon, 'id' | 'name'>>;
};
