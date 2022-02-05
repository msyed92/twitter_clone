<!-- src/Modal.svelte -->
<script>
	//exports
	export let isOpenModal, user, viewer, tweet;
	//imported functions
	import { createEventDispatcher, onMount } from 'svelte';
	import { post } from '$lib/api';
	import Modal from './Modal.svelte';

	//local variables
	const dispatch = createEventDispatcher();
	let follows;
	$: modalId = 'tweet';
	$: followUnfollow = follows ? 'unfollow' : 'follow';
	$: message =
		user.id == viewer
			? { edit: 'edit', del: 'delete' }
			: { edit: `${followUnfollow} ${user.username}` };
	let msg = `Error ${followUnfollow}ing ${user.username}`;

	//local functions

	const checkFollow = async () => {
		const doesFollow = await post('/f/doesfollow', { id: user.id, viewer_id: viewer }).then((r) => {
			return r;
		});
		follows = doesFollow.follows;
	};
	onMount(checkFollow);
	$: isOpenModal_ = false;

	function openModal() {
		isOpenModal_ = true;
	}

	function closeModal_() {
		isOpenModal_ = false;
	}

	function closeModal() {
		isOpenModal = false;
		dispatch('closeModal', { isOpenModal });
	}

	const handleClick = async (type = 'follow') => {
		if (user.id == viewer) {
			if (type == 'edit') {
				modalId = 'edit';
				msg = 'edit';
			} else {
				msg = 'delete';
			}
			openModal();
		} else {
			modalId = 'follow';
			await post('/f/follow', { id: user.id, viewer_id: viewer })
				.then((r) => {
					if (r.success) {
						msg = `You ${followUnfollow}ed ${user.username}`;
					} else {
						msg = r.error;
					}
					openModal();
					return r;
				})
				.then(async (r) => {
					await checkFollow();
				});
		}
	};
</script>

<div id="background" style="--display: {isOpenModal ? 'block' : 'none'}" on:click={closeModal} />
<div id="modal" style="--display: {isOpenModal ? 'block' : 'none'};">
	<span
		on:click={() => {
			handleClick('edit');
		}}>{message.edit}</span
	>
	{#if user.id == viewer}
		| <span
			on:click={() => {
				handleClick('delete');
			}}>{message.del}</span
		>
	{/if}
</div>
<Modal isOpenModal={isOpenModal_} {modalId} message={msg} {tweet} on:closeModal={closeModal_} />

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

	#modal {
		display: var(--display);
		padding: 1%;
		text-align: center;
		z-index: 2;
		top: 90%;
		left: 88%;
		transform: translate(-50%, -50%);
		color: #c5c6e3;
		font-weight: lighter;
		background-color: #202142;
		border-radius: 8px;
		border: 1px solid #c5c6e3;
		width: 15%;
		position: absolute;
	}

	span:hover {
		cursor: pointer;
		color: white;
		font-weight: bolder;
	}
</style>
