<script>
	export let type = 'button';
	export let disabled = false;
	export { className as class };

	let className = '';
</script>

<button {type} {disabled} class={className} on:click>
	<slot />
</button>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@200;500;700&display=swap');

	:global(body, main) {
		margin: 0;
		font-family: 'Be Vietnam Pro', sans-serif;
	}

	button {
		border: 0;
		border-radius: 50px;
		cursor: pointer;
		margin: 0;
		font-family: 'Be Vietnam Pro', sans-serif;
	}
</style>
