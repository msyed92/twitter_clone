<script>
	import { login } from '$lib/auth/authenticate';

	$: username = '';
	$: password = '';

	let loginMethods = ['username', 'email', 'phone number'];
	$: method = loginMethods[0];
	const changeMethod = (input) => {
		method = input;
	};

	$: methodIndex = loginMethods.findIndex((e) => e === method);
	//$: result = {};
</script>

<main>
	<h1>Twitter 2.0 Sign In</h1>
	<form
		on:submit|preventDefault={async () => {
			await login(username, password);
		}}
	>
		<input type="text" placeholder={method} name={method} bind:value={username} />

		{#each loginMethods as method, i}
			{#if i != methodIndex}
				<small
					on:click={() => {
						changeMethod(method);
					}}>Use {method} instead</small
				>
			{/if}
		{/each}

		<br />
		<input type="text" placeholder="password" name="password" bind:value={password} />
		<br />
		<button type="submit">Sign In</button>
	</form>
	<small>Don't have an account? <a href="/auth/register"> Sign Up.</a></small>
</main>

<style>
	main {
		background-color: black;
		color: white;
	}
</style>
