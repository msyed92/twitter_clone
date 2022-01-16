<script>
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	const direct = (site) => {
		const href = site;
		goto(href, { noscroll: true, keepfocus: true });
	};
	import MenuButton from './menu/MenuButton.svelte';
</script>

<div>
	<h1>Join Twitter 2.0</h1>

	<MenuButton
		inline
		signin
		tweet
		on:click={() => {
			direct('/auth/register');
		}}>Sign Up with email</MenuButton
	>
	<h3>Already have an account?</h3>
	<MenuButton
		inline
		signin
		outline
		on:click={() => {
			direct('/auth/login');
		}}>Sign In</MenuButton
	>
</div>

<style>
	h1 {
		margin: 0;
		padding: 10% 0 2% 0;
	}
	div {
		text-align: center;
		margin: 0;
		padding: 0;
		background-color: #202142;
		color: white;
		height: 100vh;
	}
</style>
