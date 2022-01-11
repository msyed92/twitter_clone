<script>
	import Post from './Post.svelte';
	import { tweets } from '../../store.js';
	import Header from './Header.svelte';
	export let tweetList;
	tweets.set(tweetList);
</script>

<main>
	<Header />
	{#await tweetList}
		<p>Loading...</p>
	{:then tweetList}
		{#if tweetList !== undefined}
			<Post />
		{/if}
	{:catch error}
		{error.message}
	{/await}
</main>
