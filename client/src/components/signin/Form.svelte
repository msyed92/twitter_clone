<script>
	import { register } from '$lib/auth/authenticate';
	import SignInput from './SignInput.svelte';
	import Button from '../buttons/Button.svelte';
	import { user } from '../../stores/stores';
	export let username = '',
		password = '',
		confirmPass = '',
		phone = '',
		firstName = '',
		lastName = '',
		match = '',
		email = '';

	const passwordMatches = () => {
		if (password == null || confirmPass == null || password == '' || confirmPass == '') {
			match = null;
		} else if (password == confirmPass) {
			match = 'matches';
		} else {
			match = 'does not match';
		}
	};

	const reg = async () => {
		await register(username, password, email, phone, firstName, lastName);
	};
</script>

<form on:submit|preventDefault={reg} on:input on:change={passwordMatches}>
	<SignInput
		type="text"
		placeholder="username"
		name="username"
		bind:value={username}
		on:input
		on:change
	/>
	<SignInput
		type="password"
		placeholder="password"
		name="password"
		bind:value={password}
		on:input
		on:change
	/>
	<SignInput
		type="password"
		placeholder="password confirmation"
		name="confirmation"
		bind:value={confirmPass}
		bind:match
		on:input
		on:change
	/>
	<SignInput type="email" placeholder="email" name="email" bind:value={email} on:input on:change />
	<SignInput
		type="tel"
		placeholder="phone number (optional)"
		name="phone"
		bind:value={phone}
		on:input
		on:change
	/>
	<SignInput
		type="text"
		placeholder="first name"
		name="firstName"
		bind:value={firstName}
		on:input
		on:change
	/>
	<SignInput
		type="text"
		placeholder="last name"
		name="lastName"
		bind:value={lastName}
		on:input
		on:change
	/>
	<Button class="signup">Sign Up</Button>
</form>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@200;500;700&display=swap');

	:global(body, main) {
		margin: 0;
		font-family: 'Be Vietnam Pro', sans-serif;
	}

	form {
		height: auto;
		width: 25%;
		margin: auto;
	}

	* :global(.signup) {
		margin: 3% 0;
		height: 2rem;
		width: 45%;
	}
</style>
