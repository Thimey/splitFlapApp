import { publishEvent } from './api';

const DISPLAY_LIMIT = 8;

function cleanDisplays(displays: string[]) {
    return displays.map(display => {
        return new Array(DISPLAY_LIMIT).fill(' ').map((_, i) => {
            const character = display[i];

            return !character || character === '\n'
                ? ' '
                : character
        }).join('')
    })
}

export async function publishDisplays(characterDisplays: string[], stepDelay: number) {
    return publishEvent({ name: 'publishDisplays', payload: { characterDisplays: cleanDisplays(characterDisplays), stepDelay } })
};