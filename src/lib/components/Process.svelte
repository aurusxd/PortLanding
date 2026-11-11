<script lang="ts">
	import plan from '#lib/assets/img/plan.jpg?enhanced&w=1800;1280;860;560';
	import materials from '#lib/assets/img/materials.jpg?enhanced&w=1800;1280;860;560';
	import draft from '#lib/assets/img/living-1-draft.jpg?enhanced&w=1800;1280;860;560';
	import final from '#lib/assets/img/living-1.jpg?enhanced&w=1800;1280;860;560';
	import { process } from '#lib/data.ts';
	import { reveal, inview } from '#lib/actions/reveal.ts';
	import Heading from './Heading.svelte';
	import Icon from './Icon.svelte';

	const icons = ['brief', 'refs', 'draft', 'edit', 'final'] as const;
	const visuals = [
		{ img: plan, alt: '3D-план квартиры — исходные данные для брифа' },
		{ img: materials, alt: 'Образцы материалов: травертин, дуб, орех, латунь, терраццо' },
		{ img: draft, alt: 'Черновой ракурс: линейная модель гостиной' },
		{ img: final, alt: 'Ракурс гостиной на этапе правок' },
		{ img: final, alt: 'Финальный рендер гостиной в известняке' }
	];
	const pins = [
		{ x: 62, y: 70, t: 'Диван на тон светлее' },
		{ x: 18, y: 42, t: 'Торшер оставить' },
		{ x: 78, y: 30, t: 'Добавить вазу в нишу' }
	];

	let active = $state(0);
	let steps: HTMLElement[] = [];

	$effect(() => {
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) active = Number((e.target as HTMLElement).dataset.i);
			},
			{ rootMargin: '-45% 0px -45% 0px' }
		);
		steps.forEach((s) => io.observe(s));
		return () => io.disconnect();
	});
</script>

<section id="process" class="cv relative bg-ink py-20 sm:py-28" aria-labelledby="process-title">
	<div class="container-x">
		<p class="eyebrow text-bone/60" use:reveal>Процесс</p>
		<Heading id="process-title" lines={['Прозрачность', 'на каждом этапе']} lower={[1]} class="mt-6" />

		<div class="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
			<ol class="relative">
				{#each process as step, i (step.n)}
					<li
						bind:this={steps[i]}
						data-i={i}
						class="relative flex gap-5 pb-10 last:pb-0 lg:min-h-[38vh] lg:pb-0"
					>
						{#if i < process.length - 1}
							<span class="absolute left-6 top-14 bottom-2 w-px bg-white/10 lg:bottom-0" aria-hidden="true">
								<span
									class="block w-px origin-top bg-sand transition-transform duration-700 ease-[var(--ease-out-expo)]"
									style="height:100%;transform:scaleY({active > i ? 1 : 0})"
								></span>
							</span>
						{/if}
						<span
							class="relative grid size-12 shrink-0 place-items-center rounded-xl border transition-all duration-500 {active >= i
								? 'border-sand bg-sand text-ink'
								: 'border-white/10 bg-graphite text-bone/70'}"
						>
							<Icon name={icons[i]} class="size-5" />
						</span>
						<div class="pt-1 transition-opacity duration-500 {active === i ? 'lg:opacity-100' : 'lg:opacity-80'}">
							<div class="flex items-baseline gap-3">
								<span class="font-display text-xs text-sand-light">{step.n}</span>
								<h3 class="text-xl font-semibold tracking-tight sm:text-2xl">{step.title}</h3>
								<span class="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-bone/80">{step.time}</span>
							</div>
							<p class="mt-2 max-w-md text-[15px] leading-relaxed text-bone/75">{step.text}</p>
						</div>
					</li>
				{/each}
			</ol>

			<div class="hidden lg:block">
				<div use:inview class="sticky top-[18vh] aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-graphite">
					{#each visuals as v, i (i)}
						<div
							class="absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] {active === i
								? 'scale-100 opacity-100'
								: 'scale-[1.04] opacity-0'}"
						>
							<enhanced:img src={v.img} alt={v.alt} sizes="45vw" loading="lazy" class="absolute inset-0 size-full object-cover" />
						</div>
					{/each}

					{#if active === 3}
						{#each pins as p, j (p.t)}
							<div class="pin absolute" style="left:{p.x}%;top:{p.y}%;--j:{j}">
								<span class="relative grid size-7 place-items-center rounded-full bg-sand text-xs font-semibold text-ink shadow-lg">{j + 1}</span>
								<span class="absolute left-9 top-0 whitespace-nowrap rounded-lg bg-ink/85 px-3 py-1.5 text-xs text-bone backdrop-blur">{p.t}</span>
							</div>
						{/each}
					{/if}

					<div class="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl bg-ink/70 px-4 py-2.5 backdrop-blur">
						<span class="font-display text-xs text-sand">{process[active].n}</span>
						<span class="text-sm">{process[active].title}</span>
					</div>
					<div class="absolute bottom-4 right-4 flex gap-1.5">
						{#each process as _, i (i)}
							<span class="h-1 rounded-full transition-all duration-500 {active === i ? 'w-6 bg-sand' : 'w-1.5 bg-white/40'}"></span>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.pin {
		animation: pin 0.6s var(--ease-out-expo) both;
		animation-delay: calc(var(--j) * 180ms + 250ms);
	}
	.pin > span:first-child::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 9999px;
		background: var(--color-sand);
		animation: ping 1.8s ease-out infinite;
		z-index: -1;
	}
	@keyframes pin {
		from {
			opacity: 0;
			transform: translateY(8px) scale(0.8);
		}
	}
	@keyframes ping {
		to {
			transform: scale(2.2);
			opacity: 0;
		}
	}
</style>
