<script lang="ts">
	import '@fontsource-variable/unbounded/wght.css';
	import '@fontsource-variable/inter/wght.css';
	import './layout.css';
	// Основные начертания грузим заранее: иначе каждый пришедший шрифт вызывает перераскладку всей страницы
	import unboundedCyr from '@fontsource-variable/unbounded/files/unbounded-cyrillic-wght-normal.woff2?url';
	import unboundedLat from '@fontsource-variable/unbounded/files/unbounded-latin-wght-normal.woff2?url';
	import interCyr from '@fontsource-variable/inter/files/inter-cyrillic-wght-normal.woff2?url';
	import interLat from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { scroll, handleAnchorClicks, settleToHash } from '#lib/scroll.svelte.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Заход по ссылке с якорем (в том числе со страницы политики на /#faq) — довести до точной позиции,
	// и ещё раз, когда догрузятся шрифты и картинки
	afterNavigate(() => {
		settleToHash();
		if (document.readyState !== 'complete') window.addEventListener('load', settleToHash, { once: true });
	});

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let destroyed = false;
		let cleanup = () => {};
		const idle = (cb: () => void) =>
			'requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 1200);
		// Плавный скролл подключаем в простое после загрузки, чтобы не мешать первой отрисовке
		idle(async () => {
			const { default: Lenis } = await import('lenis');
			if (destroyed) return;
			const lenis = new Lenis({ lerp: 0.1, autoRaf: true });
			scroll.lenis = lenis;
			document.addEventListener('click', handleAnchorClicks);
			cleanup = () => {
				document.removeEventListener('click', handleAnchorClicks);
				lenis.destroy();
				scroll.lenis = null;
			};
		});
		return () => {
			destroyed = true;
			cleanup();
		};
	});
</script>

<svelte:head>
	{#each [unboundedCyr, interCyr, unboundedLat, interLat] as href (href)}
		<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" {href} />
	{/each}
</svelte:head>

{@render children()}
