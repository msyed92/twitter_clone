<script>
	let loginMethods = ['username', 'email', 'phone number'];
	$: method = loginMethods[0];
	const changeMethod = (input) => {
		method = input;
	};

	$: methodIndex = loginMethods.findIndex((e) => e === method);
</script>

<main>
	<h1>Twitter 2.0 Sign In</h1>
	<form action="/" method="GET">
		<input type="text" placeholder={method} name={method} />

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
		<input type="password" placeholder="password" name="password" />
		<br />
		<button type="submit">Sign In</button>
	</form>
</main>

<style>
	main {
		background-color: black;
		color: white;
	}
</style>
