import {env} from '$env/dynamic/public';
import {deleteReq, get, post, put} from "$lib/requests.js";

export async function getMachines(token) {
    return get(token, env.PUBLIC_BACKEND_URL + '/machines');
}

export async function updateMachine(token, data) {
    return await post(token, data, env.PUBLIC_BACKEND_URL + '/machines/id/' + data.id);
}

export async function addMachine(token, data) {
    return await put(token, data, env.PUBLIC_BACKEND_URL + '/machines/');
}

export async function deleteMachine(token, id) {
    return deleteReq(token, env.PUBLIC_BACKEND_URL + '/machines/id/' + id);
}