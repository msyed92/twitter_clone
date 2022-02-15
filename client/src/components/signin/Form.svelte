<script>
	//components
	import SignInput from './SignInput.svelte';
	import Button from '../general/Button.svelte';

	//imported functions
	import { register } from '$lib/auth/authenticate';
	import { user } from '../../stores/stores';

	//exported variables
	export let u, p, e, ph, f, l;

	//local variables !! fix this!!

	const inputs = [
		'username',
		'password',
		'confirmation',
		'email',
		'phone',
		'firstName',
		'lastName'
	];

	$: inputsArray = inputs.map((e) => {
		return $user.filter((obj) => obj.name == e).length <= 0
			? ''
			: $user.filter((obj) => obj.name == e)[0].value || '';
	});
	$: [username, password, confirmPass, email, phone, firstName, lastName] = inputsArray;
	$: match = '';
	$: valid = false;

	//local functions
	const passwordMatches = () => {
		if (password == null || confirmPass == null || password == '' || confirmPass == '') {
			match = '';
		} else if (password == confirmPass) {
			match = 'matches';
		} else {
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
