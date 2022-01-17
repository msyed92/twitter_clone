<script>
	import Form from '../../../components/signin/Form.svelte';
</script>

<div class="box">
	<h1>Twitter 2.0 Sign Up</h1>
	<Form />
	<small>Already have an account? <a href="/auth/login"> Sign In</a></small>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@200;500;700&display=swap');

	:global(body, main) {
		margin: 0;
		font-family: 'Be Vietnam Pro', sans-serif;
	}
	h1 {
		margin: auto;
		padding-bottom: 3%;
	}
	.box {
		background-color: #202142;
		color: white;
		margin: 0;
		height: 83vh;
		font-family: 'Be Vietnam Pro', sans-serif;
		padding: 5%;
	}
	div {
		text-align: center;
	}

	small {
		display: block;
		margin-top: 3%;
		margin-left: auto;
		margin-right: auto;
		width: 25%;
	}

	a,
	a:visited {
		color: rgba(128, 131, 219, 0.83);
	}

	a:active {
		color: white;
	}
</style>
