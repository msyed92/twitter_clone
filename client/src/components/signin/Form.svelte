<script>
	import { register } from '$lib/auth/authenticate';
	import Input from './Input.svelte';
	import MenuButton from '../menu/MenuButton.svelte';
	import { writable } from 'svelte/store';

	import { isValid } from '$lib/utils';

	const username = writable('');
	const password = writable('');
	const confirmPass = writable('');
	const email = writable('');
	const phone = writable('');
	const firstName = writable('');
	const lastName = writable('');

	const reg = async () => {
		await register($username, $password, $confirmPass, $email, $phone, $firstName, $lastName);
	};

	$: isDisabled =
		!isValid('username', $username) ||
		!isValid('password', $password) ||
		$password != $confirmPass ||
		!isValid('password', $confirmPass) ||
		!isValid('email', $email) ||
		!isValid('phone', $phone) ||
		!isValid('name', $firstName) ||
		!isValid('name', $lastName);
</script>

<form on:submit|preventDefault={reg}>
	<Input type="text" placeholder="username" name="username" bind:value={$username} />
	<Input type="password" placeholder="password" name="password" bind:value={$password} />
	<Input
		type="password"
		placeholder="confirm password"
		name="password-confirm"
		bind:value={$confirmPass}
	/>
	<Input type="email" placeholder="email" name="email" bind:value={$email} />
	<Input type="text" placeholder="phone number (optional)" name="phone" bind:value={$phone} />
	<Input type="text" placeholder="first name" name="firstName" bind:value={$firstName} />
	<Input type="text" placeholder="last name" name="lastName" bind:value={$lastName} />
	<MenuButton type="submit" register bind:disabled={isDisabled}>Sign Up</MenuButton>
</form>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@200;500;700&display=swap');

	:global(body, main) {
		margin: 0;
		font-family: 'Be Vietnam Pro', sans-serif;
	}

	form {
		height: 100%;
		padding-bottom: 15%;
	}
</style>
