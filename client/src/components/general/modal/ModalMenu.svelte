<!-- src/Modal.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';

	export let isOpenModal;
	const dispatch = createEventDispatcher();
	function closeModal() {
		isOpenModal = false;
		dispatch('closeModal', { isOpenModal });
	}
</script>

<div id="background" style="--display: {isOpenModal ? 'block' : 'none'}" on:click={closeModal} />
<div id="modal" style="--display: {isOpenModal ? 'block' : 'none'};">
	<p>MENU</p>
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
		z-index: 2;
		top: 133%;
		left: 77%;
		transform: translate(-50%, -50%);
		color: #c5c6e3;
		background-color: #202142;
		border-radius: 8px;
		border: 1px solid #c5c6e3;
		width: 45%;
		position: absolute;
	}

	p {
		margin-top: 5%;
	}
</style>
