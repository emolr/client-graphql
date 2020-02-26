import { Pokemon as PokemonType } from '../../graphql/generated/types';
import { PokemonChoice } from './pokemon-choices';
import { getRandomNumberInRange, shuffle } from '../../utils';

export const getNextPokemonChoices = (
  pokemon: PokemonType,
  pokemons: PokemonChoice[]
): PokemonChoice[] => {
  const firstId = getRandomNumberInRange([pokemon.id]);
  const secondId = getRandomNumberInRange([pokemon.id, firstId]);
  const choices = [
    ...[firstId, secondId].map(id =>
      pokemons.find(pokemon => pokemon.id === id)
    ),
    pokemon
  ];

  return shuffle(choices);
};
