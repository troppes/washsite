<script>
    import {userStore} from '$lib/stores.js';
    import {getMachines, updateMachine, addMachine, deleteMachine} from '$lib/machines.js';
    import {get} from 'svelte/store';
    import {addUser, deleteUser, getUsers} from "$lib/users.js";
    import {onMount} from "svelte";
    import {updateUser} from "$lib/users.js";
    import {toast} from '@zerodevx/svelte-toast'

    let users = {users: []};
    let machines = {machines: []};

    let token = get(userStore)['accessToken'];

    onMount(() => {
        if (get(userStore) !== null) {
            machines = getMachines(token);
            users = getUsers(token);
        }
    });

    const errorToast = (message) => {
        toast.push(message, {
            theme: {
                '--toastColor': 'mintcream',
                '--toastBackground': '#f27474',
                '--toastBarBackground': '#fa5555'
            }
        });
    }

    const successToast = (message) => {
        toast.push(message, {
            theme: {
                '--toastColor': 'mintcream',
                '--toastBackground': 'rgba(72,187,120,0.9)',
                '--toastBarBackground': '#2F855A'
            }
        });
    }


    const createHandler = async (e) => {
        try {
            if (e.srcElement.dataset.table === 'users') {

                let data = {};
                let nodes = document.querySelectorAll("input[data-action='create-user']")
                console.log(nodes);
                for (let node of nodes) {
                    if (node.value == null || node.value === '') {
                        errorToast('Please fill out all fields!');
                        return;
                    }
                    data[node.dataset.type] = node.value;
                }

                await addUser(token, data);
                users = getUsers(token); // pull updated list
            } else {
                let data = {};
                let nodes = document.querySelectorAll("input[data-action='create-machine']")
                for (let node of nodes) {
                    if (node.value == null || node.value === '') {
                        errorToast('Please fill out all fields!');
                        return;
                    }
                    data[node.dataset.type] = node.value;
                }

                await addMachine(token, data);
                machines = getMachines(token);
            }
            successToast('Created!');
        } catch (error) {
            errorToast(error.body.message);
        }
    }

    const deleteHandler = async (e) => {
        try {
            if (e.srcElement.dataset.table === 'users') {
                await deleteUser(token, e.srcElement.dataset.id);
                users = getUsers(token); // pull updated list
            } else {
                await deleteMachine(token, e.srcElement.dataset.id);
                machines = getMachines(token);
            }
            successToast('Deleted!');
        } catch (error) {
            errorToast(error.body.message);
        }
    }

    const updateHandler = async (e) => {
        if (e.srcElement.value !== '') {
            const data = {
                'id': e.srcElement.dataset.id,
                [e.srcElement.dataset.type]: e.srcElement.value
            }
            try {
                if (e.srcElement.dataset.table === 'users') {
                    await updateUser(token, data);
                } else {
                    await updateMachine(token, data);
                }
                successToast('Updated!');
                e.srcElement.placeholder = e.srcElement.value;
                e.srcElement.value = '';
            } catch (error) {
                errorToast(error.body.message);
                e.srcElement.value = '';
            }
        }
    }

</script>
{#if get(userStore) !== null}
<div class="pure-g center">
    <div class="pure-u-1">
        <h1 class="text-center">Washtrak Admin v1</h1>
        <p class=text-center>Click into the cells to update values.</p>
    </div>
</div>

<div class="pure-g center">
    <h2>Machines</h2>
</div>
{#await machines}
<div class="pure-g center">
    <p>Fetching machines</p>
</div>
{:then machines}
<div class="pure-g center">
    <div class="pure-u-1">
        <table class="pure-table center" id="user-table">
            <thead class="text-center">
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {#each machines.machines as machine}
            <tr>
                <td><input data-id={machine.id} data-type='name' on:blur={updateHandler} data-table='machines'
                           placeholder="{machine.name}"></td>
                <td><input data-id={machine.id} data-type='status' on:blur={updateHandler} data-table='machines'
                           placeholder="{machine.status}"></td>
                <td><a class="pure-button pure-button button-error button-base login" data-table='machines'
                       data-id={machine.id} on:click="{deleteHandler}">Delete</td>
            </tr>
            {/each}
            <tr>
                <td><input data-action='create-machine' data-type='name' placeholder="Name"></td>
                <td><input data-action='create-machine' data-type='status' placeholder="Status"></td>
                <td><a class="pure-button pure-button button-sucess button-base login" data-table='machines'
                       on:click="{createHandler}">Create</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

</div>
{:catch error}
<div class="pure-g center">
    <p style="color: red">{error.body.message}</p>
</div>
{/await}

<div class="pure-g center">
    <h2>Users</h2>
</div>
{#await users}
<div class="pure-g center">
    <p>Fetching users</p>
</div>
{:then users}
<div class="pure-g center">
    <div class="pure-u-1">
        <table class="pure-table center">
            <thead class="text-center">
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Password</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {#each users.users as user}
            <tr>
                <td><input data-id={user.id} data-type='name' data-table='users' on:blur={updateHandler}
                           placeholder="{user.name}"></td>
                <td><input data-id={user.id} data-type='type' data-table='users' on:blur={updateHandler}
                           placeholder="{user.type}"></td>
                <td><input type="password" data-id={user.id} data-table='users' data-type='password'
                           on:blur={updateHandler} placeholder="*****"/></td>
                <td><a class="pure-button pure-button button-error button-base login" data-table='users'
                       data-id={user.id} on:click="{deleteHandler}">Delete</td>
            </tr>
            {/each}
            <tr>
                <td><input data-action='create-user' data-type='name' placeholder="Name"></td>
                <td><input data-action='create-user' data-type='type' placeholder="Role"></td>
                <td><input type="password" data-action='create-user' data-type='password' placeholder="*****"></td>
                <td><a class="pure-button pure-button button-sucess button-base login" data-table='users'
                       on:click="{createHandler}">Create</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="pure-u-1 text-center">
        Please note that the only roles are: admin, machine and display.
    </div>

</div>
{:catch error}
<div class="pure-g center">
    <p style="color: red">{error.body.message}</p>
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
        font-size: 1.2rem;
    }

    td, .text-center {
        text-align: center;
    }

    .button-base {
        color: white;
        border-radius: 4px;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    }

    .button-error {
        background: rgb(202, 60, 60);
    }

    .button-sucess {
        background: rgb(66, 184, 221);
    }
</style>