<script>
	export let user;
	import MenuButton from '../menu/MenuButton.svelte';
	import { post } from '$lib/api';
	import { onMount } from 'svelte';
	import { newTweet } from '$lib/auth/authenticate';

	let text;

	onMount(async () => {
		const local = await post('/user/info', { id: user });
		user = local;
	});
</script>

<div>
	<input type="text" class="tweet-input" placeholder="What's happening?" bind:value={text} />

	<form
		on:submit|preventDefault={async () => {
			const response = await newTweet(text, user.id)
				.then((r) => {
					return r;
				})
				.catch((e) => {
					throw e;
				});
			const status = response.status;
			const message = response.message;
			alert(message);
		}}
	>
		<MenuButton type="submit" tweet small>Tweet</MenuButton>
	</form>
</div>

<style>
	div {
		padding: 0 3% 3% 3%;
		display: grid;
		grid-template-columns: 3fr 1fr;
	}

	input {
		background-color: #202142;
		border: none;
		color: #c5c6e3;
	}

	::placeholder {
		color: #c5c6e3;
		font-weight: lighter;
		border: none;
		font-size: 1.25rem;
		padding-bottom: 0;
	}

	input:focus {
		border: none;
		outline: none;
	}

	.tweet-input {
		margin-top: 3%;
	}
</style>
