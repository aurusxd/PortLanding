<script lang="ts">
	import living from '#lib/assets/img/living-1.jpg?enhanced&w=1800;1280;860;560';
	import livingDraft from '#lib/assets/img/living-1-draft.jpg?enhanced&w=1800;1280;860;560';
	import kitchen from '#lib/assets/img/kitchen-2.jpg?enhanced&w=1800;1280;860;560';
	import kitchenDraft from '#lib/assets/img/kitchen-2-draft.jpg?enhanced&w=1800;1280;860;560';
	import { reveal } from '#lib/actions/reveal.ts';
	import Heading from './Heading.svelte';
	import Icon from './Icon.svelte';

	const pairs = [
		{ id: 'living', label: 'Гостиная', before: livingDraft, after: living, alt: 'гостиной в известняке' },
		{ id: 'kitchen', label: 'Кухня', before: kitchenDraft, after: kitchen, alt: 'кухни-столовой с травертиновым островом' }
	];

	let current = $state(0);
	let pos = $state(50);
	let box: HTMLElement;
	let hinted = false;

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const io = new IntersectionObserver(
			([e]) => {
				if (!e.isIntersecting || hinted) return;
				hinted = true;
				io.disconnect();
				// Подсказка: шторка «проезжает» туда-обратно
				const keys = [
					[0, 50],
					[700, 78],
					[1500, 30],
					[2200, 50]
				];
				const t0 = performance.now();
				const tick = (t: number) => {
					const dt = t - t0;
					for (let k = 1; k < keys.length; k++) {
						if (dt <= keys[k][0]) {
							const [ta, va] = keys[k - 1];
							const [tb, vb] = keys[k];
							const x = (dt - ta) / (tb - ta);
							const ease = x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
							pos = va + (vb - va) * ease;
							requestAnimationFrame(tick);
							return;
						}
					}
					pos = 50;
				};
				requestAnimationFrame(tick);
			},
			{ threshold: 0.5 }
		);
		io.observe(box);
		return () => io.disconnect();
	});
</script>

<div class="mt-20 grid items-center gap-10 sm:mt-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16" id="before-after">
	<div>
		<p class="eyebrow text-bone/60" use:reveal>До / после</p>
		<Heading lines={['От чертежа', 'до рендера']} lower={[1]} class="mt-6" />
		<p class="mt-5 max-w-md text-[15px] leading-relaxed text-bone/60" use:reveal={100}>
			Потяните шторку: слева — линейный чертёж, с которого мы начинаем, справа — финальная визуализация с материалами и светом.
		</p>
		<div class="mt-8 flex gap-2" use:reveal={150}>
			{#each pairs as p, i (p.id)}
				<button
					type="button"
					onclick={() => (current = i)}
					aria-pressed={current === i}
					class="h-11 rounded-xl border px-5 text-sm transition-all {current === i
						? 'border-bone bg-bone text-ink'
						: 'border-white/15 text-bone/80 hover:border-white/40'}">{p.label}</button
				>
			{/each}
		</div>
	</div>

	<div
		bind:this={box}
		class="relative aspect-[4/3] select-none overflow-hidden rounded-[var(--radius-card)] bg-white"
		style="--pos:{pos}%"
		use:reveal={100}
	>
		{#each pairs as p, i (p.id)}
			<div class="absolute inset-0 transition-opacity duration-500 {current === i ? 'opacity-100' : 'pointer-events-none opacity-0'}">
				<enhanced:img src={p.after} alt="Финальный рендер {p.alt}" sizes="(min-width:1024px) 55vw, 100vw" loading="lazy" class="absolute inset-0 size-full object-cover" />
				<div class="absolute inset-0 [clip-path:inset(0_calc(100%-var(--pos))_0_0)]">
					<enhanced:img src={p.before} alt="Чертёж {p.alt}" sizes="(min-width:1024px) 55vw, 100vw" loading="lazy" class="absolute inset-0 size-full object-cover" />
				</div>
			</div>
		{/each}

		<span class="pointer-events-none absolute left-4 top-4 rounded-lg bg-ink/80 px-2.5 py-1.5 text-xs text-bone">Чертёж</span>
		<span class="pointer-events-none absolute right-4 top-4 rounded-lg bg-bone/90 px-2.5 py-1.5 text-xs text-ink">Рендер</span>

		<div class="pointer-events-none absolute inset-y-0 left-[var(--pos)] w-px -translate-x-1/2 bg-bone shadow-[0_0_20px_rgba(0,0,0,0.4)]">
			<span class="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bone text-ink shadow-xl">
				<Icon name="drag" class="size-5" />
			</span>
		</div>

		<input
			type="range"
			min="0"
			max="100"
			step="0.1"
			bind:value={pos}
			aria-label="Положение шторки: чертёж или рендер"
			class="absolute inset-0 size-full cursor-ew-resize opacity-0"
		/>
	</div>
</div>
