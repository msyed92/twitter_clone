<script>
	$: username = '';
	$: password = '';
	let loginMethods = ['username', 'email', 'phone number'];
	$: method = loginMethods[0];
	const changeMethod = (input) => {
		method = input;
	};

	$: methodIndex = loginMethods.findIndex((e) => e === method);
	$: result = {};

	const baseURL = 'http://localhost:5000/api';

	async function signIn() {
		let res = await fetch(`${baseURL}/user/login`, {
			method: 'POST',
			body: JSON.stringify({
				username: username,
				password: password
			}),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		const json = await res.json();
		console.log(json);
		result = json;
	}
</script>

<main>
	<h1>Twitter 2.0 Sign In</h1>
	<form action="/" method="GET">
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
		<button type="button" on:click={signIn}>Sign In</button>
	</form>

	<h1>{result}</h1>
</main>

<style>
	main {
		background-color: black;
		color: white;
	}
</style>
