<script lang="ts">
	import { testimonials, clients } from '#lib/data.ts';
	import { reveal, inview } from '#lib/actions/reveal.ts';
	import Heading from './Heading.svelte';
	import Icon from './Icon.svelte';

	let track: HTMLElement;
	const by = (d: number) => track.scrollBy({ left: d * (track.clientWidth * 0.8), behavior: 'smooth' });

	// Разное начертание, чтобы вымышленные логотипы выглядели как разные бренды
	const styles = [
		'font-display font-bold tracking-[0.18em]',
		'font-sans font-light italic tracking-tight text-[1.35em]',
		'font-display font-medium lowercase tracking-tight',
		'font-sans font-semibold tracking-[0.3em] text-[0.85em]',
		'font-display font-extrabold tracking-tight',
		'font-sans font-medium tracking-[0.05em] text-[1.2em]',
		'font-display font-light tracking-[0.25em]',
		'font-sans font-bold uppercase tracking-tight'
	];
</script>

<section id="reviews" class="cv py-16 sm:py-24" aria-labelledby="reviews-title">
	<div class="container-x">
		<div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<p class="eyebrow text-ink/70" use:reveal>Отзывы</p>
				<Heading id="reviews-title" lines={['Нам доверяют', 'проекты']} lower={[1]} class="mt-6" />
			</div>
			<div class="flex gap-2" use:reveal={100}>
				<button type="button" onclick={() => by(-1)} class="grid size-12 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-bone" aria-label="Предыдущие отзывы">
					<Icon name="chevron-left" />
				</button>
				<button type="button" onclick={() => by(1)} class="grid size-12 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-bone" aria-label="Следующие отзывы">
					<Icon name="chevron-right" />
				</button>
			</div>
		</div>
	</div>

	<div
		bind:this={track}
		class="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 sm:mt-14 sm:gap-4 sm:scroll-px-6 sm:px-6 lg:scroll-px-10 lg:px-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))]"
		data-lenis-prevent-wheel
	>
		{#each testimonials as t, i (t.name)}
			<figure
				class="flex w-[85vw] shrink-0 snap-start flex-col rounded-[var(--radius-card)] bg-white p-6 sm:w-[26rem] sm:p-8"
				use:reveal={i * 90}
			>
				<svg viewBox="0 0 32 24" class="h-6 w-8 text-sand" fill="currentColor" aria-hidden="true">
					<path d="M0 24V14C0 6 4 1 12 0l1 4c-4 1-6 4-6 8h6v12Zm19 0V14c0-8 4-13 12-14l1 4c-4 1-6 4-6 8h6v12Z" />
				</svg>
				<blockquote class="mt-5 flex-1 text-[15px] leading-relaxed text-ink/80">{t.text}</blockquote>
				<figcaption class="mt-8 flex items-center gap-3 border-t border-ink/10 pt-6">
					<enhanced:img src={t.avatar} alt="" sizes="48px" loading="lazy" class="size-12 rounded-full object-cover" />
					<span>
						<span class="block font-semibold">{t.name}</span>
						<span class="block text-sm text-ink/70">{t.role}</span>
					</span>
				</figcaption>
			</figure>
		{/each}
		<span class="w-px shrink-0" aria-hidden="true"></span>
	</div>

	<div class="container-x mt-16 sm:mt-20">
		<p class="text-center text-sm text-ink/70" use:reveal>С нами работают бюро, девелоперы и мебельные фабрики</p>
	</div>
	<div class="marquee relative mt-8 overflow-hidden" aria-label="Клиенты студии" use:inview>
		<ul class="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
			{#each [0, 1] as copy (copy)}
				{#each clients as c, i (c + copy)}
					<li class="px-8 text-xl text-ink/70 transition-colors hover:text-ink sm:px-12 sm:text-2xl {styles[i % styles.length]}" aria-hidden={copy === 1}>
						{c}
					</li>
				{/each}
			{/each}
		</ul>
	</div>
</section>

<style>
	.marquee {
		mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
	}
</style>
