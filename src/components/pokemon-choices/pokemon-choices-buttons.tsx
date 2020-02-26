import React from 'react';
import { useState, useEffect } from 'react';
import { PokemonChoice } from './pokemon-choices';
import { getNextPokemonChoices } from './pokemon-choices-utils';
import { Pokemon } from '../../graphql/generated/react-apollo';
import { Button } from '../button/button';

export interface PokemonChoicesButtonsProps {
  pokemon: Pokemon;
  pokemons: PokemonChoice[];
  onSelect?(pokemon: PokemonChoice): void;
  selected?: PokemonChoice;
  disabled?: boolean;
}

export const PokemonChoicesButtons = ({
  pokemon,
  pokemons,
  onSelect,
  selected,
  disabled
}: PokemonChoicesButtonsProps) => {
  const [choices, setChoices] = useState<PokemonChoice[]>([]);

  useEffect(() => {
    setChoices(getNextPokemonChoices(pokemon, pokemons));
  }, [pokemon, pokemons]);

  return (
    <>
      {choices.map(pokemonChoice => (
        <Button
          key={'pokemon' + pokemonChoice.id}
          onClick={() => (onSelect ? onSelect(pokemonChoice) : null)}
          selected={pokemonChoice.id === selected?.id}
          disabled={disabled}
        >
          {pokemonChoice.name}
        </Button>
      ))}
    </>
  );
};

export default PokemonChoicesButtons;
