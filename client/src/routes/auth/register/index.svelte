<script>
	import { register } from '$lib/auth/authenticate';
	$: username = '';
	$: password = '';
	$: email = '';
	$: phone = null;
	$: firstName = '';
	$: lastName = '';
</script>

<main>
	<h1>Twitter 2.0 Sign Up</h1>
	<form
		on:submit={async () => {
			register(username, password, email, phone, firstName, lastName);
		}}
	>
		<input type="text" placeholder="username" name="username" bind:value={username} />
		<input type="password" placeholder="password" name="password" bind:value={password} />
		<input type="password" placeholder="confirm password" name="password-confirm" />
		<input type="email" placeholder="email" name="email" bind:value={email} />
		<input type="text" placeholder="phone number (optional)" name="phone" bind:value={phone} />
		<input type="text" placeholder="first name" name="firstName" bind:value={firstName} />
		<input type="text" placeholder="last name" name="lastName" bind:value={lastName} />
		<button type="submit">Sign Up</button>
	</form>
	<small>Already have an account? <a href="/auth/login"> Sign In</a></small>
</main>

<style>
	main {
		background-color: black;
		color: white;
	}
</style>
