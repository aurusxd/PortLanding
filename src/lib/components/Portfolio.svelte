<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { categories, projects, type Category, type Project } from '#lib/data.ts';
	import { reveal } from '#lib/actions/reveal.ts';
	import { tgLink } from '#lib/config.ts';
	import Heading from './Heading.svelte';
	import Icon from './Icon.svelte';
	import ProjectModal from './ProjectModal.svelte';
	import BeforeAfter from './BeforeAfter.svelte';

	let active = $state<Category | 'all'>('all');
	let opened = $state<Project | null>(null);

	const list = $derived(active === 'all' ? projects : projects.filter((p) => p.category === active));
	const count = (id: Category | 'all') => (id === 'all' ? projects.length : projects.filter((p) => p.category === id).length);
	const catLabel = (id: Category) => categories.find((c) => c.id === id)?.label ?? '';
</script>

<section id="portfolio" class="cv relative bg-ink pb-20 pt-24 sm:pb-28 sm:pt-32" aria-labelledby="portfolio-title">
	<div class="container-x">
		<div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
			<div>
				<p class="eyebrow text-bone/60" use:reveal>Портфолио</p>
				<Heading id="portfolio-title" lines={['Реализованные', 'проекты']} class="mt-6" />
			</div>
			<div class="-mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0" use:reveal={100}>
				<div class="flex w-max gap-2" role="tablist" aria-label="Фильтр по типу помещения">
					{#each categories as c (c.id)}
						<button
							type="button"
							role="tab"
							aria-selected={active === c.id}
							onclick={() => (active = c.id)}
							class="flex h-11 items-center gap-2 rounded-xl border px-4 text-sm transition-all duration-300 {active === c.id
								? 'border-sand bg-sand text-ink'
								: 'border-white/15 text-bone/80 hover:border-white/40 hover:text-bone'}"
						>
							{c.label}
							<span class="text-xs {active === c.id ? 'text-ink/70' : 'text-mute'}">{count(c.id)}</span>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<ul class="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
			{#each list as p, i (p.id)}
				<li
					animate:flip={{ duration: 600, easing: cubicOut }}
					in:scale={{ start: 0.94, duration: 500, delay: i * 40, easing: cubicOut }}
					out:fade={{ duration: 150 }}
				>
					<button
						type="button"
						class="card group relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-graphite text-left"
						onclick={() => (opened = p)}
						aria-label="Открыть проект «{p.title}»"
					>
						<enhanced:img
							src={p.image}
							alt="{p.title}: {catLabel(p.category).toLowerCase()}, {p.style.toLowerCase()}"
							sizes="(min-width:1024px) 30vw, (min-width:640px) 48vw, 100vw"
							loading="lazy"
							class="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
						/>
						<span class="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-ink/20 transition-opacity duration-500 group-hover:opacity-90"></span>
						<span
							class="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg bg-ink/45 px-2.5 py-1.5 text-xs text-bone backdrop-blur-md"
						>
							<Icon name="area" class="size-3.5" />
							{p.area} м²
						</span>
						<span class="absolute left-4 top-4 rounded-lg bg-bone/90 px-2.5 py-1.5 text-xs text-ink">{catLabel(p.category)}</span>
						<span class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
							<span>
								<span class="block text-lg font-semibold leading-tight tracking-tight">{p.title}</span>
								<span class="mt-1 block text-sm text-bone/65">{p.place}</span>
							</span>
							<span
								class="grid size-11 shrink-0 place-items-center rounded-full bg-bone text-ink transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:bg-sand"
							>
								<Icon name="arrow-up-right" class="size-[18px]" />
							</span>
						</span>
					</button>
				</li>
			{/each}
		</ul>

		<!-- CTA-плашка, как «ВСЕ ПРОЕКТЫ» в референсе -->
		<div
			class="mt-6 flex flex-col items-start gap-6 rounded-[1.75rem] bg-sand p-6 text-ink sm:mt-8 sm:flex-row sm:items-center sm:p-5 sm:pl-6"
			use:reveal
		>
			<div class="flex -space-x-4">
				{#each projects.slice(3, 6) as p (p.id)}
					<enhanced:img src={p.image} alt="" sizes="72px" loading="lazy" class="size-14 rounded-full border-[3px] border-sand object-cover sm:size-16" />
				{/each}
			</div>
			<div class="flex-1">
				<p class="font-display text-xl font-bold uppercase leading-none tracking-tight sm:text-3xl">Есть свой проект?</p>
				<p class="mt-2 max-w-md text-sm text-ink/85">Пришлите план — оценим стоимость и сроки за 15 минут в рабочее время.</p>
			</div>
			<a
				href={tgLink('Здравствуйте! Хочу прислать план на оценку.')}
				target="_blank"
				rel="noopener"
				class="btn btn-dark w-full sm:w-auto"
				style="--tg-cut: var(--color-ink)"
			>
				<Icon name="telegram" class="size-[18px]" /> Отправить план
			</a>
		</div>

		<BeforeAfter />
	</div>
</section>

{#if opened}
	<ProjectModal project={opened} onclose={() => (opened = null)} onnavigate={(p) => (opened = p)} list={projects} />
{/if}
