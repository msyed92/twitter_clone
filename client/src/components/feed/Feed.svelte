<script>
	import Post from './Post.svelte';
	import Tweet from './tweet/Tweet.svelte';
	import { tweets } from '../../stores/stores.js';
	import Header from './Header.svelte';
	import { get } from '../../lib/api';
	import { onMount } from 'svelte';

	$: user = '';
	$: tweetList = '';
	onMount(async () => {
		const local = await get('/tweets/home/timeline');
		user = local.id;
		let tweetList = local.tweets;
		console.log(tweetList);
		tweetList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

		tweets.set(tweetList);
	});
</script>

<div class="feed">
	{#await tweetList}
		<p>Loading...</p>
	{:then tweetList}
		{#if user != ''}
			<Header {user} />
			<Tweet {user} />
		{/if}
		{#if tweetList !== undefined}
			{#each $tweets as tweet (tweet.id)}
				<Post {tweet} />
			{/each}
		{/if}
	{:catch error}
		{error.message}
	{/await}
</div>

<style>
	.feed {
		background-color: #202142;
		border-left: 0.05rem solid #c5c6e3;
		border-right: 0.05rem solid #c5c6e3;
		color: white;
	}
</style>
