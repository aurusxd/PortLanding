<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { categories, type Project } from '#lib/data.ts';
	import { lockScroll } from '#lib/scroll.svelte.ts';
	import { tgLink } from '#lib/config.ts';
	import Icon from './Icon.svelte';

	interface Props {
		project: Project;
		list: readonly Project[];
		onclose: () => void;
		onnavigate: (p: Project) => void;
	}
	let { project, list, onclose, onnavigate }: Props = $props();

	let dialog: HTMLDialogElement;
	const idx = $derived(list.findIndex((p) => p.id === project.id));
	const go = (d: number) => onnavigate(list[(idx + d + list.length) % list.length]);

	onMount(() => {
		dialog.showModal();
		lockScroll(true);
		return () => lockScroll(false);
	});

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') go(1);
		if (e.key === 'ArrowLeft') go(-1);
	}

	const orderHref = $derived(tgLink(`Здравствуйте! Хочу визуализацию как в проекте «${project.title}».`));

	const details = $derived([
		{ k: 'Тип', v: categories.find((c) => c.id === project.category)?.label },
		{ k: 'Площадь', v: `${project.area} м²` },
		{ k: 'Срок', v: `${project.days} дн.` },
		{ k: 'Ракурсов', v: project.views },
		{ k: 'Стиль', v: project.style }
	]);
</script>

<dialog
	bind:this={dialog}
	class="m-0 size-full max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/85 backdrop:backdrop-blur-md"
	aria-labelledby="project-title"
	oncancel={(e) => {
		e.preventDefault();
		onclose();
	}}
	{onkeydown}
>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div class="flex min-h-full items-center justify-center p-3 sm:p-6" onclick={(e) => e.target === e.currentTarget && onclose()} transition:fade={{ duration: 250 }}>
		<div
			class="relative grid w-full max-w-7xl overflow-hidden rounded-[1.5rem] bg-coal text-bone shadow-2xl lg:grid-cols-[1fr_22rem]"
			in:fly={{ y: 40, duration: 500, easing: cubicOut }}
		>
			<div class="relative aspect-[4/3] bg-ink lg:aspect-auto lg:min-h-[78vh]">
				{#key project.id}
					<enhanced:img
						src={project.image}
						alt={project.title}
						sizes="(min-width:1024px) 70vw, 100vw"
						class="absolute inset-0 size-full object-cover"
						in:fade={{ duration: 400 }}
					/>
				{/key}
				<div class="absolute inset-x-0 bottom-0 flex justify-between p-4">
					<button type="button" onclick={() => go(-1)} class="grid size-11 place-items-center rounded-full bg-ink/60 text-bone backdrop-blur transition hover:bg-ink" aria-label="Предыдущий проект">
						<Icon name="chevron-left" />
					</button>
					<button type="button" onclick={() => go(1)} class="grid size-11 place-items-center rounded-full bg-ink/60 text-bone backdrop-blur transition hover:bg-ink" aria-label="Следующий проект">
						<Icon name="chevron-right" />
					</button>
				</div>
			</div>

			<div class="flex flex-col p-6 sm:p-8">
				<p class="text-xs text-mute">{String(idx + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</p>
				<h3 id="project-title" class="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight">{project.title}</h3>
				<p class="mt-1 text-sm text-bone/60">{project.place}</p>
				<p class="mt-6 text-[15px] leading-relaxed text-bone/75">{project.text}</p>
				<dl class="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
					{#each details as d (d.k)}
						<div class="flex justify-between py-3">
							<dt class="text-mute">{d.k}</dt>
							<dd>{d.v}</dd>
						</div>
					{/each}
				</dl>
				<a href={orderHref} target="_blank" rel="noopener" class="btn btn-sand mt-8 w-full lg:mt-auto">Хочу так же</a>
			</div>

			<button
				type="button"
				onclick={onclose}
				class="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-ink/60 text-bone backdrop-blur transition hover:rotate-90 hover:bg-ink"
				aria-label="Закрыть"
			>
				<Icon name="close" />
			</button>
		</div>
	</div>
</dialog>
