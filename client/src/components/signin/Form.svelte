<script>
	import { register } from '$lib/auth/authenticate';
	import SignInput from './SignInput.svelte';
	import Button from '../buttons/Button.svelte';
	import { writable } from 'svelte/store';

	const username = writable('');
	const password = writable('');
	const confirmPass = writable('');
	const email = writable('');
	const phone = writable('');
	const firstName = writable('');
	const lastName = writable('');

	const reg = async () => {
		await register($username, $password, $email, $phone, $firstName, $lastName);
	};
</script>

<form on:submit|preventDefault={reg}>
	<SignInput type="text" placeholder="username" name="username" bind:value={$username} on:input />
	<SignInput
		type="password"
		placeholder="password"
		name="password"
		bind:value={$password}
		on:input
	/>
	<SignInput
		type="password"
		placeholder="password confirmation"
		name="confirm"
		bind:value={$confirmPass}
		on:input
	/>
	<SignInput type="email" placeholder="email" name="email" bind:value={$email} on:input />
	<SignInput
		type="tel"
		placeholder="phone number (optional)"
		name="phone"
		bind:value={$phone}
		on:input
	/>
	<SignInput
		type="text"
		placeholder="first name"
		name="firstName"
		bind:value={$firstName}
		on:input
	/>
	<SignInput type="text" placeholder="last name" name="lastName" bind:value={$lastName} on:input />
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
