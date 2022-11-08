<script>
    import {userStore} from '$lib/stores.js';
    import {getMachines, updateMachines} from '$lib/machines.js';
    import {get} from 'svelte/store';
    import {getUsers} from "$lib/users.js";
    import {onMount} from "svelte";
    import {updateUser} from "$lib/users.js";
    import { toast } from '@zerodevx/svelte-toast'

    let users = {users: []};
    let machines = {machines: []};
    onMount(() => {
        if(get(userStore) !== null) {
            machines = getMachines(get(userStore)['accessToken']);
            users = getUsers(get(userStore)['accessToken']);
        }
    });

    const updateHandler = async (e) => {
    if(e.srcElement.value !== '') {
        const data = {
            'id' : e.srcElement.dataset.id,
            [e.srcElement.dataset.type]: e.srcElement.value
        }

        try {
            if(e.srcElement.dataset.table === 'user'){
                await updateUser(get(userStore)['accessToken'], data);
            } else {
                await updateMachines(get(userStore)['accessToken'], data);
            }
            toast.push('Updated!', {
                theme: {
                    '--toastColor': 'mintcream',
                    '--toastBackground': 'rgba(72,187,120,0.9)',
                    '--toastBarBackground': '#2F855A'
                }
            });
            e.srcElement.placeholder = e.srcElement.value;
            e.srcElement.value = '';
        } catch(error){
            toast.push(error.body.message);
            e.srcElement.value = '';
        }

        }
    }

</script>
{#if get(userStore) !== null}
<div class="pure-g center">
    <div class="pure-u-1">
        <h1 class="text-center">Washtrak Admin v0.0.1</h1>
        <p class=text-center>Click into the cells to update values.</p>
    </div>
</div>

{#await machines}
<div class="pure-g center">
    <p>Fetching machines</p>
</div>
{:then machines}
<div class="pure-g center">
    <div class="pure-u-1">
        <h2>Machines</h2>
    </div>
    <div class="pure-u-1">
        <table class="pure-table center" id="user-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            {#each machines.machines as machine}
                <tr>
                <td><input data-id={machine.id} data-type='name' on:blur={updateHandler} data-table='machine' placeholder="{machine.name}"></td>
                <td><input data-id={machine.id} data-type='status' on:blur={updateHandler} data-table='machine' placeholder="{machine.status}"></td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>

</div>
{:catch error}
<div class="pure-g center">
    <p style="color: red">{error}</p>
</div>
{/await}

{#await users}
<div class="pure-g center">
    <p>Fetching users</p>
</div>
{:then users}
<div class="pure-g center">
    <div class="pure-u-1">
        <h2>Users</h2>
    </div>
    <div class="pure-u-1">
        <table class="pure-table center">
            <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Password</th>
            </tr>
            </thead>
            <tbody>
            {#each users.users as user}
            <tr>
                <td><input data-id={user.id} data-type='name' data-table='user' on:blur={updateHandler} placeholder="{user.name}"></td>
                <td><input data-id={user.id} data-type='type' data-table='user' on:blur={updateHandler} placeholder="{user.type}" ></td>
                <td><input type="password" data-id={user.id} data-table='user' data-type='password' on:blur={updateHandler} placeholder="*****" /></td>
            </tr>
            {/each}
            </tbody>
        </table>
    </div>
    <div class="pure-u-1 text-center">
        Please note that the only roles are: admin, machine and display.
    </div>

</div>
{:catch error}
<div class="pure-g center">
    <p style="color: red">{error}</p>
</div>
{/await}
{:else}
    <div class="pure-u-1 text-center">
        <h1> Hey! You should not be here! </h1>
    </div>
{/if}


<style>

    input {
        width: 10vh;
        padding: 1%;
        border-top-style: hidden;
        border-right-style: hidden;
        border-left-style: hidden;
        border-bottom-style: hidden;
        text-align: center;
        outline: none;
    }

    input::placeholder {
        color: black;
    }

    input:focus::placeholder {
        color: transparent;
    }

    h1 {
        font-size: 4rem;
    }

    h2 {
        font-size: 2rem;
        text-align: center;
    }

    table {
        margin-bottom: 2%;
        font-size: 1.5rem;
    }

    td, .text-center {
        text-align: center;
    }

    .button-save {
    color: white;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    background: rgb(28, 184, 65);

    }
</style>