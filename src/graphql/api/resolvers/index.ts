import { Pokemon, PokemonImage, PokemonType, Pokemons } from './Pokemon';
import { Resolvers } from '../generated/resolvers-types';

export const resolvers: Resolvers = {
  Query: {
    pokemon: Pokemon,
    pokemons: Pokemons
  },
  Pokemon: {
    image: PokemonImage,
    type: PokemonType
  }
};
