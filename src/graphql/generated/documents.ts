import gql from 'graphql-tag';

export const PokemonChoicesPokemons = gql`
  query PokemonChoicesPokemons($first: Int) {
    pokemons(first: $first) {
      id
      name
    }
  }
`;
