<script>
	import { isValid } from '$lib/utils';

	export let type, placeholder, name, style;
	export let dataValid = '';
	export let match = '';
	export let value;
	export let small = '';

	const onInput = (e) => {
		value = e.target.value;
		dataValid =
			value == '' || value == null || name == 'confirmation' ? '' : isValid(name, value).msg;
		small =
			value == '' || value == null
				? ''
				: name == 'firstName'
				? 'first name'
				: name == 'lastName'
				? 'last name'
				: name == 'phone'
				? 'phone number'
				: name;
	};
</script>

<input
	{type}
	{placeholder}
	{name}
	{value}
	class={style}
	{dataValid}
	{small}
	{match}
	on:input={onInput}
	autocomplete="off"
/>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@200;500;700&display=swap');

	input {
		background-color: #202142;
		display: block;
		border: 0;
		color: white;
		width: inherit;
		font-size: large;
		max-height: inherit;
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
