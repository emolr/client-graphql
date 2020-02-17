import React, { useState } from 'react';
import { getBackgroundColor, getPokemonId } from './utils'
import './App.css';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { graphqlClient } from './graphql-client';
import gql from 'graphql-tag';
import PokemonChoices from './components/pokemon-choices';
import { Pokemon } from './components/pokemon';

const POKEMON_QUERY = gql`
  query Pokemon($id: Int!) {
    pokemon(id: $id) {
      id
      name
      image
      type
    }
  }
`

const initalPokemonId = getPokemonId([])

function PokemonCatcher() {
  const [fetchedPokemons, setFetchedPokemons] = useState([])
  const [guessedPokemons, setQuessedPokemons] = useState([])
  const [unguessedPokemons, setUnguessedPokemons] = useState([])
  const [showResult, setShowResult] = useState(false)

  const { data: pokemonData, loading: pokemonLoading, error: pokemonError, refetch: refetchPokemon} = useQuery(POKEMON_QUERY, {
    variables: {
      id: initalPokemonId
    }
  })

  const getRandomPokemon = () => {
    if (pokemonLoading) {
      return
    }
    
    const pokemonId = getPokemonId(
      [...fetchedPokemons.map(o => o.id), initalPokemonId]
    )

    refetchPokemon({
      id: pokemonId
    })
      .then(({data}) => {
        setShowResult(false)
        if (fetchedPokemons.findIndex(o => o.id === data.pokemon.id) < 0) {
          setFetchedPokemons([...fetchedPokemons, data.pokemon])
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const guessPokemon = (pokemon) => {
    if (pokemon.name.toLowerCase() === pokemonData.pokemon.name.toLowerCase()) {
      setQuessedPokemons([...guessedPokemons, pokemonData.pokemon])
    } else {
      setUnguessedPokemons([...unguessedPokemons, pokemonData.pokemon])
    }

    setShowResult(true)

    setTimeout(() => {
      getRandomPokemon()
    }, 2000)
  }

  return (
    <div className="main" style={{backgroundColor: getBackgroundColor(pokemonData?.pokemon?.type)}}>
      <div>Guessed pokemons: {guessedPokemons.length}</div>
      <div>
        {pokemonLoading && <div>Loading...</div>}
        {(pokemonData && !pokemonLoading && !pokemonError) && (
          <div style={{padding: '24px'}}>
            {/* <h2>{pokemonData.pokemon.name}</h2>
            <div>type: {pokemonData.pokemon.type}</div> */}
            <Pokemon src={pokemonData.pokemon.image} visible={showResult} />
            <PokemonChoices onChange={(e) => guessPokemon(e)} pokemon={pokemonData.pokemon} disabled={showResult} />
            {/* <img src={pokemonData.pokemon.image} alt={`A fronting ${pokemonData.name} appeared`} style={{width: '400px', height: 'auto'}}/> */}
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
