<script>
	import { getTime } from '$lib/utils';
	import { post } from '$lib/api';
	export let tweet;
	let user;
	import Block from './Block.svelte';

	const promise = post('/user/info', { id: tweet.user_id }).then((r) => {
		user = r;
		return user;
	});
</script>

<Block>
	{#await promise then promise}
		<div>
			<span class="user">{user.name}</span>

			<small class="info">
				@{user.username} ⋅
				{getTime(tweet.created_at)}</small
			>
		</div>
		<div class="tweet">{tweet.content}</div>
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
