<script lang="ts">
	import hero from '#lib/assets/img/hero.jpg?enhanced&w=2560;1920;1280;828';
	import { onMount } from 'svelte';

	const word = 'ИНТЕРЬЕРОВ';
	const stats = [
		{ value: '340+', label: 'проектов сдано' },
		{ value: 'от 3', label: 'дней на рендер' },
		{ value: '4K', label: 'итоговое качество' }
	];

	let section: HTMLElement;
	let media: HTMLElement;
	let content: HTMLElement;
	let statsEl: HTMLElement;

	// Параллакс при скролле. Секция «липкая», поэтому прогресс считаем по первой высоте экрана.
	// Пишем только transform/opacity (работает на композиторе) и только пока hero виден.
	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let raf = 0;
		let last = -1;
		const clamp = (v: number) => Math.min(1, Math.max(0, v));
		const cover = document.getElementById('portfolio');
		const update = () => {
			raf = 0;
			// Сначала чтение (без записи до него — нет принудительного пересчёта раскладки)
			const covered = cover ? cover.getBoundingClientRect().top <= 0 : false;
			section.style.visibility = covered ? 'hidden' : '';
			const p = clamp(window.scrollY / window.innerHeight);
			if (p === last) return;
			last = p;
			media.style.transform = `translate3d(0, ${p * 12}%, 0) scale(${1 + p * 0.08})`;
			const c = clamp(p / 0.7);
			content.style.transform = `translate3d(0, ${c * -25}%, 0)`;
			content.style.opacity = String(1 - c);
			const s = clamp(p / 0.2);
			statsEl.style.transform = `translate3d(0, ${s * -20}px, 0)`;
			statsEl.style.opacity = String(1 - s);
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		update();
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<section bind:this={section} class="sticky top-0 isolate h-[100svh] min-h-[600px] overflow-hidden bg-ink" aria-label="Главный экран">
	<div bind:this={media} class="absolute inset-0 -z-10 origin-center">
		<enhanced:img
			src={hero}
			alt="Фотореалистичная визуализация тёмной кухни-гостиной с панорамным окном и вечерней подсветкой"
			class="hero-img size-full object-cover"
			sizes="100vw"
			fetchpriority="high"
			loading="eager"
		/>
		<div class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink/80"></div>
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(15_14_13/0.55)_100%)]"></div>
	</div>

	<div bind:this={content} class="container-x flex h-full flex-col items-center justify-center pb-40 pt-24 text-center md:pb-24">
		<p class="hero-fade eyebrow mb-6 text-bone/70 [--d:0ms]">Студия 3D-визуализации · с 2017 года</p>

		<h1 class="flex flex-col items-center">
			<span
				class="hero-fade font-display text-[clamp(0.85rem,0.55rem+1.35vw,1.85rem)] font-semibold uppercase leading-tight tracking-[0.01em] text-bone/85 [--d:80ms]"
				>Фотореалистичные 3D-визуализации</span
			>
			<span class="mt-1 flex select-none font-display text-[clamp(2.4rem,10.2vw,10.5rem)] font-bold leading-[0.95] tracking-[-0.035em] sm:mt-2" aria-hidden="true">
				{#each word.split('') as ch, i (i)}
					<span class="hero-letter" style="--i:{i}">{ch}</span>
				{/each}
			</span>
			<span class="sr-only">интерьеров</span>
		</h1>

		<p class="hero-fade mt-5 max-w-xl text-balance text-[15px] leading-relaxed text-bone/70 [--d:200ms] sm:text-base">
			Показываем интерьер до ремонта так, будто он уже готов. Для дизайнеров, архитекторов, девелоперов и частных заказчиков.
		</p>

		<div class="hero-fade mt-8 flex flex-col items-center gap-3 [--d:320ms] sm:flex-row">
			<a href="#calculator" class="btn btn-sand min-w-[15rem]">Рассчитать стоимость</a>
			<a href="#portfolio" class="btn btn-ghost min-w-[15rem] backdrop-blur-sm">Смотреть работы</a>
		</div>
	</div>

	<div bind:this={statsEl} class="absolute inset-x-0 bottom-[5.25rem]">
	<dl class="hero-fade container-x grid grid-cols-3 gap-3 [--d:450ms] md:gap-6">
		{#each stats as s, i (s.label)}
			<div class="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-3 {i === 1 ? 'items-center md:justify-center' : i === 2 ? 'items-end md:justify-end' : ''}">
				<dt class="sr-only">{s.label}</dt>
				<dd class="font-display text-xl font-semibold tracking-tight text-bone md:text-3xl lg:text-4xl">{s.value}</dd>
				<dd class="max-w-[7rem] text-[11px] leading-tight text-bone/60 md:text-left md:text-xs">{s.label}</dd>
			</div>
		{/each}
	</dl>
	</div>
</section>

<style>
	.hero-letter {
		display: inline-block;
		background-image: linear-gradient(180deg, #fff 30%, rgb(255 255 255 / 0.55) 68%, rgb(255 255 255 / 0.05) 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
	:global(html.js) .hero-letter {
		animation: letter 1.2s var(--ease-out-expo) both;
		animation-delay: calc(120ms + var(--i) * 45ms);
	}
	:global(html.js) .hero-fade {
		animation: fadeUp 1.2s var(--ease-out-expo) both;
		animation-delay: var(--d, 0ms);
	}
	:global(html.js) :global(.hero-img) {
		animation: heroZoom 2.4s var(--ease-out-expo) both;
	}
	/* Буква «вырастает» из тонкой полоски — только transform/opacity, без clip-path и blur:
	   так анимация идёт на композиторе и не перерисовывает огромный текст в каждом кадре */
	@keyframes letter {
		from {
			transform: translate3d(0, 0.12em, 0) scaleY(0.08);
			opacity: 0;
		}
		35% {
			opacity: 1;
		}
		to {
			transform: none;
			opacity: 1;
		}
	}
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translate3d(0, 1.5rem, 0);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	@keyframes heroZoom {
		from {
			transform: scale(1.12);
		}
		to {
			transform: scale(1);
		}
	}
</style>
