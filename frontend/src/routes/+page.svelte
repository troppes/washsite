<script>
    export let data;
</script>

<div class="pure-g center">
    <h1>Washtrak v0.0.1</h1>
</div>

{#await data['machines']}
	<p>Fetching machines</p>
{:then machines}
    <div class="pure-g center">
        <table class="pure-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {#each machines.machines as machine}
                <tr>
                    <td>{machine.name}</td>
                    <td>{machine.status}</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
    h1 {
        font-size: 4rem;
    }
    table {
        font-size: 2rem;
    }
</style>