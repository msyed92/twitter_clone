<script>
	import Post from './Post.svelte';
	import Tweet from '../Tweet.svelte';
	import { tweets } from '../../../stores/stores';
	import Header from './Header.svelte';
	import { get } from '../../../lib/api';
	import { onMount } from 'svelte';

	$: user = '';
	$: tweetList = '';

	const tweetUpdate = async () => {
		const local = await get('/tweets/home/timeline');
		user = local.id;
		console.log(user);
		tweetList = local.tweets;
		tweetList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

		tweets.set(tweetList);
	};
	onMount(tweetUpdate);
</script>

<div class="feed">
	{#await tweetList}
		<p>Loading...</p>
	{:then tweetList}
		{#if user != ''}
			<Header {user} />
			<Tweet {user} on:click={tweetUpdate} />
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
		/* width: 33%; */
		background-color: #202142;
		border-left: 0.05rem solid #c5c6e3;
		border-right: 0.05rem solid #c5c6e3;
		color: white;
	}
</style>
