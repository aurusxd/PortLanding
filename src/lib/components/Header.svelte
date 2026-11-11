<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { nav, site } from '#lib/config.ts';
	import { lockScroll } from '#lib/scroll.svelte.ts';
	import Logo from './Logo.svelte';
	import Icon from './Icon.svelte';

	let { home = true }: { home?: boolean } = $props();

	let open = $state(false);
	let scrolled = $state(false);

	const prefix = $derived(home ? '' : '/');

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 40);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	$effect(() => {
		lockScroll(open);
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (open = false);
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

<header class="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
	<div class="container-x">
		<div
			class="relative flex h-14 items-center justify-between rounded-2xl border px-2 backdrop-blur-md transition-[background-color,border-color] duration-500 sm:h-16 sm:px-3 {scrolled ||
			open
				? 'border-white/10 bg-coal/80'
				: 'border-white/[0.07] bg-white/[0.06]'}"
		>
			<div class="flex items-center gap-1">
				<button
					type="button"
					class="grid size-10 place-items-center rounded-xl text-bone transition-colors hover:bg-white/10"
					aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
					aria-expanded={open}
					aria-controls="site-menu"
					onclick={() => (open = !open)}
				>
					{#if open}
						<Icon name="close" class="size-5" />
					{:else}
						<Icon name="grid" class="size-6" />
					{/if}
				</button>
				<nav aria-label="Основная навигация" class="hidden xl:block">
					<ul class="flex items-center">
						{#each nav as item (item.href)}
							<li>
								<a
									href="{prefix}{item.href}"
									class="rounded-lg px-3 py-2 text-[13px] text-bone/70 transition-colors hover:text-bone"
									>{item.label}</a
								>
							</li>
						{/each}
					</ul>
				</nav>
			</div>

			<a href="/" class="absolute left-1/2 -translate-x-1/2 text-bone" aria-label="{site.name} — на главную">
				<Logo />
			</a>

			<div class="flex items-center gap-2">
				<a href="{prefix}#calculator" class="btn btn-sand hidden !h-10 !rounded-xl !px-4 text-[13px] sm:inline-flex">
					Рассчитать стоимость
				</a>
				<a
					href={site.telegram}
					target="_blank"
					rel="noopener"
					class="grid size-9 place-items-center rounded-full bg-bone text-ink transition-transform hover:scale-110 sm:size-10"
					aria-label="Написать в Telegram"
				>
					<Icon name="telegram" class="size-[18px] -translate-x-px" />
				</a>
				<a
					href={site.whatsapp}
					target="_blank"
					rel="noopener"
					class="hidden size-10 place-items-center rounded-full bg-bone text-ink transition-transform hover:scale-110 md:grid"
					aria-label="Написать в WhatsApp"
				>
					<Icon name="whatsapp" class="size-[19px]" />
				</a>
			</div>
		</div>
	</div>
</header>

{#if open}
	<div
		id="site-menu"
		class="fixed inset-0 z-40 overflow-y-auto bg-ink/95 backdrop-blur-xl"
		transition:fade={{ duration: 300 }}
		role="dialog"
		aria-modal="true"
		aria-label="Меню"
	>
		<div class="container-x flex min-h-full flex-col pb-10 pt-28">
			<nav aria-label="Меню сайта">
				<ul class="flex flex-col">
					{#each nav as item, i (item.href)}
						<li in:fly={{ y: 40, duration: 700, delay: 60 + i * 50, opacity: 0 }}>
							<a
								href="{prefix}{item.href}"
								onclick={() => (open = false)}
								class="group flex items-center justify-between border-b border-white/10 py-4 font-display text-[clamp(1.6rem,6vw,3.5rem)] font-semibold uppercase leading-none tracking-tight text-bone transition-colors hover:text-sand sm:py-5"
							>
								{item.label}
								<span class="text-sm font-normal text-mute transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-sand">
									<Icon name="arrow-up-right" class="size-7" />
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
			<div class="mt-auto grid gap-6 pt-12 text-sm text-bone/70 sm:grid-cols-3" in:fade={{ delay: 400 }}>
				<div>
					<p class="mb-1 text-mute">Телефон</p>
					<a href={site.phoneHref} class="text-bone hover:text-sand">{site.phone}</a>
				</div>
				<div>
					<p class="mb-1 text-mute">Почта</p>
					<a href="mailto:{site.email}" class="text-bone hover:text-sand">{site.email}</a>
				</div>
				<a href="{prefix}#calculator" onclick={() => (open = false)} class="btn btn-sand sm:justify-self-end">Рассчитать стоимость</a>
			</div>
		</div>
	</div>
{/if}
