<script>
	import Post from './Post.svelte';
	import Tweet from '../feed/Tweet.svelte';
	import { tweets } from '../../stores/tweets.js';
	import Header from './Header.svelte';
	import { get, post } from '../../lib/api';
	import { onMount } from 'svelte';
	$: user = '';
	$: tweetList = '';
	onMount(async () => {
		const local = await get('/tweets/home/timeline');
		user = local.id;
		let tweetList = local.tweets;
		tweets.set(tweetList);
	});
</script>

<div class="feed">
	{#await tweetList}
		<p>Loading...</p>
	{:then tweetList}
		{#if user != ''}
			<Header {user} />
		{/if}
		<Tweet />
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
