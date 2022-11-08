import {PUBLIC_BACKEND_URL} from '$env/static/public';
import {deleteReq, get, post, put} from "$lib/requests.js";



export async function getMachines(token) {
    return get(token, PUBLIC_BACKEND_URL + '/machines');
}

export async function updateMachine(token, data) {
    return await post(token, data, PUBLIC_BACKEND_URL + '/machines/id/' + data.id);
}

export async function addMachine(token, data) {
    return await put(token, data, PUBLIC_BACKEND_URL + '/machines/');
}

export async function deleteMachine(token, id) {
    return deleteReq(token, PUBLIC_BACKEND_URL + '/machines/id/' + id);
}