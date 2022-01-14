<script>
	import Menu from '../components/menu/Menu.svelte';
	import Feed from '../components/feed/Feed.svelte';
	import Auth from '../components/Auth.svelte';
	import Explorer from '../components/explorer/Explorer.svelte';
	import { authenticate } from '$lib/auth/authenticate';
	import { onMount } from 'svelte';
	import { authenticated } from '../stores/auth';
	$: auth = false;
	onMount(async () => {
		await authenticate()
			.then((res) => {
				authenticated.subscribe((value) => {
					auth = value;
				});
				return res;
			})
			.catch((err) => {
				throw err;
			});
	});
</script>

<svelte:head>
	<title>Twitter 2.0</title>
</svelte:head>

<main>
	{#if auth}
		<div class="grid-container">
			<Menu />
			<Feed />
			<Explorer />
		</div>
	{:else}
		<Auth />
	{/if}
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@200;500;700&display=swap');

	:global(body) {
		margin: 0;
	}
	:global(div, button, body, main, input) {
		font-family: 'Be Vietnam Pro', sans-serif;
	}

	.grid-container {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
	}
</style>
