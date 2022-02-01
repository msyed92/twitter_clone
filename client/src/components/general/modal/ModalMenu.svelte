<!-- src/Modal.svelte -->
<script>
	//exports
	export let isOpenModal, user, viewer, isOpenModal_;

	//imported functions
	import { createEventDispatcher, onMount } from 'svelte';
	import { post } from '$lib/api';

	//componenets
	import Modal from './Modal.svelte';

	//local variables
	const dispatch = createEventDispatcher();
	let follows;

	//local functions
	onMount(async () => {
		const doesFollow = await post('/f/doesfollow', { id: user.id, viewer_id: viewer }).then((r) => {
			return r;
		});
		if (user.id == 13 || viewer == 13) {
			console.log(doesFollow);
		}
		follows = doesFollow.follows;
	});

	$: followUnfollow = follows ? 'unfollow' : 'follow';

	$: message = user.id == viewer ? 'Edit post' : `${followUnfollow} ${user.username}`;

	let msg = `Error ${followUnfollow}ing ${user.username}`;

	function closeModal() {
		isOpenModal = false;
		dispatch('closeModal', { isOpenModal });
	}

	function openModal() {
		isOpenModal_ = true;
	}
	function closeModal_() {
		isOpenModal_ = false;
	}

	const handleClick = async () => {
		if (user.id == viewer) {
			alert('edit post');
		} else {
			await post('/f/follow', { id: user.id, viewer_id: viewer })
				.then((r) => {
					if (r.success && !follows) {
						msg = `You ${followUnfollow}ed ${user.username}`;
					}
					openModal();

					return r;
				})
				.then((r) => {});
		}
	};
</script>

<div id="background" style="--display: {isOpenModal ? 'block' : 'none'}" on:click={closeModal} />
<div id="modal" style="--display: {isOpenModal ? 'block' : 'none'};">
	<p on:click={handleClick}>{message}</p>
</div>

<Modal isOpenModal={isOpenModal_} message={msg} modalId="tweet" on:closeModal_={closeModal_} />

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
		padding-top: 1%;
		text-align: center;
		z-index: 2;
		top: 120%;
		left: 84%;
		transform: translate(-50%, -50%);
		color: #c5c6e3;
		font-weight: lighter;
		background-color: #202142;
		border-radius: 8px;
		border: 1px solid #c5c6e3;
		width: 25%;
		position: absolute;
	}

	#modal:hover {
		cursor: pointer;
		color: white;
		font-weight: bolder;
	}

	p {
		margin-top: 5%;
	}
</style>
