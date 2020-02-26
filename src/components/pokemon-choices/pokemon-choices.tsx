import React, { useState, useEffect } from 'react';
import { Pokemon as PokemonType } from '../../graphql/generated/types';
import { PokemonChoicesPokemonsComponent } from '../../graphql/generated/react-apollo';
import { PokemonChoicesButtons } from './pokemon-choices-buttons';
import cn from 'classnames';

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
    <PokemonChoicesPokemonsComponent
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
    </PokemonChoicesPokemonsComponent>
  );
};

export default PokemonChoices;
