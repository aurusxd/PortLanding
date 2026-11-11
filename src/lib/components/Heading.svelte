<script lang="ts">
	import { reveal } from '#lib/actions/reveal.ts';

	interface Props {
		/** Каждая строка раскрывается отдельно. Слова в `lower` выводятся строчными (как в референсе). */
		lines: string[];
		lower?: number[];
		tag?: 'h1' | 'h2' | 'h3';
		class?: string;
		id?: string;
	}
	let { lines, lower = [], tag = 'h2', class: cls = '', id }: Props = $props();
</script>

<svelte:element this={tag} {id} class="h-display {cls}" data-split use:reveal aria-label={lines.join(' ')}>
	{#each lines as line, i (i)}
		<span class="line" aria-hidden="true" style="--i:{i}">
			<span class:lc={lower.includes(i)}>{line}</span>
		</span>
	{/each}
</svelte:element>
