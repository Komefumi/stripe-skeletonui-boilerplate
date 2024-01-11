<script lang="ts">
	import { base } from '$app/paths';

	export let message: string;
</script>

<div class="container h-screen mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1 class="text-6xl">{message}</h1>
		</div>
		<div class="col-span-3">
			<a class="btn variant-filled-primary" href="{base}/">Return to home</a>
		</div>
	</div>
</div>
