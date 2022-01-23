<script>
	export let user;
	import Button from '../general/Button.svelte';
	import { post } from '$lib/api';
	import { onMount } from 'svelte';
	onMount(async () => {
		const local = await post('/user/info', { id: user });
		user = local;
	});
</script>

<Button header>
	<h3>Hi, {user.name}</h3>
	<small>@{user.username}</small>
</Button>

<style>
	h3 {
		padding-left: 3%;
		display: inline;
	}

	small {
		font-weight: lighter;
		padding-left: 1%;
		color: #c5c6e3;
	}
</style>
