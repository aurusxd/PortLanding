<script lang="ts">
	import { plans } from '#lib/data.ts';
	import { tgLink } from '#lib/config.ts';
	import { reveal } from '#lib/actions/reveal.ts';
	import Heading from './Heading.svelte';
	import Icon from './Icon.svelte';
</script>

<section id="pricing" class="cv relative bg-ink pb-20 sm:pb-28" aria-labelledby="pricing-title">
	<div class="container-x">
		<div class="grid gap-6 lg:grid-cols-2 lg:items-end">
			<div>
				<p class="eyebrow text-bone/60" use:reveal>Цены</p>
				<Heading id="pricing-title" lines={['Тарифы', 'без сюрпризов']} lower={[1]} class="mt-6" />
			</div>
			<p class="max-w-md text-[15px] leading-relaxed text-bone/60 lg:justify-self-end" use:reveal={100}>
				Цена фиксируется в договоре после брифа и не меняется в процессе. Скидка 10% на пакет от 10 ракурсов.
			</p>
		</div>

		<div class="mt-10 grid gap-3 sm:mt-14 md:grid-cols-3 md:gap-4">
			{#each plans as p, i (p.id)}
				<article
					class="relative flex flex-col rounded-[var(--radius-card)] p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:p-8 {p.featured
						? 'bg-sand text-ink'
						: 'border border-white/10 bg-coal'}"
					use:reveal={i * 100}
				>
					{#if p.featured}
						<span class="absolute right-5 top-5 rounded-full bg-ink px-3 py-1 text-xs text-bone">Выбирают чаще</span>
					{/if}
					<h3 class="font-display text-lg font-semibold uppercase tracking-tight">{p.name}</h3>
					<p class="mt-3 min-h-[3.75rem] text-sm leading-relaxed {p.featured ? 'text-ink/85' : 'text-bone/65'}">{p.note}</p>
					<p class="mt-6 font-display text-[2.1rem] font-bold leading-none tracking-tight">{p.price}</p>
					<p class="mt-1.5 text-sm {p.featured ? 'text-ink/80' : 'text-mute'}">{p.unit}</p>
					<ul class="mb-8 mt-7 flex flex-col gap-3 border-t pt-7 text-sm {p.featured ? 'border-ink/15' : 'border-white/10'}">
						{#each p.features as f (f)}
							<li class="flex gap-3">
								<span class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full {p.featured ? 'bg-ink text-sand' : 'bg-white/10 text-sand'}">
									<Icon name="check" class="size-3" />
								</span>
								{f}
							</li>
						{/each}
					</ul>
					<a
						href={tgLink(`Здравствуйте! Интересует тариф «${p.name}» (${p.price} ${p.unit}).`)}
						target="_blank"
						rel="noopener"
						class="btn mt-auto w-full {p.featured ? 'btn-dark' : 'btn-ghost'}"
					>
						Выбрать тариф
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>
