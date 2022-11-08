import {PUBLIC_BACKEND_URL} from '$env/static/public';
import {get, post} from "$lib/requests.js";



export async function getMachines(token) {
    return get(token, PUBLIC_BACKEND_URL + '/machines')
}

export async function updateMachines(token, data) {
    return await post(token, data, PUBLIC_BACKEND_URL + '/machines/id/' + data.id);
}