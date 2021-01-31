import axios from 'axios';
import { API } from './apiEndpoint';

export async function setDisplay(characterDisplays: string[]) {
    try {
        const resp = await fetch(`${API}/splitFlap/setDisplay`, {
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