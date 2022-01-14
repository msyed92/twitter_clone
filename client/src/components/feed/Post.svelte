<script>
	export let tweet;
	import Block from './Block.svelte';
</script>

<Block
	>User: {tweet.user_id}
	Tweet: {tweet.content}
	Time: {tweet.created_at}
</Block>
