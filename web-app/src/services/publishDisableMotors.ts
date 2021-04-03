import { publishEvent } from './api';

export async function publishDisableMotors() {
    return publishEvent({ name: 'publishDisableMotors' })
};