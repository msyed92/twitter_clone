<script>
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	const direct = (site) => {
		const href = site;
		goto(href, { noscroll: true, keepfocus: true });
	};
	const click = () => {
		direct('/auth/login');
	};

	import Button from './general/Button.svelte';
</script>

<div>
	<h1>Join Twitter 2.0</h1>

	<Button
		class="signup"
		on:click={() => {
			direct('/auth/register');
		}}>Sign Up with email</Button
	>
	<h4>Already have an account?</h4>
	<Button class="signin" on:click {click}>Sign In</Button>
</div>

<style>
	* :global(.signup),
	* :global(.signin) {
		height: 2rem;
		width: 15%;
		font-size: medium;
	}

	* :global(.signin),
	* :global(.signup):hover {
		background-color: #202142;
		color: #c5c6e3;
		border-color: #c5c6e3;
		border-width: 0.05rem;
		border-style: solid;
	}

	* :global(.signup),
	* :global(.signin):hover {
		background-color: #c5c6e3;
		color: #202142;
	}

	h1 {
		margin: 0;
		padding: 10% 0 1% 0;
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
