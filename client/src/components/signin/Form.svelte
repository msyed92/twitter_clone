<script>
	import { register } from '$lib/auth/authenticate';
	import Input from './Input.svelte';
	import MenuButton from '../menu/MenuButton.svelte';
	import { isValid } from '$lib/utils';
	$: username = '';
	$: password = '';
	$: email = '';
	$: phone = null;
	$: firstName = '';
	$: lastName = '';
	let isDisabled = 'true';
</script>

<form
	on:submit|preventDefault={async () => {
		await register(username, password, email, phone, firstName, lastName);
	}}
>
	<Input
		type="text"
		placeholder="username"
		name="username"
		bind:value={username}
	/>
	<Input type="password" placeholder="password" name="password" bind:value={password} />
	<Input
		type="password"
		placeholder="confirm password"
		name="password-confirm"
		bind:value={password}
	/>
	<Input type="email" placeholder="email" name="email" bind:value={email} />
	<Input type="text" placeholder="phone number (optional)" name="phone" bind:value={phone} />
	<Input type="text" placeholder="first name" name="firstName" bind:value={firstName} />
	<Input type="text" placeholder="last name" name="lastName" bind:value={lastName} />
	<MenuButton type="submit" register disabled={isDisabled}>Sign Up</MenuButton>
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
