<script>
	export let type, placeholder, name, value, style;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	function valid() {
		dispatch('valid');
	}
</script>

<input {type} {placeholder} {name} {value} {style} autocomplete="off" on:focus={valid} />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@200;500;700&display=swap');

	input {
		background-color: #202142;
		display: block;
		padding-top: 1%;
		margin-top: 1%;
		border: 0;
		color: white;
		height: 10%;
		width: 100%;
		font-size: large;
	}

	input:focus {
		border: 0;
		outline: none;
		color: white;
	}

	::placeholder {
		color: #c5c6e3;
		font-family: 'Be Vietnam Pro', sans-serif;
	}
</style>
