import { ApolloError } from "apollo-server-errors"

export const Pokemon = async (root, args, context, info) => {
    try {
        const { data } = await context.http.get(`pokemon/${args.name.toLowerCase()}`)
        return data
    } catch (err) {
        return new ApolloError(err.response.data, err.response.status)
    }
}

export const PokemonImage = (root) => {
    return `https://pokeres.bastionbot.org/images/pokemon/${root.id}.png`
}

export const PokemonType = (root) => {
    return root.types[0]?.type?.name
}