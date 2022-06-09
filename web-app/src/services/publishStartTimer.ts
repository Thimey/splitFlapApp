import { publishEvent } from './api';

export async function publishStartTimer(seconds = 30) {
    return publishEvent({ name: 'publishStartTimer', payload: { seconds } })
};