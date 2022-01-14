<script>
	import MenuButton from './MenuButton.svelte';
	import { logout } from '$lib/auth/authenticate';
</script>

<div class="menu">
	<div class="panel">
		<div class="buttons">
			<MenuButton>Logo</MenuButton>
			<MenuButton>Home</MenuButton>
			<MenuButton>Explore</MenuButton>
			<MenuButton>Notifications</MenuButton>
			<MenuButton>Messages</MenuButton>
			<MenuButton>Bookmarks</MenuButton>
			<MenuButton>Lists</MenuButton>
			<MenuButton>Profile</MenuButton>
			<MenuButton>More</MenuButton>
		</div>
		<MenuButton tweet>Tweet</MenuButton>
		<form on:submit={logout}>
			<MenuButton type="submit">Sign Out</MenuButton>
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
