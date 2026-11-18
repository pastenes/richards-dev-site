<script lang="ts">
	import SocialLinks from '#lib/components/SocialLinks.svelte';
</script>

<footer class="flex flex-col items-center py-24 font-mono text-muted">
	<div class="pb-2 text-xs">Built by Richard Pastenes</div>
	<!-- The same social links as the hero, from Site settings. -->
	<div class="flex gap-2">
		<SocialLinks size={16} linkClass="hover:text-accent" />
	</div>
</footer>
