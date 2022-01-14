<script>
	import Post from './Post.svelte';
	import { tweets } from '../../stores/tweets.js';
	import Header from './Header.svelte';
	import { get, post } from '../../lib/api';
	import { onMount } from 'svelte';
	$: user = '';
	$: tweetList = [];

	onMount(async () => {
		const local = await get('/tweets/home/timeline');
		user = local.id;
		tweetList = local.tweets;
		console.log(tweetList);
		tweets.set(tweetList);
	});
</script>

<div>
	<Header {user} />
	{#await tweetList}
		<p>Loading...</p>
	{:then tweetList}
		{#if tweetList !== undefined}
			{#each $tweets as tweet (tweet.id)}
				<Post {tweet} />
			{/each}
		{/if}
	{:catch error}
		{error.message}
	{/await}
</div>
