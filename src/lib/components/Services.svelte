<script lang="ts">
	import interior from '#lib/assets/img/living-2.jpg?enhanced&w=1800;1280;860;560';
	import exterior from '#lib/assets/img/facade-2.jpg?enhanced&w=1800;1280;860;560';
	import pano from '#lib/assets/img/pano.jpg?enhanced&w=1800;1280;860;560';
	import plan from '#lib/assets/img/plan.jpg?enhanced&w=1800;1280;860;560';
	import anim from '#lib/assets/img/bath-1.jpg?enhanced&w=1800;1280;860;560';
	import { reveal, inview } from '#lib/actions/reveal.ts';
	import Heading from './Heading.svelte';
	import Notch from './Notch.svelte';
	import Icon from './Icon.svelte';
	import PanoViewer from './PanoViewer.svelte';

	let panoOpen = $state(false);

	const services = [
		{
			n: '01',
			title: 'Визуализация интерьера',
			text: 'Фотореалистичные ракурсы квартир, домов и коммерческих помещений: дневной и вечерний свет, точные материалы.',
			price: 'от 4 500 ₽ / ракурс',
			time: 'от 3 дней',
			img: interior,
			alt: 'Визуализация гостиной в стиле японди',
			span: 'lg:col-span-2'
		},
		{
			n: '02',
			title: 'Экстерьер',
			text: 'Фасады, ландшафт и окружение для частных домов и ЖК.',
			price: 'от 12 000 ₽ / ракурс',
			time: 'от 5 дней',
			img: exterior,
			alt: 'Визуализация фасада виллы с травертином',
			span: ''
		},
		{
			n: '03',
			title: '360°-панорамы',
			text: 'Виртуальная прогулка по интерьеру — для сайта, презентации и VR.',
			price: 'от 9 000 ₽ / точка',
			time: 'от 4 дней',
			img: pano,
			alt: 'Панорама светлой квартиры-лофта',
			span: '',
			pano: true
		},
		{
			n: '04',
			title: 'Планировки',
			text: '3D-планы квартир сверху для отделов продаж и каталогов застройщиков.',
			price: 'от 5 500 ₽ / план',
			time: 'от 2 дней',
			img: plan,
			alt: '3D-планировка двухкомнатной квартиры, вид сверху',
			span: ''
		},
		{
			n: '05',
			title: 'Анимация',
			text: 'Видео-облёт интерьера или дома 30–60 секунд с плавным движением камеры.',
			price: 'от 35 000 ₽ / ролик',
			time: 'от 7 дней',
			img: anim,
			alt: 'Кадр анимации: ванная комната с каменной ванной',
			span: '',
			anim: true
		}
	];
</script>

<section id="services" class="relative bg-ink px-2 sm:px-3" aria-labelledby="services-title" use:inview>
	<div class="shell bg-bone [color-scheme:light] pb-16 pt-16 text-ink sm:pb-24 sm:pt-24">
		<Notch fill="var(--color-bone)" dark={false} />
		<div class="container-x">
			<div class="grid gap-6 lg:grid-cols-2 lg:items-end">
				<div>
					<p class="eyebrow text-ink/70" use:reveal>Услуги</p>
					<Heading id="services-title" lines={['Что мы', 'визуализируем']} class="mt-6" />
				</div>
				<p class="max-w-md text-[15px] leading-relaxed text-ink/65 lg:justify-self-end" use:reveal={100}>
					От одного ракурса для согласования с заказчиком до полного пакета для старта продаж: рендеры, панорамы, планы и видео.
				</p>
			</div>

			<div class="cv mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
				{#each services as s, i (s.n)}
					<article
						class="group relative flex min-h-[22rem] flex-col overflow-hidden rounded-[var(--radius-card)] bg-ink text-bone sm:min-h-[26rem] {s.span}"
						use:reveal={(i % 3) * 90}
					>
						<enhanced:img
							src={s.img}
							alt={s.alt}
							sizes={s.span ? '(min-width:1024px) 62vw, 100vw' : '(min-width:1024px) 31vw, (min-width:640px) 48vw, 100vw'}
							loading="lazy"
							class="absolute inset-0 size-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] {s.anim
								? 'animate-kenburns'
								: 'group-hover:scale-105'}"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/0"></div>

						<div class="relative flex items-start justify-between p-5 sm:p-6">
							<span class="font-display text-sm text-bone/70">{s.n}</span>
							<span class="flex items-center gap-1.5 rounded-full bg-ink/50 px-3 py-1.5 text-xs backdrop-blur-md">
								<Icon name="clock" class="size-3.5" />{s.time}
							</span>
						</div>

						{#if s.anim}
							<div class="relative mx-6 mt-auto mb-0 flex items-center gap-3 pt-6" aria-hidden="true">
								<span class="grid size-9 place-items-center rounded-full bg-bone/90 text-ink">
									<svg viewBox="0 0 24 24" class="ml-0.5 size-4" fill="currentColor"><path d="M8 5.5v13l10.5-6.5Z" /></svg>
								</span>
								<span class="h-0.5 flex-1 overflow-hidden rounded bg-bone/25"><span class="progress block h-full bg-sand"></span></span>
								<span class="text-xs tabular-nums text-bone/70">0:45</span>
							</div>
						{/if}

						<div class="relative p-5 sm:p-6 {s.anim ? '' : 'mt-auto'}">
							<h3 class="text-xl font-semibold tracking-tight sm:text-2xl">{s.title}</h3>
							<p class="mt-2 max-w-md text-sm leading-relaxed text-bone/70">{s.text}</p>
							<div class="mt-5 flex items-center justify-between gap-3">
								<span class="text-sm font-medium text-sand-light">{s.price}</span>
								{#if s.pano}
									<button
										type="button"
										onclick={() => (panoOpen = true)}
										class="relative z-10 flex h-10 items-center gap-2 rounded-xl bg-bone px-4 text-[13px] font-medium text-ink transition hover:bg-sand"
									>
										Открыть 360°
									</button>
								{:else}
									<a
										href="#calculator"
										class="grid size-10 place-items-center rounded-full bg-bone text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-sand"
										aria-label="Рассчитать: {s.title}"
									>
										<Icon name="arrow-up-right" class="size-[18px]" />
									</a>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>

{#if panoOpen}
	<PanoViewer src={pano.img.src} onclose={() => (panoOpen = false)} />
{/if}

<style>
	.progress {
		transform-origin: left;
		transform: scaleX(0);
		animation: progress 9s linear infinite;
	}
	@keyframes progress {
		to {
			transform: scaleX(1);
		}
	}
</style>
