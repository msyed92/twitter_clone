<script>
	//exports
	export let user, reload;

	//components
	import Button from '../general/Button.svelte';
	import Modal from '../general/modal/Modal.svelte';

	//imported functions
	import { post } from '$lib/api';
	import { onMount } from 'svelte';
	import { newTweet } from '$lib/auth/authenticate';
	import { autoresize } from 'svelte-textarea-autoresize';

	//variables
	let text, current_user;
	const modalId = 'tweet';
	let isOpenModal = false;

	//reactive variables
	$: isDisabled = text === '' || text == null || text.length >= 280;
	$: message = '';
	onMount(async () => {
		const local = await post('/user/info', { id: user });
		current_user = local;
	});

	//local functions
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
		spellcheck="false"
		bind:value={text}
	/>

	<form
		on:submit|preventDefault={async () => {
			await newTweet(text, current_user.id)
				.then((r) => {
					message = r.msg;
					openModal();
					return r;
				})

				.catch((e) => {
					throw e;
				});
			text = '';
			reload();
		}}
	>
		<Button type="submit" class="btn" disabled={isDisabled}>Tweet</Button>
		<Modal {isOpenModal} {message} {modalId} on:closeModal={closeModal} />
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
		font-size: 1.25rem;
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
		color: white;
		font-size: 1.25rem;
	}

	.tweet-input {
		margin-top: 3%;
		resize: none;
	}

	.tweet-input::-webkit-scrollbar {
		display: none;
	}

	* :global(.btn) {
		width: 50%;
		height: 2rem;
		margin-top: 5%;
		float: right;
	}
	* :global(.btn):hover {
		width: 50%;
		height: 2rem;
		margin-top: 5%;
		float: right;
		background-color: #c5c6e3;
	}

	* :global(.btn):disabled {
		width: 50%;
		height: 2rem;
		margin-top: 5%;
		float: right;
		background-color: #c5c6e3;
	}
</style>
