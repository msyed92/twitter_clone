<script>
	import Menu from '../components/menu/Menu.svelte';
	import Feed from '../components/feed/Feed.svelte';
	import Auth from '../components/Auth.svelte';
	import Explorer from '../components/explorer/Explorer.svelte';
	import { logout, authenticate } from '$lib/auth/authenticate';
	import { onMount } from 'svelte';
	import { authenticated } from '../stores/auth';
	import { get } from '$lib/api';
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
		PROTECTED
		<Menu />
		<Feed />
		<Explorer />
		<form on:submit={logout}>
			<button type="submit">Log Out</button>
		</form>
	{:else}
		<Auth />
	{/if}
</main>
