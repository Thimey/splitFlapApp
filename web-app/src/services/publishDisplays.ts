import { publishEvent } from './api';

const DISPLAY_LIMIT = 8;

function cleanDisplays(displays: string[]) {
    return displays.map(display => {
        return new Array(DISPLAY_LIMIT).fill(' ').map((_, i) => {
            const character = display[i];

            return !character || character === '\n'
                ? ' '
                : character.toLowerCase()
        }).join('')
    })
}

function chunkPublish(characterDisplays: string[], stepDelay: number) {
    // Some strange bug in firmware preventing more than 5 displays being sent at once :(.
    // Chunk these up for now.
    const CHUNK_LIMIT = 5

    const chunkedDisplays = characterDisplays.reduce((acc, display, i) => {
        const newChunk = (i + 1) / CHUNK_LIMIT > acc.length;

        if (newChunk) {
            return [...acc, [display]];
        }

        acc[acc.length - 1].push(display)

        return acc
    }, [] as string[][])

    console.log(chunkedDisplays)



    return chunkedDisplays.reduce(async (acc, display) => {
        await acc;

        return publishEvent({ name: 'publishDisplays', payload: { characterDisplays: display, stepDelay } })
    }, Promise.resolve())
}

export async function publishDisplays(characterDisplays: string[], stepDelay: number) {
    localStorage.setItem('characterDisplays', JSON.stringify(characterDisplays));

    const cleanedDisplays = cleanDisplays(characterDisplays)

    chunkPublish(cleanedDisplays, stepDelay)
};