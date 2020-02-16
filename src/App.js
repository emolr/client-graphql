import React, { useState } from 'react';
import { getBackgroundColor } from './utils'
import './App.css';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { graphqlClient } from './graphql-client';
import gql from 'graphql-tag';

const POKEMON_QUERY = gql`
  query Pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      type
    }
  }
`

function PokemonCatcher() {
  const [catchedPokemons, setCatchedPokemons] = useState([])
  const [pokemonName, setPokemonName] = useState('')

  const { data: pokemonData, loading: pokemonLoading, error: pokemonError, refetch: refetchPokemon} = useQuery(POKEMON_QUERY, {
    variables: {
      name: 'pikachu'
    }
  })

  const catchPokemon = (e) => {
    e.preventDefault();
    refetchPokemon({
      name: pokemonName
    })
      .then(({data}) => {
        if (catchedPokemons.findIndex(o => o.id === data.pokemon.id) < 0) {
          setCatchedPokemons([...catchedPokemons, data.pokemon])
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div style={{backgroundColor: getBackgroundColor(pokemonData?.pokemon?.type)}}>
      <form onSubmit={catchPokemon}>
        <input value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} />
        <button>Catch!</button>
      </form>
      <div>Catched pokemons: {catchedPokemons.length}</div>
      <div>
        {pokemonLoading && <div>Loading...</div>}
        {(pokemonData && !pokemonLoading && !pokemonError) && (
          <div>
            <h2>{pokemonData.pokemon.name}</h2>
            <div>type: {pokemonData.pokemon.type}</div>
            <img src={pokemonData.pokemon.image} alt={`A fronting ${pokemonData.name}appeared`} />
          </div>
        )}
        {pokemonError && pokemonError.graphQLErrors.map(err => (
          <div key={err.message}>
            {err.message}
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  

  return (
    <ApolloProvider client={graphqlClient}>
      <PokemonCatcher />
    </ApolloProvider>
  );
}

export default App;
