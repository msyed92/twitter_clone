<script>
	import Input from './Input.svelte';
	export let type, placeholder, name;
	export let match = '';
	export let dataValid = '';
	export let value;
	export let small = '';
</script>

<div>
	<Input
		{type}
		{placeholder}
		{name}
		{value}
		bind:dataValid
		bind:small
		bind:match
		on:input
		on:change
	/>
	{#if name != 'confirmation'}
		<small class="float">{small} {dataValid}</small>
	{:else}
		<small class="float">{small} {match}</small>
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
		padding-bottom: 5%;
	}

	span.clear {
		clear: left;
		display: block;
	}
</style>
