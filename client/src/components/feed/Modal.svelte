<!-- src/Modal.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';

	export let isOpenModal;
	export let message;
	const dispatch = createEventDispatcher();

	function closeModal() {
		isOpenModal = false;
		dispatch('closeModal', { isOpenModal });
	}
</script>

<div id="background" style="--display: {isOpenModal ? 'block' : 'none'}" on:click={closeModal} />
<div id="modal" style="--display: {isOpenModal ? 'block' : 'none'};">
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

	#modal {
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

	p {
		margin-top: 5%;
	}
</style>
