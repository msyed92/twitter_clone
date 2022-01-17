<script>
	import Input from './Input.svelte';
	export let type, placeholder, name, dataValid;
	export let value = '';
</script>

<div>
	<Input {type} {placeholder} {name} {value} bind:dataValid on:input />
	{#if type != 'tel'}
		<small class="float">{placeholder} {dataValid}</small>
	{:else}
		<small class="float">phone number {dataValid}</small>
	{/if}
	<span class="clear" />
</div>

<style>
	small {
		float: left;
		max-height: inherit;
		padding-left: 1%;
		font-weight: lighter;
	}

	div {
		margin: auto;
		height: auto;
		width: 90%;
		padding-bottom: 3%;
	}

	span.clear {
		clear: left;
		display: block;
	}
</style>
