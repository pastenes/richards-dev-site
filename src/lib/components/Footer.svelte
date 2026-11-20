<script lang="ts">
	import SocialLinks from '#lib/components/SocialLinks.svelte';
</script>

<footer class="flex flex-col items-center py-24 font-mono text-muted">
	<div class="pb-2 text-xs">Built by Richard Pastenes</div>
	<!-- The same social links as the hero, from Site settings. -->
	<!-- p-1 makes each icon a 24px target; the icons stay 8px apart. -->
	<div class="flex">
		<SocialLinks size={16} linkClass="p-1 hover:text-accent" />
	</div>
</footer>
