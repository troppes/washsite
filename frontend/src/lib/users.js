import {env} from '$env/dynamic/public';
import {deleteReq, get, post, put} from "$lib/requests.js";


export async function getUsers(token) {
    return await get(token, env.PUBLIC_BACKEND_URL + '/users');
}

export async function updateUser(token, data) {
    return await post(token, data, env.PUBLIC_BACKEND_URL + '/users/id/' + data.id);
}

export async function addUser(token, data) {
    return await put(token, data, env.PUBLIC_BACKEND_URL + '/users/');
}

export async function deleteUser(token, id) {
    return deleteReq(token, env.PUBLIC_BACKEND_URL + '/users/id/' + id);
}