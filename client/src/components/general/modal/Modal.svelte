<!-- src/Modal.svelte -->
<script>
	import Button from '../Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import { autoresize } from 'svelte-textarea-autoresize';
	import { post } from '../../../lib/api';

	export let isOpenModal, message, modalId, tweet, reload;
	let tweetText = tweet ? tweet.content : '';
	const dispatch = createEventDispatcher();
	function closeModal() {
		tweetText = tweet ? tweet.content : '';
		isOpenModal = false;
		dispatch('closeModal', { isOpenModal });
	}

	const edit = async (type) => {
		if (type == 'edit' || type == 'delete') {
			await post(`/tweets/${type}`, { tweet_id: tweet.id, content: tweetText });
		}
		closeModal();
		reload();
	};
</script>

<div
	id="background-{modalId}"
	style="--display: {isOpenModal ? 'block' : 'none'}"
	on:click={closeModal}
/>
{#if modalId == 'edit'}
	<div id="modal-edit" style="--display: {isOpenModal ? 'block' : 'none'};">
		<span>Edit Your Tweet</span>
		<textarea
			use:autoresize
			type="text"
			class="tweet-input"
			autocomplete="off"
			spellcheck="false"
			bind:value={tweetText}
		/>
		<Button
			class="edit-btn"
			click={() => {
				edit('edit');
			}}>Submit</Button
		>
	</div>
{:else if modalId == 'delete'}
	<div id="modal-delete" style="--display: {isOpenModal ? 'block' : 'none'};">
		<p>Are you sure you want to delete this tweet?</p>
		<Button
			class="delete-btn"
			click={() => {
				edit('delete');
			}}>Delete</Button
		>
		<Button
			class="cancel-btn"
			click={() => {
				edit('cancel');
			}}>Cancel</Button
		>
	</div>
{:else}
	<div id="modal-{modalId}" style="--display: {isOpenModal ? 'block' : 'none'};">
		<p>{message}</p>
	</div>
{/if}

<style>
	#background-tweet,
	#background-follow,
	#background-signin {
		display: var(--display);
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}

	#background-edit,
	#background-delete {
		display: var(--display);
		background-color: hsla(278, 67%, 100%, 0.12);
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

	#modal-delete {
		display: var(--display);
		text-align: center;
		height: 12.5%;
		width: 30%;
		position: fixed;
		z-index: 2;
		top: 35%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #c5c6e3;
		color: #202142;
		border-radius: 20px;
	}

	#modal-follow {
		display: var(--display);
		text-align: center;
		height: 5%;
		width: 15%;
		position: fixed;
		z-index: 2;
		top: 85%;
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
		min-height: 15%;
		width: 40%;
		position: fixed;
		z-index: 2;
		top: 35%;
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
		min-height: 1rem;
		font-size: 1.125rem;
	}
	textarea:focus {
		background-color: #c5c6e3;
		border: none;
		outline: none;
	}

	::placeholder {
		color: #202142;
		font-weight: lighter;
		border: none;
		font-size: 1.25rem;
		padding-bottom: 0;
	}

	* :global(.edit-btn) {
		background-color: #fff;
		color: #202142;
		border: #202142 solid 0.1rem;
		float: right;
		margin-top: 15%;
		font-size: 1.125rem;
		padding: 0.5% 5%;
	}

	* :global(.edit-btn):hover {
		background-color: #c5c6e3;
	}

	* :global(.delete-btn) {
		margin-right: 3%;
		background-color: rgba(255, 0, 0, 0.24);
		color: #202142;
		border: #202142 solid 0.1rem;
		padding: 0.5% 5%;
	}

	* :global(.delete-btn):hover {
		background-color: #c5c6e3;
	}

	* :global(.cancel-btn) {
		margin-left: 3%;
		background-color: #20214280;
		color: #202142;
		border: #202142 solid 0.1rem;
		padding: 0.5% 5%;
	}

	* :global(.cancel-btn):hover {
		background-color: #c5c6e3;
	}

	span {
		font-size: 1.125rem;
	}
</style>
