<script>
	import Menu from '../components/menu/Menu.svelte';
	import Feed from '../components/feed/Feed.svelte';
	import Auth from '../components/Auth.svelte';
	import Explorer from '../components/explorer/Explorer.svelte';
	import { onMount } from 'svelte';
	import { get } from '$lib/api';

	let auth;

	onMount(async () => {
		const response = await get('/user/protected');
		console.log(response);
	});
</script>

<svelte:head>
	<title>Twitter 2.0</title>
</svelte:head>

<main>
	{#if auth}
		<Menu />
		<Feed />
		<Explorer />
	{:else}
		PAGE
		<Auth />
	{/if}
</main>
