<script>
	export let user;
	import MenuButton from '../menu/MenuButton.svelte';
	import { post } from '$lib/api';
	import { onMount } from 'svelte';
	onMount(async () => {
		const local = await post('/user/info', { id: user });
		user = local;
	});
</script>

<MenuButton header>
	<h3>Hi, {user.name}</h3>
	<small>@{user.username}</small>
</MenuButton>

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
