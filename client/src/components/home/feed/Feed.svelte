<script>
	// components
	import Post from './post/Post.svelte';
	import Tweet from '../Tweet.svelte';
	import Header from './Header.svelte';
	import Suggest from './Suggest.svelte';

	//stores
	import { tweets, interactions } from '../../../stores/stores';

	//functions
	import { get } from '../../../lib/api';
	import { onMount } from 'svelte';

	$: user = '';
	$: tweetList = '';

	async function tweetsUpdate() {
		const local = await get('/tweets/home/timeline');
		user = local.id;
		tweetList = local.tweets;
		tweetList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
		tweets.set(tweetList);
		return tweetList;
	}
	onMount(tweetsUpdate);
</script>

<div class="feed">
	{#await tweetList}
		<p>Loading...</p>
	{:then tweetList}
		{#if user != ''}
			<Header {user} />
			<Tweet {user} reload={tweetsUpdate} />
		{/if}

		{#each $tweets as tweet (tweet.id)}
			<Post {tweet} viewer={user} />
		{/each}
		{#if tweetList == undefined || tweetList.length < 100}
			<Suggest />
		{/if}
	{:catch error}
		{error.message}
	{/await}
</div>

<style>
	.feed {
		/* width: 33%; */
		background-color: #202142;
		border-left: 0.05rem solid #c5c6e3;
		border-right: 0.05rem solid #c5c6e3;
		color: white;
	}
</style>
