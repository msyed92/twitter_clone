<!-- src/Modal.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';

	export let isOpenModal, message, modalId;
	const dispatch = createEventDispatcher();
	function closeModal() {
		isOpenModal = false;
		dispatch('closeModal', { isOpenModal });
	}
</script>

<div id="background" style="--display: {isOpenModal ? 'block' : 'none'}" on:click={closeModal} />
<div id="modal-{modalId}" style="--display: {isOpenModal ? 'block' : 'none'};">
	<p>{message}</p>
</div>

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
</style>
