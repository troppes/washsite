import {PUBLIC_BACKEND_URL} from '$env/static/public';

export async function getUser(user, pass) {
    const response = await fetch(PUBLIC_BACKEND_URL + '/auth/login', {
        method: 'POST',
        headers: {'Authorization': 'Basic ' + btoa(user + ':' + pass)}
    })

    if (response.ok) {
        return response.json();
    } else {
        return response.text().then(text => {
            throw new Error(text);
        });
    }
}
