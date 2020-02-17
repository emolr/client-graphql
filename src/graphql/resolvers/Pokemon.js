import { ApolloError } from "apollo-server-errors"

export const Pokemon = async (root, args, context, info) => {
    try {
        const { data } = await context.http.get(`pokemon/${args.id}`)
        return data;
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

export const Pokemons = async (root, args, context, info) => {
    try {
        const offset = args.offset ? args.offset : 0;
        const limit = args.first ? args.first : 20;
        const { data } = await context.http.get(`pokemon?offset=${offset}&limit=${limit}`)
        return data.results.map(o => {
            const urlArray = o.url.split('/')
            return {
                id: urlArray[urlArray.length - 2],
                name: o.name
            }
        });
    } catch (err) {
        return new ApolloError(err.response.data, err.response.status)
    }
}