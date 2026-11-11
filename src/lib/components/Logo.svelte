<script lang="ts">
	let { class: cls = '' }: { class?: string } = $props();
</script>

<span class="inline-flex items-center gap-2.5 {cls}">
	<svg viewBox="0 0 32 32" class="size-7 shrink-0" aria-hidden="true">
		<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="1.6" />
		<path d="M16 5a11 11 0 0 1 0 22Z" fill="var(--color-sand)" />
		<circle cx="16" cy="16" r="2.2" fill="currentColor" />
	</svg>
	<span class="flex flex-col font-display leading-none">
		<span class="text-[13px] font-medium tracking-[0.32em]">LUMEN</span>
		<span class="mt-1 text-[8.5px] font-light tracking-[0.62em] opacity-70">RENDER</span>
	</span>
</span>
