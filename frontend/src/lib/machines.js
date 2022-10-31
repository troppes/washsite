import {get} from 'svelte/store'
import {displayStore} from '$lib/stores.js';
import {PUBLIC_BACKEND_URL} from '$env/static/public';


export async function getMachines() {
    const token = get(displayStore);
    const response = await fetch(PUBLIC_BACKEND_URL + '/machines/', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        },
    })

    if (response.ok) {
        return response.json();
    } else {
        return response.text().then(text => {
            return text;
        });
    }
}