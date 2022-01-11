<script>
	import Menu from '../components/menu/Menu.svelte';
	import Feed from '../components/feed/Feed.svelte';
	import Auth from '../components/Auth.svelte';
	import Explorer from '../components/explorer/Explorer.svelte';
	let auth = false;
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
		<Auth />
	{/if}
</main>
