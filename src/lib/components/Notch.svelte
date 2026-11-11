<script lang="ts">
	import { inview } from '#lib/actions/reveal.ts';
	/** «Язычок» на верхней кромке секции — фирменная деталь из референса. */
	interface Props {
		fill: string;
		href?: string;
		label?: string;
		dark?: boolean;
	}
	let { fill, href, label = 'прокрутить вниз', dark = true }: Props = $props();
</script>

<div class="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[calc(100%-1px)]" aria-hidden={!href}>
	<svg width="300" height="58" viewBox="0 0 300 58" class="block" aria-hidden="true">
		<path
			d="M0 58C34 58 48 52 64 34C80 15 96 0 126 0H174C204 0 220 15 236 34C252 52 266 58 300 58Z"
			{fill}
		/>
	</svg>
	{#if href}
		<a
			{href}
			use:inview
			class="pointer-events-auto absolute inset-x-0 top-2 flex flex-col items-center gap-1 text-[11px] tracking-wide transition-opacity hover:opacity-100 {dark
				? 'text-bone/60'
				: 'text-ink/70'}"
		>
			<svg width="14" height="16" viewBox="0 0 14 16" fill="none" class="animate-bounce [animation-duration:2s]" aria-hidden="true">
				<path d="M7 1v13M1.5 8.5 7 14l5.5-5.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
			{label}
		</a>
	{/if}
</div>
