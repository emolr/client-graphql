import gql from 'graphql-tag';

export const PokemonChoicesQuery = gql`
    query PokemonChoicesQuery($first: Int) {
  pokemons(first: $first) {
    id
    name
  }
}
    `;