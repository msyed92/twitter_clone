<script>
	export let type, placeholder, name;
	export let value = '';
	const onInput = (e) => (value = e.target.value);
</script>

<input {type} {placeholder} {name} {value} on:change={onInput} autocomplete="off" />

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
