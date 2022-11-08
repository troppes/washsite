import {PUBLIC_BACKEND_URL} from '$env/static/public';
import {deleteReq, get, post, put} from "$lib/requests.js";


export async function getUsers(token) {
    return await get(token, PUBLIC_BACKEND_URL + '/users');
}

export async function updateUser(token, data) {
    return await post(token, data, PUBLIC_BACKEND_URL + '/users/id/' + data.id);
}

export async function addUser(token, data) {
    return await put(token, data, PUBLIC_BACKEND_URL + '/users/');
}

export async function deleteUser(token, id) {
    return deleteReq(token, PUBLIC_BACKEND_URL + '/users/id/' + id);
}