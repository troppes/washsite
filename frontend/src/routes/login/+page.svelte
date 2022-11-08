<script>
    import {getUser} from '$lib/auth.js';
    import {userStore} from '$lib/stores.js';
    import {goto} from "$app/navigation";

    let username = '';
    let password = '';
    let error = '';

    async function login() {
        try {
            const user = await getUser(username, password);
            user['name'] = username;
            userStore.set(user);
            goto('/');
        } catch (e) {
            error = 'Incorrect username and password.';
        }

    }

    async function logout() {
        userStore.set(null);
        goto('/');
    }
    if($userStore !== null) {
        logout();
    }

</script>

<form on:submit|preventDefault={login} class="pure-form pure-form-aligned pure-g center">
    <fieldset>
        <div class="pure-control-group">
            <label for="aligned-name">Username</label>
            <input type="text" id="username" placeholder="Username" bind:value={username}/>
        </div>
        <div class="pure-control-group">
            <label for="aligned-password">Password</label>
            <input type="password" id="password" placeholder="Password" bind:value={password}/>
        </div>
        <div class="pure-controls">
            <button type="submit" class="pure-button pure-button-primary">Submit</button>
            <div id="error_message">
                <small>{error}</small>
            </div>
        </div>
    </fieldset>
</form>

<style>
    form {
        padding-top: 2%;
    }

    #error_message{
        color: red;
    }

</style>