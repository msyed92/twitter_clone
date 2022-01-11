<script>
	import { goto } from '$app/navigation';
	const handleClick = (site) => {
		const href = site;
		goto(href, { noscroll: true, keepfocus: true });
	};
</script>

<main>
	<h1>Twitter</h1>
	<button
		on:click={() => {
			handleClick('/auth/login');
		}}>Sign In</button
	>
	<button
		on:click={() => {
			handleClick('/auth/register');
		}}>Sign Up</button
	>
</main>

<style>
	main {
		background-color: black;
		color: white;
	}
</style>
