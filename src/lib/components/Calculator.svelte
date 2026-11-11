<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import kitchen from '#lib/assets/img/kitchen-1.jpg?enhanced&w=1800;1280;860;560';
	import { roomTypes, urgencies, estimate, rub, AREA_MIN, AREA_MAX } from '#lib/pricing.ts';
	import { formatPhone, isPhoneValid, sendLead } from '#lib/lead.ts';
	import { reveal } from '#lib/actions/reveal.ts';
	import Heading from './Heading.svelte';
	import Icon from './Icon.svelte';

	let room = $state<string>('living');
	let area = $state(24);
	let urgency = $state<string>('standard');

	let name = $state('');
	let phone = $state('');
	let website = $state(''); // honeypot
	let status = $state<'idle' | 'sending' | 'done' | 'error'>('idle');
	let error = $state('');
	let touched = $state(false);
	const startedAt = Date.now();

	const result = $derived(estimate(room, area, urgency)!);
	const price = new Tween(0, { duration: 700, easing: cubicOut });
	$effect(() => {
		price.target = result.price;
	});

	const phoneOk = $derived(isPhoneValid(phone));
	const fill = $derived(((result.area - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100);

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		touched = true;
		if (!name.trim() || !phoneOk) return;
		status = 'sending';
		const fd = new FormData();
		fd.set('kind', 'calc');
		fd.set('name', name);
		fd.set('phone', phone);
		fd.set('room', room);
		fd.set('area', String(area));
		fd.set('urgency', urgency);
		fd.set('website', website);
		fd.set('t', String(Date.now() - startedAt));
		const r = await sendLead(fd);
		if (r.ok) status = 'done';
		else ((status = 'error'), (error = r.error));
	}
</script>

<section id="calculator" class="cv relative bg-ink py-20 sm:py-28" aria-labelledby="calc-title">
	<div class="container-x">
		<div class="shell bg-coal p-4 sm:p-8 lg:p-10">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p class="eyebrow text-bone/60" use:reveal>Калькулятор</p>
					<Heading id="calc-title" lines={['Рассчитайте', 'стоимость']} class="mt-6" />
				</div>
				<p class="max-w-xs text-sm text-bone/55" use:reveal={100}>Цена ориентировочная. Точную смету пришлём после просмотра плана — бесплатно.</p>
			</div>

			<div class="mt-8 grid gap-4 sm:mt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
				<div class="relative hidden overflow-hidden rounded-[var(--radius-card)] lg:block" use:reveal>
					<enhanced:img
						src={kitchen}
						alt="Визуализация кухни с графитовыми фасадами и островом из терраццо"
						sizes="40vw"
						loading="lazy"
						class="absolute inset-0 size-full object-cover"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent"></div>
					<div class="absolute inset-x-0 bottom-0 p-7">
						<p class="text-xs uppercase tracking-wider text-bone/60">Ориентир</p>
						<p class="mt-1 font-display text-4xl font-bold tracking-tight xl:text-5xl" aria-live="polite">
							{rub(Math.round(price.current / 100) * 100)}
						</p>
						<div class="mt-4 flex flex-wrap gap-2 text-xs text-bone/80">
							<span class="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur"><Icon name="camera" class="size-3.5" />≈ {result.views} ракурсов</span>
							<span class="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur"><Icon name="clock" class="size-3.5" />{result.urgency.days}</span>
						</div>
					</div>
				</div>

				<form class="flex flex-col gap-3" onsubmit={submit} novalidate>
					<!-- 1. Тип -->
					<fieldset class="rounded-[var(--radius-card)] bg-graphite p-5 sm:p-6" use:reveal={50}>
						<legend class="float-left mb-4 w-full text-[15px] font-medium">1. Тип помещения</legend>
						<div class="clear-both grid grid-cols-2 gap-2 sm:grid-cols-3">
							{#each roomTypes as r (r.id)}
								<label
									class="relative flex h-12 cursor-pointer items-center justify-center rounded-xl border text-sm transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-sand {room ===
									r.id
										? 'border-sand bg-sand/15 text-bone'
										: 'border-white/10 text-bone/70 hover:border-white/30'}"
								>
									<input type="radio" name="room" value={r.id} bind:group={room} class="sr-only" />
									{r.label}
								</label>
							{/each}
						</div>
					</fieldset>

					<!-- 2. Площадь -->
					<div class="rounded-[var(--radius-card)] bg-graphite p-5 sm:p-6" use:reveal={100}>
						<div class="flex items-center justify-between gap-4">
							<label for="calc-area" class="text-[15px] font-medium">2. Площадь</label>
							<div class="flex items-center gap-2">
								<input
									type="number"
									inputmode="numeric"
									min={AREA_MIN}
									max={AREA_MAX}
									bind:value={area}
									onblur={() => (area = Math.min(AREA_MAX, Math.max(AREA_MIN, Math.round(area || AREA_MIN))))}
									class="field field-dark !h-10 w-20 text-center tabular-nums"
									aria-label="Площадь, м²"
								/>
								<span class="text-sm text-mute">м²</span>
							</div>
						</div>
						<input
							id="calc-area"
							type="range"
							min={AREA_MIN}
							max={AREA_MAX}
							step="1"
							bind:value={area}
							class="range mt-5 w-full"
							style="--fill:{fill}%"
						/>
						<div class="mt-2 flex justify-between text-xs text-mute"><span>{AREA_MIN} м²</span><span>{AREA_MAX} м²</span></div>
					</div>

					<!-- 3. Срочность -->
					<fieldset class="rounded-[var(--radius-card)] bg-graphite p-5 sm:p-6" use:reveal={150}>
						<legend class="float-left mb-4 w-full text-[15px] font-medium">3. Срочность</legend>
						<div class="clear-both grid grid-cols-3 gap-2">
							{#each urgencies as u (u.id)}
								<label
									class="flex cursor-pointer flex-col items-center justify-center rounded-xl border px-2 py-3 text-center transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-sand {urgency ===
									u.id
										? 'border-sand bg-sand/15'
										: 'border-white/10 hover:border-white/30'}"
								>
									<input type="radio" name="urgency" value={u.id} bind:group={urgency} class="sr-only" />
									<span class="text-sm font-medium">{u.label}</span>
									<span class="mt-0.5 text-xs text-mute">{u.days}</span>
								</label>
							{/each}
						</div>
					</fieldset>

					<!-- Итог + контакты -->
					<div class="rounded-[var(--radius-card)] bg-graphite p-5 sm:p-6" use:reveal={200}>
						<div class="flex items-end justify-between gap-4 lg:hidden">
							<div>
								<p class="text-xs uppercase tracking-wider text-mute">Ориентир</p>
								<p class="mt-1 font-display text-3xl font-bold tracking-tight">{rub(Math.round(price.current / 100) * 100)}</p>
							</div>
							<p class="text-right text-xs text-bone/60">≈ {result.views} ракурсов<br />{result.urgency.days}</p>
						</div>

						{#if status === 'done'}
							<div class="flex items-center gap-4 py-2 lg:py-0" in:fly={{ y: 10 }}>
								<span class="grid size-12 shrink-0 place-items-center rounded-full bg-sand text-ink"><Icon name="check" /></span>
								<div>
									<p class="font-medium">Расчёт отправлен</p>
									<p class="text-sm text-bone/60">Менеджер свяжется с вами в течение 15 минут в рабочее время.</p>
								</div>
							</div>
						{:else}
							<p class="mb-4 mt-5 text-[15px] font-medium lg:mt-0">4. Куда прислать точный расчёт?</p>
							<div class="grid gap-2 sm:grid-cols-2">
								<div>
									<input
										bind:value={name}
										name="name"
										autocomplete="name"
										placeholder="Имя"
										class="field field-dark"
										aria-label="Имя"
										aria-invalid={touched && !name.trim()}
									/>
								</div>
								<div>
									<input
										value={phone}
										oninput={(e) => (phone = e.currentTarget.value = formatPhone(e.currentTarget.value))}
										name="phone"
										type="tel"
										inputmode="tel"
										autocomplete="tel"
										placeholder="+7 (999) 999-99-99"
										class="field field-dark"
										aria-label="Телефон"
										aria-invalid={touched && !phoneOk}
									/>
								</div>
							</div>
							<input bind:value={website} name="website" tabindex="-1" autocomplete="off" class="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden="true" />
							{#if touched && (!name.trim() || !phoneOk)}
								<p class="mt-2 text-sm text-red-300" transition:fade>Укажите имя и телефон полностью.</p>
							{/if}
							{#if status === 'error'}
								<p class="mt-2 text-sm text-red-300" role="alert">{error}</p>
							{/if}
							<div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
								<button type="submit" class="btn btn-sand sm:min-w-56" disabled={status === 'sending'}>
									{status === 'sending' ? 'Отправляем…' : 'Получить точный расчёт'}
								</button>
								<p class="text-xs leading-relaxed text-bone/60">
									Нажимая кнопку, вы соглашаетесь с <a href="/privacy" class="underline underline-offset-2 hover:text-bone">политикой конфиденциальности</a>
								</p>
							</div>
						{/if}
					</div>
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	.range {
		appearance: none;
		height: 4px;
		border-radius: 4px;
		background: linear-gradient(90deg, var(--color-sand) var(--fill), rgb(255 255 255 / 0.12) var(--fill));
		outline: none;
	}
	.range::-webkit-slider-thumb {
		appearance: none;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: var(--color-bone);
		border: 5px solid var(--color-sand);
		cursor: grab;
		transition: transform 0.2s;
	}
	.range::-webkit-slider-thumb:hover {
		transform: scale(1.15);
	}
	.range::-moz-range-thumb {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: var(--color-bone);
		border: 5px solid var(--color-sand);
		cursor: grab;
	}
	.range:focus-visible {
		outline: 2px solid var(--color-sand);
		outline-offset: 8px;
	}
</style>
