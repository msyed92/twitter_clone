<script>
	//exported variables
	export let user;

	//components
	import Button from '../../general/Button.svelte';

	//imported functions
	import { post } from '$lib/api';
	import { onMount } from 'svelte';

	//local functions
	onMount(async () => {
		const local = await post('/user/info', { id: user });
		user = local;
	});
</script>

<div>
	<Button class="header">
		<h3>Hi, {user.name}</h3>
		<small>@{user.username}</small>
	</Button>
</div>

<style>
	h3 {
		display: inline-block;
		color: #202142;
	}

	small {
		font-weight: lighter;
		color: #202142;
		font-weight: bold;
	}

	* :global(.header) {
		margin: 2% 0 0 3%;
		padding: 0 0.75rem;
	}
</style>
