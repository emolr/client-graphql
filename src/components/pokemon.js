import React, { useState, useEffect } from 'react'

export const Pokemon = ({src, visible}) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        setImageLoaded(false)

        const img = new Image()
        
        img.onload = () => {
            setTimeout(() => {
                setImageLoaded(true)
            }, 1000)
        }

        img.src = src;
    }, [src])

    return (
        <div className="pokemon-placeholder">
            <div 
                className={"pokemon-character " + (!visible ? 'pokemon-character--is-masked' : '')} 
                style={{'--pokemon-character-image': `url("${src}")`, opacity: imageLoaded ? '1' : '0'}}
            >
                <div className="pokemon-character__img"></div>
            </div>
        </div>
    )
}