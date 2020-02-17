import { Pokemon, PokemonImage, PokemonType, Pokemons } from "./Pokemon";

export const resolvers = {
    Query: {
        pokemon: Pokemon,
        pokemons: Pokemons
    },
    Pokemon: {
        image: PokemonImage,
        type: PokemonType
    }
}