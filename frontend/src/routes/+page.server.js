import {getUser} from '../lib/auth.js';
import {displayStore} from '$lib/stores.js';
import {getMachines} from '../lib/machines.js';
import {get} from 'svelte/store'
import {DISPLAY_PASSWORD, DISPLAY_USER} from '$env/static/private';


export async function load({params}) {
    if (get(displayStore) === null) {
        const accessToken = await getUser(DISPLAY_USER, DISPLAY_PASSWORD);
        displayStore.set(accessToken['accessToken']);
    }

    return {
        machines: getMachines(get(displayStore))
    }

}