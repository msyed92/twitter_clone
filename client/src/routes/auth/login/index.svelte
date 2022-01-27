<script>
	import { login } from '$lib/auth/authenticate';
	import SignInput from '../../../components/signin/SignInput.svelte';
	import Button from '../../../components/general/Button.svelte';
	import { user } from '../../../stores/stores';
	import Modal from '../../../components/general/modal/Modal.svelte';
	export let usernameValid, passwordValid;
	let isOpenModal = false;
	function openModal() {
		isOpenModal = true;
	}

	function closeModal() {
		isOpenModal = false;
	}

	let loginMethods = ['username', 'email', 'phone'];
	$: method = loginMethods[0];
	const displayMethod = (method) => {
		return method == 'phone' ? 'phone number' : method;
	};
	$: message = '';
	$: valid = false;
	const validate = () => {
		valid = usernameValid == 'valid' && passwordValid == 'valid';
	};

	$: username =
		$user.filter((obj) => obj.name == method).length <= 0
			? ''
			: $user.filter((obj) => obj.name == method)[0].value || '';
	$: password =
		$user.filter((obj) => obj.name == 'password').length <= 0
			? ''
			: $user.filter((obj) => obj.name == 'password')[0].value || '';

	const changeMethod = (input) => {
		method = input;
	};

	$: methodIndex = loginMethods.findIndex((e) => e === method);

	const signIn = async () => {
		await login(username, password, method)
			.then((r) => {
				message = r.msg;
				openModal();
				return r;
			})
			.catch((e) => {
				throw e;
			});
	};
</script>

<div class="login">
	<h1>Twitter 2.0 Sign In</h1>
	<form on:submit|preventDefault={signIn} on:keypress={validate}>
		<SignInput
			type="text"
			placeholder={displayMethod(method)}
			name={method}
			bind:value={username}
			bind:dataValid={usernameValid}
			input_type="login"
			on:change
		/>

		{#each loginMethods as method, i}
			{#if i != methodIndex}
				<small
					class="method"
					on:click={() => {
						changeMethod(method);
					}}
					>Use {displayMethod(method)} instead
				</small>
			{/if}
		{/each}

		<SignInput
			type="password"
			placeholder="password"
			name="password"
			bind:value={password}
			bind:dataValid={passwordValid}
			input_type="login"
			on:change
		/>
		<Button type="submit" class="signin" disabled={!valid}>Sign In</Button>
		<small>Don't have an account? <a href="/auth/register"> Sign Up.</a></small>
	</form>
	<Modal {isOpenModal} {message} modalId="signin" on:closeModal={closeModal} />
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@200;500;700&display=swap');

	:global(body, main) {
		margin: 0;
		font-family: 'Be Vietnam Pro', sans-serif;
	}
	.login {
		text-align: center;
		background-color: #202142;
		color: white;
		margin: 0;
		height: 83vh;
		font-family: 'Be Vietnam Pro', sans-serif;
		padding: 5%;
	}

	* :global(.signin) {
		margin: 3% 0;
		height: 2rem;
		width: 45%;
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
	small {
		display: block;
	}
	small:hover {
		color: white;
	}

	.method {
		text-align: left;
		font-weight: lighter;
		margin-bottom: 1%;
		margin-left: 5%;
		color: rgba(128, 131, 219, 0.83);
	}

	a,
	a:visited {
		color: rgba(128, 131, 219, 0.83);
	}

	a:active {
		color: white;
	}
</style>
