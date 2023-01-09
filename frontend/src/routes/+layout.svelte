<script>
	import NavBar from '../components/navigation.svelte';
    import { SvelteToast } from '@zerodevx/svelte-toast'

</script>


<NavBar />
<main>
	<slot />
</main>
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<style>
    :root {
        --toastContainerTop: auto;
        --toastContainerRight: auto;
        --toastContainerBottom: 8rem;
        --toastContainerLeft: calc(50vw - 8rem);
    }
</style>