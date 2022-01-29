<script>
	import { getTime } from '$lib/utils';
	import { post } from '$lib/api';

	export let tweet, viewer, reload;
	let user;
	import Block from './Block.svelte';
	import Heart from './Heart.svelte';
	$: numLikes = 0;
	$: numRTs = 0;
	$: currentUser = false;

	const promise = post('/user/info', { id: tweet.user_id }).then(async (r) => {
		user = r;
		const inters = await post('/f/interactions', { tweet_id: tweet.id });
		numLikes = inters.likes.length;
		numRTs = inters.retweets.length;
		//numComments = inters.comments.length;
		currentUser = inters.likes ? inters.likes.some((like) => like.user_id == viewer) : false;

		return user;
	});

	const like = async () => {
		await post('/f/like', { tweet_id: tweet.id }).then((r) => {
			return r;
		});
		reload();
	};
</script>

<Block>
	{#await promise then user}
		<div>
			<span class="user">{user.name}</span>

			<small class="info">
				@{user.username} ⋅
				{getTime(tweet.created_at)}</small
			>
		</div>
		<div class="tweet">{tweet.content}</div>
		<div class="data">
			<Heart filled={currentUser} num={numLikes} click={like} />
		</div>
	{/await}
</Block>

<style>
	.info {
		font-weight: lighter;
		color: #c5c6e3;
	}

	.user {
		font-weight: bolder;
		padding-right: 0.5%;
	}
	.tweet {
		padding-top: 1%;
		font-weight: 50;
		padding-left: 0;
		margin: 0;
	}
</style>
