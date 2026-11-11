<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { lockScroll } from '#lib/scroll.svelte.ts';
	import Icon from './Icon.svelte';

	let { src, onclose }: { src: string; onclose: () => void } = $props();

	let dialog: HTMLDialogElement;
	let x = $state(50); // положение по горизонтали, 0–100 %
	let dragging = $state(false);
	let auto = true;
	let dir = 1;
	let startX = 0;
	let startPos = 0;

	onMount(() => {
		dialog.showModal();
		lockScroll(true);
		let raf = 0;
		let last = performance.now();
		const loop = (t: number) => {
			const dt = Math.min(64, t - last);
			last = t;
			if (auto && !dragging) {
				x += dir * dt * 0.004;
				if (x >= 100 || x <= 0) {
					dir *= -1;
					x = Math.max(0, Math.min(100, x));
				}
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(raf);
			lockScroll(false);
		};
	});

	function down(e: PointerEvent) {
		dragging = true;
		auto = false;
		startX = e.clientX;
		startPos = x;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}
	function move(e: PointerEvent) {
		if (!dragging) return;
		const w = (e.currentTarget as HTMLElement).clientWidth;
		x = Math.max(0, Math.min(100, startPos - ((e.clientX - startX) / w) * 60));
	}
	function key(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') ((auto = false), (x = Math.max(0, x - 4)));
		if (e.key === 'ArrowRight') ((auto = false), (x = Math.min(100, x + 4)));
	}
</script>

<dialog
	bind:this={dialog}
	class="m-0 size-full max-h-none max-w-none bg-ink p-0 text-bone backdrop:bg-ink"
	aria-label="360°-панорама"
	oncancel={(e) => {
		e.preventDefault();
		onclose();
	}}
	onkeydown={key}
>
	<div class="relative size-full" transition:fade={{ duration: 300 }}>
		<div
			class="absolute inset-0 touch-none {dragging ? 'cursor-grabbing' : 'cursor-grab'}"
			style="background:url({src}) {x}% 50% / auto 100% no-repeat"
			onpointerdown={down}
			onpointermove={move}
			onpointerup={() => (dragging = false)}
			onpointercancel={() => (dragging = false)}
			role="img"
			aria-label="Панорама светлой квартиры-лофта. Перетаскивайте, чтобы осмотреться"
		></div>
		<div class="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-ink/80 to-transparent p-8">
			<span class="flex items-center gap-2 rounded-full bg-ink/60 px-4 py-2 text-sm backdrop-blur"><Icon name="drag" class="size-4" /> Перетаскивайте, чтобы осмотреться</span>
			<span class="h-1 w-40 overflow-hidden rounded bg-white/20"><span class="block h-full rounded bg-sand" style="width:12%;margin-left:{x * 0.88}%"></span></span>
		</div>
		<button type="button" onclick={onclose} class="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-ink/60 backdrop-blur transition hover:rotate-90 hover:bg-ink" aria-label="Закрыть панораму">
			<Icon name="close" />
		</button>
	</div>
</dialog>
