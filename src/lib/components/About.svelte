<script lang="ts">
	import studio from '#lib/assets/img/studio.jpg?enhanced&w=1800;1280;860;560';
	import draft from '#lib/assets/img/living-1-draft.jpg?enhanced&w=1800;1280;860;560';
	import p1 from '#lib/assets/img/person-1.jpg?enhanced&w=160;112';
	import p2 from '#lib/assets/img/person-2.jpg?enhanced&w=160;112';
	import p3 from '#lib/assets/img/person-3.jpg?enhanced&w=160;112';
	import { reveal } from '#lib/actions/reveal.ts';
	import Heading from './Heading.svelte';
	import Notch from './Notch.svelte';
	import Icon from './Icon.svelte';
</script>

<section id="about" class="container-x relative" aria-labelledby="about-title">
	<div class="shell bg-coal p-3 sm:p-5 lg:p-6">
		<Notch fill="var(--color-coal)" href="#about" />
		<div class="grid gap-3 sm:gap-4 lg:grid-cols-[1.15fr_1fr_1fr] lg:grid-rows-[auto_auto]">
			<!-- Текст -->
			<div class="flex flex-col p-3 pb-6 sm:p-5 lg:p-6">
				<p class="eyebrow text-bone/60" use:reveal>О студии</p>
				<Heading id="about-title" lines={['Точность', 'и атмосфера']} lower={[1]} class="mt-8 lg:mt-auto" />
				<p class="mt-5 max-w-md text-[15px] leading-relaxed text-bone/60" use:reveal={150}>
					Команда 3D-художников, которая делает рендеры для утверждения проектов с первого показа: точная геометрия по чертежам, реальные
					материалы и честный свет.
				</p>
			</div>

			<!-- Команда -->
			<div class="flex min-h-56 flex-col rounded-[var(--radius-card)] bg-stone p-6 text-ink sm:p-7" use:reveal={100}>
				<div class="flex -space-x-3">
					{#each [p1, p2, p3] as p, i (i)}
						<enhanced:img src={p} alt="" sizes="56px" class="size-12 rounded-full border-2 border-stone object-cover sm:size-14" />
					{/each}
					<span class="grid size-12 place-items-center rounded-full border-2 border-stone bg-sand text-ink sm:size-14">
						<Icon name="plus" class="size-5" />
					</span>
				</div>
				<p class="mt-auto pt-10 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">12 визуализаторов</p>
				<p class="mt-2 max-w-xs text-sm leading-relaxed text-ink/70">В команде только 3D-художники с опытом от 5 лет и арт-директор.</p>
			</div>

			<!-- Фото студии -->
			<div class="group relative min-h-80 overflow-hidden rounded-[var(--radius-card)] lg:row-span-2" use:reveal={200}>
				<enhanced:img
					src={studio}
					alt="Рабочее место визуализатора: мониторы с рендером и образцы материалов"
					sizes="(min-width:1024px) 30vw, 100vw"
					loading="lazy"
					class="absolute inset-0 size-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-105"
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"></div>
				<div class="absolute inset-x-0 top-0 flex flex-wrap gap-2 p-5">
					{#each ['3ds Max', 'Corona', 'Unreal Engine'] as tag (tag)}
						<span class="rounded-full border border-white/15 bg-ink/40 px-3 py-1.5 text-xs text-bone/90 backdrop-blur-md">{tag}</span>
					{/each}
				</div>
				<div class="absolute inset-x-0 bottom-0 p-6">
					<p class="text-xl font-semibold tracking-tight">Студия в Москве</p>
					<p class="mt-1 text-sm text-bone/70">Работаем удалённо с заказчиками по всей России и СНГ</p>
				</div>
			</div>

			<!-- CTA -->
			<a
				href="#process"
				class="about-cta group relative flex min-h-56 items-end overflow-hidden rounded-[var(--radius-card)] bg-sand p-6 text-ink sm:p-7"
				use:reveal={150}
			>
				<span class="relative max-w-[12rem] text-xl font-medium leading-snug">Узнать, как мы работаем</span>
				<span
					class="relative ml-auto grid size-14 shrink-0 place-items-center rounded-full bg-ink text-bone transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45"
				>
					<Icon name="arrow-up-right" class="size-5" />
				</span>
			</a>

			<!-- Партнёры -->
			<div class="relative flex min-h-56 flex-col overflow-hidden rounded-[var(--radius-card)] bg-stone p-6 text-ink sm:p-7" use:reveal={250}>
				<enhanced:img
					src={draft}
					alt=""
					sizes="240px"
					loading="lazy"
					class="pointer-events-none absolute -right-6 -top-4 w-52 opacity-60 mix-blend-multiply sm:w-60"
				/>
				<p class="relative mt-auto pt-24 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">Работаем по чертежам</p>
				<p class="relative mt-2 max-w-xs text-sm leading-relaxed text-ink/70">
					Берём DWG, PDF или эскиз от руки — модель строим по реальным размерам.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.about-cta::before {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-radial-gradient(circle at 85% 95%, rgb(255 255 255 / 0.08) 0 2px, transparent 2px 46px);
		transition: transform 1.2s var(--ease-out-expo);
	}
	.about-cta:hover::before {
		transform: scale(1.15);
	}
</style>
