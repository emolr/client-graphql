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
        <div className={"pokemon " + (!visible ? 'pokemon--is-masked' : '')} style={{'--pokemon-image': `url("${src}")`, opacity: imageLoaded ? '1' : '0'}}>
            <div className="pokemon__img"></div>
        </div>
    )
}