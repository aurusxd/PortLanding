<script lang="ts">
	import { author, nav, site } from '#lib/config.ts';
	import Logo from './Logo.svelte';

	let { home = true }: { home?: boolean } = $props();
	const prefix = $derived(home ? '' : '/');
	const year = new Date().getFullYear();
</script>

<footer class="cv relative z-10 overflow-hidden bg-ink pt-16 text-bone sm:pt-24">
	<div class="container-x">
		<div class="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
			<div>
				<a href="/" aria-label="{site.name} — на главную"><Logo /></a>
				<p class="mt-5 max-w-xs text-sm leading-relaxed text-bone/55">
					Фотореалистичные 3D-визуализации интерьеров и экстерьеров для дизайнеров, архитекторов и девелоперов.
				</p>
				<a href="{prefix}#calculator" class="btn btn-sand mt-6 !h-11 text-sm">Рассчитать стоимость</a>
			</div>
			<nav aria-label="Навигация в подвале">
				<p class="text-xs uppercase tracking-wider text-mute">Разделы</p>
				<ul class="mt-4 grid gap-2.5 text-sm">
					{#each nav as item (item.href)}
						<li><a href="{prefix}{item.href}" class="text-bone/75 transition-colors hover:text-sand">{item.label}</a></li>
					{/each}
				</ul>
			</nav>
			<div>
				<p class="text-xs uppercase tracking-wider text-mute">Соцсети</p>
				<ul class="mt-4 grid gap-2.5 text-sm">
					{#each site.socials as s (s.label)}
						<li><a href={s.href} target="_blank" rel="noopener" class="text-bone/75 transition-colors hover:text-sand">{s.label}</a></li>
					{/each}
				</ul>
			</div>
			<div>
				<p class="text-xs uppercase tracking-wider text-mute">Контакты</p>
				<ul class="mt-4 grid gap-2.5 text-sm text-bone/75">
					<li><a href={site.phoneHref} class="hover:text-sand">{site.phone}</a></li>
					<li><a href="mailto:{site.email}" class="hover:text-sand">{site.email}</a></li>
					<li>{site.address}</li>
					<li>{site.hours}</li>
				</ul>
			</div>
		</div>

		<div class="flex flex-col gap-3 py-6 text-xs text-bone/60 sm:flex-row sm:items-center sm:justify-between">
			<p>© {year} {site.name}. Все права защищены.</p>
			<a href="/privacy" class="underline-offset-4 hover:text-bone hover:underline">Политика конфиденциальности</a>
			<p>
				Сделал
				<a href={author.href} target="_blank" rel="noopener" class="text-bone underline decoration-sand underline-offset-4 transition-colors hover:text-sand"
					>{author.name}</a
				>
			</p>
		</div>
	</div>

	<p
		class="wordmark pointer-events-none select-none whitespace-nowrap text-center font-display text-[17vw] font-bold uppercase leading-[0.75] tracking-[-0.05em]"
		aria-hidden="true"
	>
		Lumen
	</p>
</footer>

<style>
	/* Градиент, вырезанный по буквам. Свойства заданы по отдельности: сокращение `background:`
	   сбрасывает background-clip, и тогда вместо букв рисуется градиентный прямоугольник. */
	.wordmark {
		background-image: linear-gradient(180deg, rgb(236 235 231 / 0.16), rgb(236 235 231 / 0.01));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
</style>
