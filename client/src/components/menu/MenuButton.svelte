<script>
	export let style = 'primary';
	export let type = 'button';
	export let disabled = false;
	export let tweet = false;
	export let header = false;
	export let small = false;
	export let inline = false;
	export let signin = false;
	export let outline = false;
	export let register = false;
</script>

<div class:inline>
	<button
		{type}
		{disabled}
		class={style}
		class:tweet
		class:header
		class:small
		class:signin
		class:outline
		class:register
		on:click
	>
		<slot />
	</button>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@200;500;700&display=swap');

	:global(body, main) {
		margin: 0;
		font-family: 'Be Vietnam Pro', sans-serif;
	}
	div {
		width: 100%;
		height: 50px;
		display: block;
	}

	.inline {
		width: 15%;
		text-align: center;
		margin: auto;
		padding-bottom: 1%;
	}

	.signin {
		float: none;
		width: 100%;
	}

	.outline {
		border-style: solid;
		border-width: 0.05rem;
		border-color: white;
	}

	button {
		color: #fff;
		border: 0;
		border-radius: 50px;
		cursor: pointer;
		float: left;
		margin: 0;
		height: 80%;
		position: relative;
		top: 50%;
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
		font-family: 'Be Vietnam Pro', sans-serif;
	}
	.primary {
		background-color: #202142;
	}
	button:hover {
		transform: scale(0.98);
		background: rgba(56, 58, 117, 0.83);
		margin: 0;
		position: relative;
		top: 50%;
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	button:disabled,
	button:hover,
	button:disabled:hover {
		transform: scale(0.98);
		background: rgba(56, 58, 117, 0.83);
		margin: 0;
		position: relative;
		top: 50%;
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.tweet {
		width: 100%;
		background-color: white;
		color: #202142;
	}

	.tweet:hover,
	.register:hover {
		transform: scale(0.98);
		background: rgba(210, 211, 233, 1);
		margin: 0;
		position: relative;
		top: 50%;
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.small {
		width: 50%;
		float: right;
		height: 80%;
	}
	.header,
	.header:hover,
	.header:disabled {
		width: 25%;
		margin-left: 3%;
		outline: solid;
		outline-color: #c5c6e3;
		outline-width: 0.05rem;
		color: white;
	}

	.register {
		width: 50%;
		float: none;
		background-color: white;
		color: #202142;
		margin-top: 10%;
	}

	.register:hover {
		margin-top: 10%;
	}
</style>
