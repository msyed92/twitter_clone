<script>
	//components
	import Block from './Block.svelte';
	import Heart from './Heart.svelte';
	import Retweet from './Retweet.svelte';
	import PostMenu from './PostMenu.svelte';
	import { getTime } from '$lib/utils';
	import { post } from '$lib/api';

	//exported variables
	export let tweet, viewer, reload;

	//local variables
	let user, retweet;
	$: interactions = [];
	$: numLikes = 0;
	$: numRTs = 0;
	$: currentUser = {};

	//local functions
	const intersUpdate = async () => {
		const inters = await post('/f/interactions', { tweet_id: tweet.id });
		interactions = inters;
		numLikes = interactions.likes.length;
		numRTs = interactions.retweets.length;
		//numComments = inters.comments.length;
		currentUser.likes = interactions.likes.some((like) => like.user_id == viewer);
		currentUser.retweets = interactions.retweets.some((rt) => rt.user_id == viewer);
	};

	const inter = async (type) => {
		await post(`/f/${type}`, { tweet_id: tweet.id })
			.then((r) => {
				return r;
			})
			.then(async () => {
				await intersUpdate();
			});
	};

	const promise = post('/user/info', { id: tweet.user_id })
		.then(async (r) => {
			await intersUpdate();
			return r;
		})
		.then(async(r)=>{
			if (tweet.retweet){
			const test = await post('/user/info',{ id: tweet.retweet.user_id})
				.then(async (r)=>{
					await intersUpdate();
					return r;
				}).then(async(r) => {
					retweet = r;
				})
			}
			return r;
		})
		.then(async(r) => {
			user = r;
			return r;
		});
</script>

<Block>
	{#await promise}
		<p>Loading...</p>
	{:then user}
		<div class="user-info">
			<span class="user">{user.name}</span>

			<small class="info">
				@{user.username} ⋅
				{getTime(tweet.created_at)}</small
			>
			{#if tweet.retweet}
				<small class="retweet">{retweet.username} retweeted</small>
			{/if}
			<PostMenu {user} {viewer} {tweet} on:click {reload} />
		</div>
		<div class="tweet">{tweet.content}</div>
		<div class="data">
			<Heart
				filled={currentUser.likes}
				num={numLikes}
				on:click
				click={() => {
					inter('like');
				}}
			/>
			<Retweet
				filled={currentUser.retweets}
				num={numRTs}
				on:click
				click={() => {
					inter('retweet');
				}}
			/>
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

	.data {
		position: relative;
	}

	.user-info {
		position: relative;
	}

	.retweet{
		font-weight: lighter;
		opacity: 0.7;
		color: #c5c6e3;
		padding-left: 1%;
		font-size: .8rem;
	}
</style>
