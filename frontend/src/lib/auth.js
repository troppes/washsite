import { env } from '$env/dynamic/public';
import {error} from "@sveltejs/kit";

export async function getUser(user, pass, url = env.PUBLIC_BACKEND_URL) {
    const response = await fetch(url + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Basic ' + btoa(user + ':' + pass)
        }
    })

    const json = await response.json();
    if (response.ok) {
        return json;
    } else {
        throw new error(response.status, json);
    }
}
