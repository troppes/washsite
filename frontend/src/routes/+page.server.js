import {getUser} from '../lib/auth.js';
import {displayStore} from '$lib/stores.js';
import {getMachines} from '../lib/machines.js';
import {get} from 'svelte/store'
import {env} from '$env/dynamic/private';


export async function load({params}) {
    if (get(displayStore) === null) {
        const accessToken = await getUser(env.DISPLAY_USER, env.DISPLAY_PASSWORD, env.INTERNAL_BACKEND_URL);
        displayStore.set(accessToken['accessToken']);
    }

    return {
        machines: getMachines(get(displayStore), env.INTERNAL_BACKEND_URL)
    }

}