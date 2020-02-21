import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

export interface PokemonProps {
  src: string;
  visible?: boolean;
}

export const Pokemon = ({ src, visible }: PokemonProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);

    const img = new Image();

    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = src;
  }, [src]);

  const pokemonClassNames = classNames({
    'pokemon-character': true,
    'pokemon-character--is-masked': !visible,
    'pokemon-character--is-loaded': imageLoaded
  });
  return (
    <div className="pokemon-placeholder">
      <div
        className={pokemonClassNames}
        style={{ backgroundImage: `url("${src}")` }}
      >
        <img src={src} alt="pokemon" />
      </div>
    </div>
  );
};
