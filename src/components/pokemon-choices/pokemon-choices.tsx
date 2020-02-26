import React, { useState, useEffect } from 'react';
import { Pokemon as PokemonType } from '../../graphql/generated/types';
import { PokemonChoicesQueryComponent } from '../../graphql/generated/react-apollo';
import { PokemonChoicesButtons } from './pokemon-choices-buttons';
import cn from 'classnames';
import './pokemon-choices.scss';

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
  const [selection, setSelection] = useState<PokemonChoice>();

  useEffect(() => {
    setSelection(undefined);
  }, [pokemon]);

  const selectPokemon = (pokemonChoice: PokemonChoice) => {
    setSelection(pokemonChoice);
    onChange(pokemonChoice);
  };

  return (
    <PokemonChoicesQueryComponent
      variables={{ first: 150 }}
      fetchPolicy="cache-first"
    >
      {({ data }) => (
        <div
          className={cn([
            {
              'pokemon-choices--has-selection': selection
            },
            'pokemon-choices'
          ])}
        >
          {data && (
            <PokemonChoicesButtons
              pokemon={pokemon}
              pokemons={data.pokemons}
              selected={selection}
              onSelect={selectPokemon}
              disabled={disabled}
            />
          )}
        </div>
      )}
    </PokemonChoicesQueryComponent>
  );
};

export default PokemonChoices;
