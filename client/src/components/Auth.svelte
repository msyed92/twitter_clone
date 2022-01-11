<script>
	import { goto } from '$app/navigation';
	const direct = (site) => {
		const href = site;
		goto(href, { noscroll: true, keepfocus: true });
	};
</script>

<main>
	<h1>Twitter</h1>
	<button
		on:click={() => {
			direct('/auth/login');
		}}>Sign In</button
	>
	<button
		on:click={() => {
			direct('/auth/register');
		}}>Sign Up</button
	>
</main>

<style>
	main {
		background-color: black;
		color: white;
	}
</style>
