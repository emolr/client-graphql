import { ApolloError } from '@landingexp/apollo-server-errors';
import { QueryResolvers, PokemonResolvers } from '../generated/resolvers-types';

export const Pokemon: QueryResolvers['pokemon'] = async (
  root,
  { id },
  { http }
) => {
  try {
    const { data } = await http.get(`pokemon/${id}`);
    return data;
  } catch (err: any) {
    return new ApolloError(err.response.data, err.response.status);
  }
};

export const Pokemons: QueryResolvers['pokemons'] = async (
  root,
  { offset, first },
  { http }
) => {
  try {
    const offsetParameter = offset ? offset : 0;
    const limitParameter = first ? first : 20;
    const { data } = await http.get(
      `pokemon?offset=${offsetParameter}&limit=${limitParameter}`
    );

    return data.results.map((pokemon: { url: string; name: string }) => {
      const urlArray = pokemon.url.split('/');
      return {
        id: urlArray[urlArray.length - 2],
        name: pokemon.name
      };
    });
  } catch (err: any) {
    return new ApolloError(err.response.data, err.response.status);
  }
};

export const PokemonImage: PokemonResolvers['image'] = ({ id }) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const PokemonType: PokemonResolvers['type'] = ({ types }: any) => {
  return types[0]?.type?.name;
};
