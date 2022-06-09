export const API = 'https://s308z0gzr0.execute-api.ap-southeast-2.amazonaws.com/dev';

type DisableMotorsEvent = { name: 'publishDisableMotors', payload?: {} };
type EnableMotorsEvent = { name: 'publishEnableMotors', payload?: {} };
type ResetEvent = { name: 'publishReset', payload?: {} };
type DisplaysEvent = { name: 'publishDisplays', payload: { characterDisplays: string[], stepDelay: number } };
type StartTimerEvent = { name: 'publishStartTimer', payload: { seconds: number } };

export type Event = DisableMotorsEvent | EnableMotorsEvent | ResetEvent | DisplaysEvent | StartTimerEvent


export async function publishEvent(event: Event) {
    try {
        const resp = await fetch(`${API}/splitFlap/${event.name}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(event.payload)
        })

        return resp.json();
    } catch (error) {
        console.error(error);
    }
};