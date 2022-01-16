<script>
	import { register } from '$lib/auth/authenticate';
	import Input from '../../../components/signin/Input.svelte';
	import MenuButton from '../../../components/menu/MenuButton.svelte';

	$: username = '';
	$: password = '';
	$: email = '';
	$: phone = null;
	$: firstName = '';
	$: lastName = '';
</script>

<div class="box">
	<div class="signin">
		<h1>Twitter 2.0 Sign Up</h1>
		<form
			on:submit|preventDefault={async () => {
				await register(username, password, email, phone, firstName, lastName);
			}}
		>
			<Input type="text" placeholder="username" name="username" bind:value={username} />
			<Input type="password" placeholder="password" name="password" bind:value={password} />
			<Input
				type="password"
				placeholder="confirm password"
				name="password-confirm"
				bind:value={password}
			/>
			<Input type="email" placeholder="email" name="email" bind:value={email} />
			<Input type="text" placeholder="phone number (optional)" name="phone" bind:value={phone} />
			<Input type="text" placeholder="first name" name="firstName" bind:value={firstName} />
			<Input type="text" placeholder="last name" name="lastName" bind:value={lastName} />
			<MenuButton type="submit" register disabled="true">Sign Up</MenuButton>
		</form>
		<small>Already have an account? <a href="/auth/login"> Sign In</a></small>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@200;500;700&display=swap');

	:global(body, main) {
		margin: 0;
		font-family: 'Be Vietnam Pro', sans-serif;
	}
	h1 {
		margin: 0;
		padding-bottom: 5%;
	}
	.box {
		background-color: #202142;
		color: white;
		margin: 0;
		height: 83vh;
		font-family: 'Be Vietnam Pro', sans-serif;
		padding: 5%;
	}
	.signin {
		width: 30%;
		text-align: center;
		margin: auto;
		height: 50%;
	}

	form {
		height: 100%;
		padding-bottom: 15%;
	}
</style>
