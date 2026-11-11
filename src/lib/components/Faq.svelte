<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import manager from '#lib/assets/img/person-2.jpg?enhanced&w=160;112';
	import { faq } from '#lib/data.ts';
	import { site } from '#lib/config.ts';
	import { reveal } from '#lib/actions/reveal.ts';
	import Heading from './Heading.svelte';
	import Icon from './Icon.svelte';

	let open = $state<number | null>(1);
</script>

<section id="faq" class="cv py-16 sm:py-24" aria-labelledby="faq-title">
	<div class="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
		<div class="flex flex-col">
			<p class="eyebrow text-ink/70" use:reveal>FAQ</p>
			<Heading id="faq-title" lines={['Отвечаем', 'на вопросы']} lower={[1]} class="mt-6" />
			<p class="mt-5 max-w-sm text-[15px] leading-relaxed text-ink/65" use:reveal={100}>
				Не нашли ответ? Напишите менеджеру — ответим в течение 15 минут в рабочее время.
			</p>
			<div class="mt-8 flex flex-wrap items-center gap-4 rounded-[var(--radius-card)] bg-white p-4 lg:mt-auto" use:reveal={150}>
				<enhanced:img src={manager} alt="Анна Лебедева, менеджер проектов" sizes="56px" loading="lazy" class="size-14 rounded-full object-cover" />
				<div class="flex-1">
					<p class="font-semibold">Анна Лебедева</p>
					<p class="text-sm text-ink/70">Менеджер проектов</p>
				</div>
				<a href={site.telegram} target="_blank" rel="noopener" class="btn btn-sand !h-11 !px-5 text-sm" style="--tg-cut: var(--color-sand)">
					<Icon name="telegram" class="size-4" /> Написать
				</a>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			{#each faq as item, i (item.q)}
				<div class="rounded-[var(--radius-card)] bg-white transition-shadow duration-300 {open === i ? 'shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]' : ''}" use:reveal={i * 60}>
					<h3>
						<button
							type="button"
							class="flex w-full items-center justify-between gap-6 p-5 text-left text-[15px] font-medium sm:p-6 sm:text-base"
							aria-expanded={open === i}
							aria-controls="faq-{i}"
							onclick={() => (open = open === i ? null : i)}
						>
							{item.q}
							<span
								class="grid size-8 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] {open === i
									? 'rotate-45 bg-sand text-ink'
									: 'bg-bone text-ink/70'}"
							>
								<Icon name="plus" class="size-4" />
							</span>
						</button>
					</h3>
					{#if open === i}
						<div id="faq-{i}" transition:slide={{ duration: 450, easing: cubicOut }}>
							<p class="px-5 pb-6 text-[15px] leading-relaxed text-ink/65 sm:px-6">{item.a}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
