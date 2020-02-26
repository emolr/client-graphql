import gql from 'graphql-tag';

export const Pokemons = gql`
  query Pokemons($first: Int) {
    pokemons(first: $first) {
      id
      name
    }
  }
`;
