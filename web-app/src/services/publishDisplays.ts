import { API } from './apiEndpoint';

export async function publishDisplays(characterDisplays: string[]) {
    try {
        const resp = await fetch(`${API}/splitFlap/publishDisplays`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ characterDisplays })
        })

        return resp.json();
    } catch (error) {
        console.error(error);
    }
};