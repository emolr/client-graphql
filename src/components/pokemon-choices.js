import React, { useState, useEffect } from 'react';
import { shuffle, getPokemonId } from '../utils';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Button } from './button';

const POKEMONS_QUERY = gql`
  query Pokemons($first: Int) {
    pokemons(first: $first) {
      id
      name
    }
  }
`;
const PokemonChoices = ({ pokemon, onChange, disabled, countdown }) => {
  const [pokemonChoices, setPokemonChoices] = useState([]);
  const [selection, setSelection] = useState({ id: null });

  const updateChoices = (pokemon, data) => {
    const firstId = getPokemonId([pokemon.id]);
    const firstChoice = data.pokemons.find(o => o.id === firstId);
    const secondId = getPokemonId([pokemon.id, firstId]);
    const secondChoice = data.pokemons.find(o => o.id === secondId);

    setPokemonChoices(shuffle([firstChoice, secondChoice, pokemon]));
  };

  const { data: pokemonsData, loading: pokemonsLoading } = useQuery(
    POKEMONS_QUERY,
    {
      variables: {
        first: 150
      },
      fetchPolicy: 'cache-first',
      onCompleted: data => {
        if (!data || !pokemon) return;
        updateChoices(pokemon, data);
      }
    }
  );

  useEffect(() => {
    if (pokemonsData) {
      setSelection({ id: null });
      updateChoices(pokemon, pokemonsData);
    }
  }, [pokemon, pokemonsData]);

  const handleClick = pokemonChoice => {
    setSelection(pokemonChoice);
    onChange(pokemonChoice);
  };

  return (
    <div
      className={
        'pokemon-choices ' +
        (selection.id !== null ? 'pokemon-choices--has-selection' : '')
      }
    >
      {!!pokemonsLoading}
      {pokemonChoices?.map((pokemonChoice, index) => (
        <Button
          key={'pokemon' + index}
          onClick={() => handleClick(pokemonChoice)}
          disabled={disabled}
          countdown={countdown}
          className={
            pokemonChoice.id === selection.id
              ? 'button-choices--is-selected'
              : ''
          }
        >
          {pokemonChoice.name}
        </Button>
      ))}
    </div>
  );
};

export default PokemonChoices;
