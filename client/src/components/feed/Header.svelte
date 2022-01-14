<script>
	export let user;

	import { post } from '$lib/api';
	import { onMount } from 'svelte';
	onMount(async () => {
		const local = await post('/user/info', { id: user });
		user = local;
	});
</script>

<div class="header">
	<h3>Hi, {user.name}</h3>
	<small>@{user.username}</small>
</div>

<style>
	.header {
		margin: 0;
		padding: 2% 0 3% 0;
		width: 100%;
	}

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
