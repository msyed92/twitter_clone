<script>
	import { isValid } from '$lib/utils';
	import { user } from '../../stores/stores';
	import { arrOfObjContains as contains } from '$lib/utils';

	export let type, placeholder, name, style;
	export let match = '';
	export let dataValid = '';
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
	const onChange = () => {
		console.log($user, 'HERE');
		console.log(contains(name, $user), 'HERE3');
		if (contains(name, $user)) {
			user.set(
				user.filter((e) => {
					return e.name != name;
				})
			);
			console.log($user, 'HERE4');
		}
		user.set([...$user, { name: name, value: value }]);

		console.log($user, 'HERE2');
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
	on:change={onChange}
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
