import { Pokemon, PokemonImage, PokemonType } from "./Pokemon";

export const resolvers = {
    Query: {
        pokemon: Pokemon
    },
    Pokemon: {
        image: PokemonImage,
        type: PokemonType
    }
}