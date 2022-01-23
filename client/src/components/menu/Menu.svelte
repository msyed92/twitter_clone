<script>
	import Button from '../general/Button.svelte';
	import { logout } from '$lib/auth/authenticate';
</script>

<div class="menu">
	<div class="panel">
		<div class="buttons">
			<Button>Logo</Button>
			<Button>Home</Button>
			<Button>Explore</Button>
			<Button>Notifications</Button>
			<Button>Messages</Button>
			<Button>Bookmarks</Button>
			<Button>Lists</Button>
			<Button>Profile</Button>
			<Button>More</Button>
		</div>
		<Button tweet>Tweet</Button>
		<form on:submit={logout}>
			<Button type="submit">Sign Out</Button>
		</form>
	</div>
</div>

<style>
	.menu {
		width: 100%;
		height: 100vh;
		background-color: #202142;
		margin-right: 0;
		padding: 0;
	}

	.panel {
		width: 50%;
		float: right;
		padding: 8%;
	}
</style>
