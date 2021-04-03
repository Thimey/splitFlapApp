import { publishEvent } from './api';

export async function publishEnableMotors() {
    return publishEvent({ name: 'publishEnableMotors' })
};