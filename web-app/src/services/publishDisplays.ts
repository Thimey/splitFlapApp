import { publishEvent } from './api';

export async function publishDisplays(characterDisplays: string[], stepDelay: number) {
    return publishEvent({ name: 'publishDisplays', payload: { characterDisplays, stepDelay } })
};