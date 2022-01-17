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
		await register($username, $password, $email, $phone, $firstName, $lastName);
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

	$: un_valid =
		$username == '' || $username == null
			? ''
			: isValid('username', $username)
			? 'username valid'
			: 'username invalid';
	$: pw_valid =
		$password == '' || $password == null
			? ''
			: isValid('password', $password)
			? 'password valid'
			: 'password invalid';
	$: c_valid =
		$confirmPass == '' || $confirmPass == null
			? ''
			: $password != $confirmPass
			? 'password does not match'
			: !isValid('password', $confirmPass)
			? 'password confirmation invalid'
			: 'password confirmation matches';

	$: e_valid =
		$email == '' || $email == null
			? ''
			: isValid('email', $email)
			? 'email valid'
			: 'email invalid';
	$: p_valid =
		$phone == '' || $phone == null
			? ''
			: $phone == '' || $phone == null
			? ''
			: isValid('phone', $phone)
			? 'phone number valid'
			: 'phone number invalid';
	$: fn_valid =
		$firstName == '' || $firstName == null
			? ''
			: isValid('name', $firstName)
			? 'first name valid'
			: 'first name invalid';
	$: ln_valid =
		$lastName == '' || $lastName == null
			? ''
			: isValid('name', $lastName)
			? 'last name valid'
			: 'last name invalid';
</script>

<form on:submit|preventDefault={reg}>
	<Input type="text" placeholder="username" name="username" bind:value={$username} />
	<small>{un_valid}</small>
	<Input type="password" placeholder="password" name="password" bind:value={$password} />
	<small>{pw_valid}</small>
	<Input
		type="password"
		placeholder="confirm password"
		name="password-confirm"
		bind:value={$confirmPass}
	/>
	<small>{c_valid}</small>
	<Input type="email" placeholder="email" name="email" bind:value={$email} />
	<small>{e_valid}</small>
	<Input type="text" placeholder="phone number (optional)" name="phone" bind:value={$phone} />
	<small>{p_valid}</small>
	<Input type="text" placeholder="first name" name="firstName" bind:value={$firstName} />
	<small>{fn_valid}</small>
	<Input type="text" placeholder="last name" name="lastName" bind:value={$lastName} />
	<small>{ln_valid}</small>
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

	small {
		float: left;
		margin-left: 0.5%;
		font-size: x-small;
		font-weight: lighter;
	}
</style>
