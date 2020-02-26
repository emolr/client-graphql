import React, { useState, useEffect } from 'react';
import { shuffle, getPokemonId as getRandomPokemonId } from '../../utils';
import { useQuery } from '@apollo/react-hooks';
import { Button } from '../button/button';
import { Pokemon as PokemonType } from '../../graphql/generated/types';
import { PokemonChoicesQuery } from '../../graphql/generated/documents';

export interface PokemonChoicesProps {
  pokemon: PokemonType;
  disabled: boolean;
  onChange(pokemon: Partial<PokemonType>): void;
}

const PokemonChoices = ({
  pokemon,
  onChange,
  disabled
}: PokemonChoicesProps) => {
  const [pokemonChoices, setPokemonChoices] = useState<
    Partial<PokemonType>[]
  >();
  const [selection, setSelection] = useState<Partial<PokemonType>>();

  const updateChoices = (
    pokemon: PokemonType,
    pokemons: Partial<PokemonType>[]
  ) => {
    const firstId = getRandomPokemonId([pokemon.id]);
    const secondId = getRandomPokemonId([pokemon.id, firstId]);
    const choices = [
      ...[firstId, secondId].map(id =>
        pokemons.find(pokemon => pokemon.id === id)
      ),
      pokemon
    ];

    setPokemonChoices(shuffle(choices));
  };

  const { data: pokemonsData, loading: pokemonsLoading } = useQuery(
    PokemonChoicesQuery,
    {
      variables: { first: 150 },
      fetchPolicy: 'cache-first',
      onCompleted: ({ pokemons }) => {
        if (!pokemons || !pokemon) return;
        updateChoices(pokemon, pokemons);
      }
    }
  );

  useEffect(() => {
    if (pokemonsData) {
      setSelection(undefined);
      updateChoices(pokemon, pokemonsData?.pokemons);
    }
  }, [pokemon, pokemonsData]);

  const handleClick = (pokemonChoice: Partial<PokemonType>) => {
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
