export function getBackgroundColor(type) {
    switch (type) {
        case 'normal':
            return '#A5ACAF'
        case 'fighting':
            return '#D56723'
        case 'flying':
            return '#3DC6EE'
        case 'poison':
            return '#B97FC8'
        case 'ground':
            return '#F7DE3F'
        case 'rock':
            return '#A48D21'
        case 'bug':
            return '#739F40'
        case 'ghost':
            return '#7B62A3'
        case 'steel':
            return '#9EB8B8'
        case 'fire':
            return '#FD7D24'
        case 'water':
            return '#4592C4'
        case 'grass':
            return '#9BCC50'
        case 'electric':
            return '#EED535'
        case 'psychic':
            return '#F366B9'
        case 'ice':
            return '#51C4E8'
        case 'dragon':
            return '#F16E56'
        case 'dark':
            return '#707070'
        case 'fairy':
            return '#FDBAEA'
        case 'unknown':
            return '#A3ACAF'
        case 'shadow':
            return '#A3ACAF'
        default:
            return '#A3ACAF'
    }
}

export function getPokemonId(previousValues, source) {
    if (!previousValues) return 1;

    const randomInt = Math.floor(
        (Math.random() * (150 - 0) + 1)
    )

    return previousValues.includes(randomInt) ? getPokemonId(previousValues) : randomInt
}

export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}