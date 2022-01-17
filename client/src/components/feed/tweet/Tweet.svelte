<script>
	export let user;
	import Button from '../../buttons/Button.svelte';
	import { post } from '$lib/api';
	import { onMount } from 'svelte';
	import { newTweet } from '$lib/auth/authenticate';
	import { autoresize } from 'svelte-textarea-autoresize';
	import Modal from '../Modal.svelte';
	let text;

	$: isDisabled = text === '' || text == null || text.length >= 280;
	$: message = 'default';
	onMount(async () => {
		const local = await post('/user/info', { id: user });
		user = local;
	});

	let isOpenModal = false;

	function openModal() {
		isOpenModal = true;
	}

	function closeModal() {
		isOpenModal = false;
	}
</script>

<div>
	<textarea
		use:autoresize
		type="text"
		class="tweet-input"
		placeholder="What's happening?"
		autocomplete="off"
		bind:value={text}
	/>

	<form
		on:submit|preventDefault={async () => {
			await newTweet(text, user.id)
				.then((r) => {
					return r;
				})
				.then(async (r) => {
					message = r.message;
					openModal();
					return r;
				})
				.catch((e) => {
					throw e;
				});
			text = '';
		}}
	>
		<Button type="submit" tweet small disabled={isDisabled}>Tweet</Button>
		<Modal {isOpenModal} {message} on:closeModal={closeModal} />
	</form>
</div>

<style>
	div {
		padding: 0 3% 3% 3%;
		display: grid;
		grid-template-columns: 3fr 1fr;
	}

	textarea {
		background-color: #202142;
		border: none;
		color: #c5c6e3;
		min-height: 1.5rem;
	}

	::placeholder {
		color: #c5c6e3;
		font-weight: lighter;
		border: none;
		font-size: 1.25rem;
		padding-bottom: 0;
	}

	textarea:focus {
		border: none;
		outline: none;
		color: #c5c6e3;
		font-size: 1.25rem;
	}

	.tweet-input {
		margin-top: 3%;
		resize: none;
	}

	.tweet-input::-webkit-scrollbar {
		display: none;
	}
</style>
