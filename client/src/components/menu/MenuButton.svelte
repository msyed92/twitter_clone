<script>
	export let style = 'primary';
	export let type = 'button';
	export let disabled = false;
	export let tweet = false;
	export let header = false;
	export let small = false;
</script>

<div>
	<button {type} {disabled} class={style} class:tweet class:header class:small>
		<slot />
	</button>
</div>

<style>
	div {
		width: 100%;
		height: 50px;
		display: block;
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
	button:disabled {
		background-color: #cccccc;
		color: #333;
		cursor: auto;
		margin: 0;
		position: relative;
		top: 50%;
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	button:disabled:hover {
		transform: scale(1);
		opacity: 1;
	}

	.tweet {
		width: 100%;
		background-color: white;
		color: #202142;
	}

	.tweet:hover {
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
</style>
