<script>
	//exported variables
	export let filled = false;
	export let num, click;

	//local variables
	let hover = false;
	$: dString =
		(filled && !hover) || (!filled && hover)
			? 'M124.87469,137.6h-80.15469c-13.41062,0 -24.08,-10.66937 -24.08,-24.08v-48.16h-17.2l27.52,-30.96l27.52,30.96h-17.2v48.16c0,2.06938 1.37063,3.44 3.44,3.44h61.92zM168.56,106.64l-27.52,30.96l-27.52,-30.96h17.2v-48.16c0,-2.06937 -1.37062,-3.44 -3.44,-3.44h-61.92l-18.23469,-20.64h80.15469c13.41063,0 24.08,10.66938 24.08,24.08v48.16z'
			: 'M127.28,41.28h-64.88969l6.07375,6.88h58.81594c5.88563,0 10.32,4.43438 10.32,10.32v55.04h-8.76125l12.20125,13.71969l12.20125,-13.71969h-8.76125v-55.04c0,-9.64812 -7.55187,-17.2 -17.2,-17.2M30.96,44.76031l-12.20125,13.71969h8.76125v55.04c0,9.64813 7.55188,17.2 17.2,17.2h64.88969l-6.07375,-6.88h-58.81594c-5.88562,0 -10.32,-4.43437 -10.32,-10.32v-55.04h8.76125l-12.20125,-13.71969M151.36,58.48v48.16h17.2l-27.52,30.96l-27.52,-30.96h17.2v-48.16c0,-2.06937 -1.37062,-3.44 -3.44,-3.44h-61.92l-18.23469,-20.64h80.15469c13.41063,0 24.08,10.66938 24.08,24.08zM58.48,65.36h-17.2v48.16c0,2.06938 1.37063,3.44 3.44,3.44h61.92l18.23469,20.64h-80.15469c-13.41062,0 -24.08,-10.66937 -24.08,-24.08v-48.16h-17.2l27.52,-30.96z';
	$: dString2 =
		(filled && !hover) || (!filled && hover)
			? 'M124.87469,137.6h-80.15469c-13.41062,0 -24.08,-10.66937 -24.08,-24.08v-48.16h-17.2l27.52,-30.96l27.52,30.96h-17.2v48.16c0,2.06938 1.37063,3.44 3.44,3.44h61.92zM151.36,106.64v-48.16c0,-13.41062 -10.66937,-24.08 -24.08,-24.08h-80.15469l18.23469,20.64h61.92c2.06938,0 3.44,1.37063 3.44,3.44v48.16h-17.2l27.52,30.96l27.52,-30.96z'
			: 'M127.28,41.28c9.64813,0 17.2,7.55188 17.2,17.2v55.04h8.76125l-12.20125,13.71969l-12.20125,-13.71969h8.76125v-55.04c0,-5.88562 -4.43437,-10.32 -10.32,-10.32h-58.81594l-6.07375,-6.88h64.88969M30.96,44.76031l12.20125,13.71969h-8.76125v55.04c0,5.88563 4.43438,10.32 10.32,10.32h58.81594l6.07375,6.88h-64.88969c-9.64812,0 -17.2,-7.55187 -17.2,-17.2v-55.04h-8.76125l12.20125,-13.71969M127.28,34.4h-80.15469l18.23469,20.64h61.92c2.06938,0 3.44,1.37063 3.44,3.44v48.16h-17.2l27.52,30.96l27.52,-30.96h-17.2v-48.16c0,-13.41062 -10.66937,-24.08 -24.08,-24.08zM30.96,34.4l-27.52,30.96h17.2v48.16c0,13.41063 10.66938,24.08 24.08,24.08h80.15469l-18.23469,-20.64h-61.92c-2.06937,0 -3.44,-1.37062 -3.44,-3.44v-48.16h17.2z';

	$: color = (filled && !hover) || (!filled && hover) ? '#c5c6e3' : 'rgba(197, 198, 227, 0.43)';
</script>

<svg
	on:mouseover={() => {
		hover = !hover;
	}}
	on:mouseout={() => {
		hover = !hover;
	}}
	on:click={click}
	on:focus
	on:blur
	{click}
	{filled}
	xmlns="http://www.w3.org/2000/svg"
	x="0px"
	y="0px"
	width="16"
	height="16"
	viewBox="0 0 172 172"
	style=" fill:#000000;"
	><g transform="translate(0.516,0.516) scale(0.994,0.994)"
		><g
			fill="none"
			fill-rule="nonzero"
			stroke="none"
			stroke-width="1"
			stroke-linecap="butt"
			stroke-linejoin="none"
			stroke-miterlimit="10"
			stroke-dasharray=""
			stroke-dashoffset="0"
			font-family="none"
			font-weight="none"
			font-size="none"
			text-anchor="none"
			style="mix-blend-mode: normal"
			><g fill={color} stroke="#cccccc" stroke-linejoin="round"><path d={dString} /></g><path
				d="M0,172v-172h172v172z"
				fill="none"
				stroke="none"
				stroke-linejoin="miter"
			/><g fill={color} stroke="none" stroke-linejoin="miter"><path d={dString2} /></g><path
				d=""
				fill="none"
				stroke="none"
				stroke-linejoin="miter"
			/></g
		></g
	></svg
>
{#if num == 0}
	<span />
{:else}
	<span class="small">{num}</span>
{/if}

<style>
	svg {
		margin-left: 3%;
		bottom: 2.5px;
		position: absolute;
	}
	svg:hover {
		cursor: pointer;
	}
	.small {
		bottom: 2px;
		left: 8.25%;
		position: absolute;
		font-size: 0.75rem;
		font-weight: lighter;
		color: #c5c6e3;
	}
	svg:focus {
		border: none;
		outline: none;
	}
</style>
