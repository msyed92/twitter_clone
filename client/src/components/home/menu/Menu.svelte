<script>
	import Button from '../../general/Button.svelte';
	import { logout } from '$lib/auth/authenticate';
</script>

<div class="menu">
	<div class="panel">
		<div class="buttons">
			<Button class="menu-button logo"
				><img
					class="twitter-logo"
					alt="svgImg"
					src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE1MC41LDQ0LjUzNzI1Yy00Ljc0MDc1LDIuMDk5ODMgLTkuODM5ODMsMy41MDA5MiAtMTUuMjE4NDIsNC4xNjM4M2M1LjQ2ODE3LC0zLjI0NjUgOS42NzUsLTguNDI0NDIgMTEuNjQ5NDIsLTE0LjU0MTE3Yy01LjExNywyLjk5OTI1IC0xMC43ODU4Myw1LjIwMyAtMTYuODE2NTgsNi4zNjRjLTQuODE2LC01LjEwNjI1IC0xMS42ODUyNSwtOC4yNzM5MiAtMTkuMjk2MjUsLTguMjczOTJjLTE0LjYyLDAgLTI2LjQ3MDA4LDExLjc0NjE3IC0yNi40NzAwOCwyNi4yM2MwLDIuMDQ5NjcgMC4yNDAwOCw0LjA0NTU4IDAuNjkxNTgsNS45ODQxN2MtMjEuOTk0NSwtMS4xMDM2NyAtNDEuNTAyMTcsLTExLjU1OTgzIC01NC41NTI2NywtMjcuNDI2ODNjLTIuMjkzMzMsMy44NzcxNyAtMy41ODMzMyw4LjQxNzI1IC0zLjU4MzMzLDEzLjIwODE3YzAsOS4xMDUyNSA0LjY2MTkyLDE3LjEyMTE3IDExLjc3MTI1LDIxLjg0NGMtNC4zMzk0MiwtMC4xMzI1OCAtOC40MjQ0MiwtMS4zNDAxNyAtMTIuMDAwNTgsLTMuMjc1MTdjMCwwLjA3ODgzIDAsMC4xOTcwOCAwLDAuMzA4MTdjMCwxMi43MjQ0MiA5LjEyNjc1LDIzLjMyMDMzIDIxLjIyNDA4LDI1LjczMTkyYy0yLjIxMDkyLDAuNjA1NTggLTQuNTQ3MjUsMC45NDI0MiAtNi45NTUyNSwwLjk0MjQyYy0xLjcwOTI1LDAgLTMuMzc1NSwtMC4xOTM1IC00Ljk4OCwtMC40ODM3NWMzLjM2ODMzLDEwLjM5ODgzIDEzLjE0MDA4LDE3Ljk5OTA4IDI0LjcxNzgzLDE4LjIyNDgzYy05LjA1ODY3LDcuMDIzMzMgLTIwLjQ2OCwxMS4yMzAxNyAtMzIuODczNSwxMS4yMzAxN2MtMi4xNDI4MywwIC00LjIzOTA4LC0wLjEyMTgzIC02LjMxMDI1LC0wLjM3MjY3YzExLjcyMTA4LDcuNDIxMDggMjUuNjM4NzUsMTEuNzcxMjUgNDAuNTc3NjcsMTEuNzcxMjVjNDguNjc5NTgsMCA3NS4zMTA5MiwtMzkuOTc1NjcgNzUuMzEwOTIsLTc0LjY1NTE3YzAsLTEuMTM1OTIgLTAuMDM1ODMsLTIuMjY4MjUgLTAuMDg5NTgsLTMuMzg2MjVjNS4xOTU4MywtMy42NjkzMyA5LjY3NSwtOC4yOTkgMTMuMjExNzUsLTEzLjU4OCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
				/></Button
			>
			<Button class="menu-button"
				><img
					alt="svgImg"
					src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTg2LDE1LjA0NzJsLTc4LjgzMzMzLDcwLjk1MjhoMjEuNXY2NC41aDUwLjE2NjY3di00M2gxNC4zMzMzM3Y0M2g1MC4xNjY2N3YtNjQuNWgyMS41ek04NiwzNC4zMzU2MWw0MywzOC43MDI4djUuNzk0OTJ2NTcuMzMzMzNoLTIxLjV2LTQzaC00M3Y0M2gtMjEuNXYtNjMuMTI4MjZ6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
				/>Home</Button
			>
			<Button class="menu-button">Explore</Button>
			<Button class="menu-button">Notifications</Button>
			<Button class="menu-button">Messages</Button>
			<Button class="menu-button">Bookmarks</Button>
			<Button class="menu-button">Lists</Button>
			<Button class="menu-button">Profile</Button>
			<Button class="menu-button">More</Button>
		</div>
		<Button class="tweet" tweet>Tweet</Button>
		<!-- <form on:submit={logout}>
			<Button class="menu-button" type="submit">Sign Out</Button>
		</form> -->
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

	* :global(.menu-button),
	:global(.tweet) {
		display: block;
		font-size: 1rem;
		margin: 1rem 0;
		padding: 0.5rem 0.75rem;
	}

	* :global(.tweet) {
		background-color: white;
		width: 80%;
	}

	* :global(.tweet):hover {
		background-color: #c5c6e3;
	}

	* :global(.menu-button) {
		background-color: transparent;
		color: white;
	}

	* :global(.menu-button):hover {
		background-color: #2b2d5a;
	}

	* :global(.logo) {
		padding: 0;
		margin: 0;
		width: 2.5rem;
		height: 2.5rem;
	}

	.twitter-logo {
		margin-top: 0.3rem;
		width: 2rem;
		height: auto;
	}
</style>
