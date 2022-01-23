<script>
	import { register } from '$lib/auth/authenticate';
	import SignInput from './SignInput.svelte';
	import Button from '../buttons/Button.svelte';
	import { user } from '../../stores/stores';
	export let u, p, e, ph, f, l;
	$: username =
		$user.filter((obj) => obj.name == 'username').length <= 0
			? ''
			: $user.filter((obj) => obj.name == 'username')[0].value || '';
	$: password =
		$user.filter((obj) => obj.name == 'password').length <= 0
			? ''
			: $user.filter((obj) => obj.name == 'password')[0].value || '';
	$: confirmPass =
		$user.filter((obj) => obj.name == 'confirmation').length <= 0
			? ''
			: $user.filter((obj) => obj.name == 'confirmation')[0].value || '';
	$: email =
		$user.filter((obj) => obj.name == 'email').length <= 0
			? ''
			: $user.filter((obj) => obj.name == 'email')[0].value || '';
	$: phone =
		$user.filter((obj) => obj.name == 'phone').length <= 0
			? ''
			: $user.filter((obj) => obj.name == 'phone')[0].value || '';
	$: firstName =
		$user.filter((obj) => obj.name == 'firstName').length <= 0
			? ''
			: $user.filter((obj) => obj.name == 'firstName')[0].value || '';
	$: lastName =
		$user.filter((obj) => obj.name == 'lastName').length <= 0
			? ''
			: $user.filter((obj) => obj.name == 'lastName')[0].value || '';
	$: match = '';
	$: valid = false;

	const passwordMatches = () => {
		if (password == null || confirmPass == null || password == '' || confirmPass == '') {
			console.log(password == confirmPass, 'well here');
			match = '';
		} else if (password == confirmPass) {
			console.log(password == confirmPass, 'here');

			match = 'matches';
		} else {
			console.log(password == confirmPass, 'no here');
			match = 'does not match';
		}
		valid = [u, p, e, ph, f, l].every((e) => e == 'valid') && match == 'matches';
	};

	const reg = async () => {
		await register(username, password, email, phone, firstName, lastName);
	};
</script>

<form on:submit|preventDefault={reg} on:keypress={passwordMatches}>
	<SignInput
		type="text"
		placeholder="username"
		name="username"
		bind:value={username}
		bind:dataValid={u}
		on:input
		on:change
	/>
	<SignInput
		type="password"
		placeholder="password"
		name="password"
		bind:value={password}
		bind:dataValid={p}
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
	<SignInput
		type="email"
		placeholder="email"
		name="email"
		bind:value={email}
		bind:dataValid={e}
		on:input
		on:change
	/>
	<SignInput
		type="tel"
		placeholder="phone number (optional)"
		name="phone"
		bind:value={phone}
		bind:dataValid={ph}
		on:input
		on:change
	/>
	<SignInput
		type="text"
		placeholder="first name"
		name="firstName"
		bind:value={firstName}
		bind:dataValid={f}
		on:input
		on:change
	/>
	<SignInput
		type="text"
		placeholder="last name"
		name="lastName"
		bind:value={lastName}
		bind:dataValid={l}
		on:input
		on:change
	/>
	<Button type="submit" class="signup" disabled={!valid}>Sign Up</Button>
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
