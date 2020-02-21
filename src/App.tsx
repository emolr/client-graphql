import React, { useState, useRef } from 'react';
import { getBackgroundColor, getPokemonId } from './utils';
import './App.css';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { graphqlClient } from './graphql-client';
import gql from 'graphql-tag';
import PokemonChoices from './components/pokemon-choices';
import { Pokemon as PokemonType } from './graphql/generated/types';
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
`;

const initalPokemonId = getPokemonId([]);

function PokemonCatcher() {
  const [fetchedPokemons, setFetchedPokemons]: any = useState([]);
  const [guessedPokemons, setQuessedPokemons]: any = useState([]);
  const [unguessedPokemons, setUnguessedPokemons]: any = useState([]);
  const [showResult, setShowResult]: any = useState(false);
  const scoreRef = useRef<HTMLDivElement>(null);
  const {
    data: pokemonData,
    loading: pokemonLoading,
    error: pokemonError,
    refetch: refetchPokemon
  } = useQuery(POKEMON_QUERY, {
    variables: {
      id: initalPokemonId
    }
  });

  const getRandomPokemon = () => {
    if (pokemonLoading) {
      return;
    }

    const pokemonId = getPokemonId([
      ...fetchedPokemons.map((o: { id: number }) => o.id),
      initalPokemonId
    ]);

    refetchPokemon({
      id: pokemonId
    })
      .then(({ data }) => {
        setShowResult(false);

        scoreRef?.current?.classList.remove(
          'font-pokemon-score__result--is-animating'
        );

        if (
          fetchedPokemons.findIndex(
            (o: { id: number }) => o.id === data.pokemon.id
          ) < 0
        ) {
          setFetchedPokemons([...fetchedPokemons, data.pokemon]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const guessPokemon = (pokemon: PokemonType) => {
    if (pokemon.name.toLowerCase() === pokemonData.pokemon.name.toLowerCase()) {
      scoreRef?.current?.classList.add(
        'font-pokemon-score__result--is-animating'
      );
      setQuessedPokemons([...guessedPokemons, pokemonData.pokemon]);
    } else {
      setUnguessedPokemons([...unguessedPokemons, pokemonData.pokemon]);
    }

    setShowResult(true);

    setTimeout(() => {
      getRandomPokemon();
    }, 2000);
  };

  return (
    <div
      className="main"
      style={{
        backgroundColor: getBackgroundColor(pokemonData?.pokemon?.type)
      }}
    >
      <div className="font-pokemon font-pokemon-score">
        <div className="font-pokemon-score__result" ref={scoreRef}>
          {guessedPokemons.length}
        </div>
        <div className="font-pokemon-score__left">
          {150 - fetchedPokemons?.length}
        </div>
      </div>
      <div className="main__header">
        <h2 className="font-pokemon font-pokemon--title">
          Who's that Pokémon?
        </h2>
      </div>
      {/* {(!pokemonData && pokemonLoading) && <div>Loading...</div>} */}
      {pokemonData && !pokemonError && (
        <div className="main__body">
          <div className="main__body__center">
            <Pokemon src={pokemonData.pokemon.image} visible={showResult} />
            {!showResult && (
              <h2 className="font-pokemon font-pokemon-name">?</h2>
            )}
            {showResult && (
              <h2 className="font-pokemon font-pokemon-name font-pokemon--rotate">
                {pokemonData.pokemon.name}
              </h2>
            )}
            <PokemonChoices
              onChange={(e: PokemonType) => guessPokemon(e)}
              pokemon={pokemonData.pokemon}
              disabled={showResult}
              countdown={0}
            />
          </div>
        </div>
      )}
      {pokemonError &&
        pokemonError.graphQLErrors.map(err => (
          <div key={err.message}>{err.message}</div>
        ))}
    </div>
  );
}

const App = () => {
  return (
    <ApolloProvider client={graphqlClient}>
      <PokemonCatcher />
    </ApolloProvider>
  );
};

export default App;
