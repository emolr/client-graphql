import React, { useState, useEffect } from 'react'

export const Pokemon = ({src, visible}) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        setImageLoaded(false)

        const img = new Image()
        
        img.onload = () => {
            setImageLoaded(true)
        }

        img.src = src;
    }, [src])

    return (
        <div className="pokemon-placeholder">
            <div 
                className={"pokemon-character " + (!visible ? 'pokemon-character--is-masked ' : '' + imageLoaded ? 'pokemon-character-loaded': '')} 
                style={{backgroundImage: `url("${src}")`}}
            >
                <img src={src} alt="pokemon" />
            </div>
        </div>
    )
}