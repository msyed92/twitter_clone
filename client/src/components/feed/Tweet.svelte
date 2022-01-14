<script>
	import MenuButton from '../menu/MenuButton.svelte';
</script>

<div>
	<input type="text" placeholder="What's happening?" />

	<form action=""><MenuButton type="submit" tweet small right>Tweet</MenuButton></form>
</div>

<style>
	div {
		padding: 0 3% 3% 3%;
		display: grid;
		grid-template-columns: 3fr 1fr;
	}

	input {
		background-color: #202142;
		border: none;
		color: #c5c6e3;
	}

	::placeholder {
		color: #c5c6e3;
		font-weight: lighter;
		border: none;
		font-size: 1.25rem;
		padding-bottom: 0;
	}

	input:focus {
		border: none;
		outline: none;
	}
</style>
