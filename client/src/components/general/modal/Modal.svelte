<!-- src/Modal.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	import { autoresize } from 'svelte-textarea-autoresize';

	export let isOpenModal, message, modalId, tweet;
	const dispatch = createEventDispatcher();
	function closeModal() {
		isOpenModal = false;
		dispatch('closeModal', { isOpenModal });
	}
</script>

<div id="background" style="--display: {isOpenModal ? 'block' : 'none'}" on:click={closeModal} />
{#if modalId == 'edit'}
	<textarea
		id="modal-edit"
		style="--display: {isOpenModal ? 'block' : 'none'};"
		use:autoresize
		type="text"
		class="tweet-input"
		autocomplete="off"
		spellcheck="false"
		value={tweet}
	/>
{:else}
	<div id="modal-{modalId}" style="--display: {isOpenModal ? 'block' : 'none'};">
		<p>{message}</p>
	</div>
{/if}

<style>
	#background {
		display: var(--display);
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}

	#modal-tweet {
		display: var(--display);
		text-align: center;
		height: 5%;
		width: 15%;
		position: fixed;
		z-index: 2;
		top: 90%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #c5c6e3;
		color: #202142;
		border-radius: 25px;
	}
	#modal-follow {
		display: var(--display);
		text-align: center;
		height: 5%;
		width: 15%;
		position: fixed;
		z-index: 2;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #c5c6e3;
		color: #202142;
		border-radius: 25px;
	}
	#modal-edit {
		padding: 1%;
		display: var(--display);
		text-align: left;
		height: 15%;
		width: 30%;
		position: fixed;
		z-index: 2;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #c5c6e3;
		color: #202142;
		border-radius: 10px;
	}

	#modal-signin {
		display: var(--display);
		text-align: center;
		width: 20%;
		position: fixed;
		z-index: 2;
		top: 34%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
		color: #202142;
		border-radius: 20px;
		margin-bottom: 10%;
		border: 1px solid #c5c6e3;
	}

	p {
		margin-top: 5%;
	}

	/********* TWEET EDIT *********/

	.tweet-input {
		margin-top: 3%;
		resize: none;
	}

	.tweet-input::-webkit-scrollbar {
		display: none;
	}

	textarea {
		width: 90%;
		background-color: #c5c6e3;
		border: none;
		color: #202142;
		min-height: 1.5rem;
		font-size: 1.25rem;
	}
	textarea:focus {
		background-color: #c5c6e3;
		border: none;
		outline: none;
		font-size: 1.25rem;
	}

	::placeholder {
		color: #202142;
		font-weight: lighter;
		border: none;
		font-size: 1.25rem;
		padding-bottom: 0;
	}
</style>
