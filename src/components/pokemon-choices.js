import React, { useState } from 'react'
import { shuffle, getPokemonId } from '../utils';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const POKEMONS_QUERY = gql`
  query Pokemons($first: Int) {
    pokemons(first: $first) {
      id
      name
    }
  }
`
const PokemonChoices = ({ pokemon, onChange, disabled }) => {
    const [pokemonChoices, setPokemonChoices] = useState([])

    const { loading: pokemonsLoading } = useQuery(POKEMONS_QUERY, {
        variables: {
            first: 150
        },
        fetchPolicy: 'cache-first',
        onCompleted: (data) => {
          if (!data || !pokemon) return;
          const firstId = getPokemonId([pokemon.id]);
          const firstChoice = data.pokemons.find(o => o.id === firstId)
          const secondId = getPokemonId([pokemon.id, firstId])
          const secondChoice = data.pokemons.find(o => o.id === secondId)

          setPokemonChoices(shuffle([firstChoice, secondChoice, pokemon]))
        }
    });

    return (
        <div>
            {!!pokemonsLoading}
            {pokemonChoices?.map(pokemon => <button key={pokemon.id} onClick={() => onChange(pokemon)} disabled={disabled}>{pokemon.name}</button>)}
        </div>
    )
}

export default PokemonChoices;