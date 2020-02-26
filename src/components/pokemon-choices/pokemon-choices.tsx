import React, { useState, useEffect } from 'react';
import { shuffle, getRandomNumberInRange } from '../../utils';
import { useQuery } from '@apollo/react-hooks';
import { Button } from '../button/button';
import { Pokemon as PokemonType } from '../../graphql/generated/types';
import { Pokemons } from '../../graphql/generated/documents';
import { PokemonsQuery } from '../../graphql/generated/operations';

export interface PokemonChoice extends Pick<PokemonType, 'id' | 'name'> {}

export interface PokemonChoicesProps {
  pokemon: PokemonType;
  disabled: boolean;
  onChange(pokemon: PokemonChoice): void;
}

const PokemonChoices = ({
  pokemon,
  onChange,
  disabled
}: PokemonChoicesProps) => {
  const [pokemonChoices, setPokemonChoices] = useState<PokemonChoice[]>();
  const [selection, setSelection] = useState<PokemonChoice>();

  const updateChoices = (pokemon: PokemonType, pokemons: PokemonChoice[]) => {
    const firstId = getRandomNumberInRange([pokemon.id]);
    const secondId = getRandomNumberInRange([pokemon.id, firstId]);
    const choices = [
      ...[firstId, secondId].map(id =>
        pokemons.find(pokemon => pokemon.id === id)
      ),
      pokemon
    ];

    setPokemonChoices(shuffle(choices));
  };

  const { data: pokemonsData, loading: pokemonsLoading } = useQuery<
    PokemonsQuery
  >(Pokemons, {
    variables: { first: 150 },
    fetchPolicy: 'cache-first',
    onCompleted: ({ pokemons }) => {
      if (!pokemons || !pokemon) return;
      updateChoices(pokemon, pokemons);
    }
  });

  useEffect(() => {
    if (pokemonsData) {
      setSelection(undefined);
      updateChoices(pokemon, pokemonsData.pokemons);
    }
  }, [pokemon, pokemonsData]);

  const handleClick = (pokemonChoice: PokemonChoice) => {
    setSelection(pokemonChoice);
    onChange(pokemonChoice);
  };

  return (
    <div
      className={
        'pokemon-choices ' +
        (selection?.id !== null ? 'pokemon-choices--has-selection' : '')
      }
    >
      {!!pokemonsLoading}
      {pokemonChoices?.map((pokemonChoice: any, index: number) => (
        <Button
          key={'pokemon' + index}
          onClick={() => handleClick(pokemonChoice)}
          disabled={disabled}
          selected={pokemonChoice.id === selection?.id}
        >
          {pokemonChoice.name}
        </Button>
      ))}
    </div>
  );
};

export default PokemonChoices;
