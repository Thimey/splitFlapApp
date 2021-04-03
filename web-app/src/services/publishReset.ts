import { publishEvent } from './api';

export async function publishReset() {
    return publishEvent({ name: 'publishReset' })
};