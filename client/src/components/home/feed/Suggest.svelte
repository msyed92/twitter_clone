<script>
	import Post from './post/Post.svelte';
	import { get } from '../../../lib/api';
	import { whoToFollow } from '../../../stores/stores';
	import { onMount } from 'svelte';

	$: user = '';
	$: tweetList = '';

	const tweetUpdate = async () => {
		const local = await get('/tweets/home/whotofollow');
		user = local.id;
		tweetList = local.tweets;
		tweetList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
		whoToFollow.set(tweetList);
	};
	onMount(tweetUpdate);
</script>

<div>
	<h3>Who to Follow:</h3>

	{#each $whoToFollow as tweet (tweet.id)}
		<Post {tweet} viewer={user} />
	{/each}
</div>

<style>
	h3 {
		font-weight: 500;
		width: max-content;
		margin-left: 2%;
	}
	div {
		border-top: 0.05rem solid #c5c6e3;
	}
</style>
