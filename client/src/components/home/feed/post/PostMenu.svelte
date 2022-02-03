<script>
	//components
	import ModalMenu from '../../../general/modal/ModalMenu.svelte';

	//exported variables
	export let user, viewer;

	//local variables
	let isOpenModal = false;

	//local functions
	function openModal() {
		isOpenModal = true;
	}

	function closeModal() {
		isOpenModal = false;
	}
</script>

<svg
	on:click={openModal}
	xmlns="http://www.w3.org/2000/svg"
	x="0px"
	y="0px"
	width="25"
	height="25"
	viewBox="0 0 172 172"
	style=" fill:#000000;"
	><g transform="translate(0.516,0.516) scale(0.994,0.994)"
		><g
			fill="none"
			fill-rule="nonzero"
			stroke="none"
			stroke-width="1"
			stroke-linecap="butt"
			stroke-linejoin="none"
			stroke-miterlimit="10"
			stroke-dasharray=""
			stroke-dashoffset="0"
			font-family="none"
			font-weight="none"
			font-size="none"
			text-anchor="none"
			style="mix-blend-mode: normal"
			><g fill="#c5c6e3" stroke="#cccccc" stroke-linejoin="round"
				><path
					d="M103.2,40.13333c0,9.4993 -7.7007,17.2 -17.2,17.2c-9.4993,0 -17.2,-7.7007 -17.2,-17.2c0,-9.4993 7.7007,-17.2 17.2,-17.2c9.4993,0 17.2,7.7007 17.2,17.2zM103.2,86c0,9.4993 -7.7007,17.2 -17.2,17.2c-9.4993,0 -17.2,-7.7007 -17.2,-17.2c0,-9.4993 7.7007,-17.2 17.2,-17.2c9.4993,0 17.2,7.7007 17.2,17.2zM103.2,131.86667c0,9.4993 -7.7007,17.2 -17.2,17.2c-9.4993,0 -17.2,-7.7007 -17.2,-17.2c0,-9.4993 7.7007,-17.2 17.2,-17.2c9.4993,0 17.2,7.7007 17.2,17.2z"
				/></g
			><path d="M0,172v-172h172v172z" fill="none" stroke="none" stroke-linejoin="miter" /><g
				fill="#c5c6e3"
				stroke="none"
				stroke-linejoin="miter"
				><path
					d="M86,22.93333c-9.4993,0 -17.2,7.7007 -17.2,17.2c0,9.4993 7.7007,17.2 17.2,17.2c9.4993,0 17.2,-7.7007 17.2,-17.2c0,-9.4993 -7.7007,-17.2 -17.2,-17.2zM86,68.8c-9.4993,0 -17.2,7.7007 -17.2,17.2c0,9.4993 7.7007,17.2 17.2,17.2c9.4993,0 17.2,-7.7007 17.2,-17.2c0,-9.4993 -7.7007,-17.2 -17.2,-17.2zM86,114.66667c-9.4993,0 -17.2,7.7007 -17.2,17.2c0,9.4993 7.7007,17.2 17.2,17.2c9.4993,0 17.2,-7.7007 17.2,-17.2c0,-9.4993 -7.7007,-17.2 -17.2,-17.2z"
				/></g
			><path d="" fill="none" stroke="none" stroke-linejoin="miter" /></g
		></g
	></svg
>
<ModalMenu {isOpenModal} {user} {viewer} on:click on:closeModal={closeModal} />

<style>
	svg {
		float: right;
	}
	svg:hover {
		cursor: pointer;
	}
</style>
