import {PUBLIC_BACKEND_URL} from '$env/static/public';
import {get, post} from "$lib/requests.js";


export async function getUsers(token) {
    return await get(token, PUBLIC_BACKEND_URL + '/users');
}

export async function updateUser(token, data) {
    return await post(token, data, PUBLIC_BACKEND_URL + '/users/id/' + data.id);
}