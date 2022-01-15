import adapter from '@sveltejs/adapter-auto';
import resolve from '@rollup/plugin-node-resolve';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},
	plugins: [
		resolve({
			dedupe: ['svelte', 'svelte/transition', 'svelte/internal'], // important!
		}),
	],
};

export default config;
