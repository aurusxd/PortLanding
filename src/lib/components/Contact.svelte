<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import photo from '#lib/assets/img/contact.jpg?enhanced&w=1800;1280;860;560';
	import { site } from '#lib/config.ts';
	import { leadPrefill } from '#lib/scroll.svelte.ts';
	import { formatPhone, isPhoneValid, sendLead, MAX_FILE_MB, ACCEPT } from '#lib/lead.ts';
	import { reveal } from '#lib/actions/reveal.ts';
	import Heading from './Heading.svelte';
	import Icon from './Icon.svelte';

	let name = $state('');
	let phone = $state('');
	let message = $state('');
	let file = $state<File | null>(null);
	let consent = $state(false);
	let website = $state('');
	let touched = $state(false);
	let dragOver = $state(false);
	let fileError = $state('');
	let status = $state<'idle' | 'sending' | 'done' | 'error'>('idle');
	let error = $state('');
	let fileInput = $state<HTMLInputElement>();
	const startedAt = Date.now();

	// Тариф или проект, выбранный выше на странице, подставляется в комментарий
	$effect(() => {
		if (leadPrefill.topic) message = leadPrefill.topic;
	});

	const phoneOk = $derived(isPhoneValid(phone));
	const valid = $derived(name.trim().length > 1 && phoneOk && consent);

	function pick(f: File | undefined | null) {
		fileError = '';
		if (!f) return;
		if (f.size > MAX_FILE_MB * 1024 * 1024) {
			fileError = `Файл больше ${MAX_FILE_MB} МБ. Пришлите его в Telegram или ссылкой в комментарии.`;
			return;
		}
		file = f;
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		touched = true;
		if (!valid) return;
		status = 'sending';
		const fd = new FormData();
		fd.set('kind', 'contact');
		fd.set('name', name);
		fd.set('phone', phone);
		fd.set('message', message);
		fd.set('website', website);
		fd.set('t', String(Date.now() - startedAt));
		if (file) fd.set('file', file);
		const r = await sendLead(fd);
		if (r.ok) {
			status = 'done';
			leadPrefill.topic = '';
		} else {
			status = 'error';
			error = r.error;
		}
	}

	const size = (b: number) => (b > 1024 * 1024 ? (b / 1024 / 1024).toFixed(1) + ' МБ' : Math.ceil(b / 1024) + ' КБ');
</script>

<section id="contacts" class="cv pb-16 pt-8 sm:pb-24" aria-labelledby="contacts-title">
	<div class="container-x">
		<div class="grid overflow-hidden rounded-[var(--radius-shell)] bg-white lg:grid-cols-[1.1fr_0.9fr]">
			<div class="p-6 sm:p-10 lg:p-14">
				<p class="eyebrow text-ink/70" use:reveal>Контакты</p>
				<Heading id="contacts-title" lines={['Обсудим', 'ваш проект']} lower={[1]} class="mt-6" />
				<p class="mt-5 max-w-md text-[15px] leading-relaxed text-ink/65" use:reveal={100}>
					Пришлите план или эскиз — бесплатно оценим стоимость, сроки и предложим ракурсы.
				</p>

				{#if status === 'done'}
					<div class="mt-10 rounded-[var(--radius-card)] bg-bone p-8" in:fly={{ y: 16, duration: 500 }}>
						<span class="grid size-14 place-items-center rounded-full bg-sand text-ink"><Icon name="check" class="size-6" /></span>
						<p class="mt-5 font-display text-xl font-bold uppercase tracking-tight">Заявка отправлена</p>
						<p class="mt-2 text-ink/65">Спасибо, {name.trim()}! Перезвоним или напишем в течение 15 минут в рабочее время.</p>
						<button type="button" class="mt-6 text-sm underline underline-offset-4" onclick={() => ((status = 'idle'), (message = ''), (file = null))}>
							Отправить ещё одну
						</button>
					</div>
				{:else}
					<form class="mt-10 grid gap-3" onsubmit={submit} novalidate use:reveal={150}>
						<div class="grid gap-3 sm:grid-cols-2">
							<label class="block">
								<span class="sr-only">Имя</span>
								<input bind:value={name} name="name" autocomplete="name" placeholder="Ваше имя" class="field field-light" aria-invalid={touched && name.trim().length < 2} />
							</label>
							<label class="block">
								<span class="sr-only">Телефон</span>
								<input
									value={phone}
									oninput={(e) => (phone = e.currentTarget.value = formatPhone(e.currentTarget.value))}
									name="phone"
									type="tel"
									inputmode="tel"
									autocomplete="tel"
									placeholder="+7 (999) 999-99-99"
									class="field field-light"
									aria-invalid={touched && !phoneOk}
								/>
							</label>
						</div>
						<label class="block">
							<span class="sr-only">Комментарий</span>
							<textarea
								bind:value={message}
								name="message"
								rows="3"
								maxlength="1500"
								placeholder="Что нужно визуализировать? Площадь, стиль, сроки"
								class="field field-light !h-auto resize-none py-3.5"
							></textarea>
						</label>

						<!-- Загрузка плана -->
						<div
							class="relative flex items-center gap-4 rounded-xl border border-dashed p-4 transition-colors {dragOver
								? 'border-sand-dark bg-sand/10'
								: 'border-stone hover:border-sand-dark'}"
							role="group"
							aria-label="Загрузка плана"
							ondragover={(e) => (e.preventDefault(), (dragOver = true))}
							ondragleave={() => (dragOver = false)}
							ondrop={(e) => {
								e.preventDefault();
								dragOver = false;
								pick(e.dataTransfer?.files[0]);
							}}
						>
							<span class="grid size-11 shrink-0 place-items-center rounded-xl bg-bone text-ink/70"><Icon name="upload" /></span>
							{#if file}
								<div class="min-w-0 flex-1" in:fade>
									<p class="truncate text-sm font-medium">{file.name}</p>
									<p class="text-xs text-ink/70">{size(file.size)}</p>
								</div>
								<button type="button" class="grid size-9 place-items-center rounded-full hover:bg-bone" onclick={() => ((file = null), fileInput && (fileInput.value = ''))} aria-label="Удалить файл">
									<Icon name="close" class="size-4" />
								</button>
							{:else}
								<div class="flex-1 text-sm">
									<button type="button" class="font-medium underline underline-offset-4" onclick={() => fileInput?.click()}>Прикрепите план</button>
									<span class="text-ink/70"> или перетащите файл сюда</span>
									<p class="mt-0.5 text-xs text-ink/70">PDF, JPG, PNG, DWG, ZIP — до {MAX_FILE_MB} МБ</p>
								</div>
							{/if}
							<input bind:this={fileInput} aria-label="Файл с планом помещения" type="file" name="file" accept={ACCEPT} class="sr-only" tabindex="-1" onchange={(e) => pick(e.currentTarget.files?.[0])} />
						</div>
						{#if fileError}<p class="text-sm text-red-700" transition:fade>{fileError}</p>{/if}

						<input bind:value={website} name="website" tabindex="-1" autocomplete="off" class="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden="true" />

						<label class="mt-1 flex cursor-pointer items-start gap-3 text-sm text-ink/65">
							<input type="checkbox" bind:checked={consent} class="mt-0.5 size-4 accent-[var(--color-sand-dark)]" />
							<span>Согласен на обработку персональных данных в соответствии с <a href="/privacy" class="underline underline-offset-2 hover:text-ink">политикой конфиденциальности</a></span>
						</label>

						{#if touched && !valid}
							<p class="text-sm text-red-700" transition:fade>
								{!consent ? 'Нужно согласие на обработку данных.' : 'Укажите имя и телефон полностью.'}
							</p>
						{/if}
						{#if status === 'error'}<p class="text-sm text-red-700" role="alert">{error}</p>{/if}

						<button type="submit" class="btn btn-dark mt-2 w-full sm:w-auto sm:justify-self-start sm:px-10" disabled={status === 'sending'}>
							{status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
							<Icon name="arrow-right" class="size-4" />
						</button>
					</form>
				{/if}
			</div>

			<div class="relative min-h-[26rem] lg:min-h-full">
				<enhanced:img src={photo} alt="Визуализация светлой кухни-гостиной" sizes="(min-width:1024px) 45vw, 100vw" loading="lazy" class="absolute inset-0 size-full object-cover" />
				<div class="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"></div>
				<div class="absolute inset-x-0 bottom-0 grid gap-3 p-4 sm:p-6">
					<a
						href={site.telegram}
						target="_blank"
						rel="noopener"
						class="group flex items-center gap-4 rounded-2xl bg-white/90 p-4 text-ink backdrop-blur-md transition hover:bg-white"
					>
						<span class="grid size-12 place-items-center rounded-full bg-[#2AABEE] text-white" style="--tg-cut:#2AABEE"><Icon name="telegram" class="size-5 -translate-x-px" /></span>
						<span class="flex-1">
							<span class="block font-semibold">Написать в Telegram</span>
							<span class="block text-sm text-ink/70">{site.telegramHandle} · ответ за 15 минут</span>
						</span>
						<Icon name="arrow-up-right" class="size-5 transition-transform group-hover:rotate-45" />
					</a>
					<div class="grid gap-3 rounded-2xl bg-ink/60 p-4 text-sm text-bone backdrop-blur-md sm:grid-cols-2">
						<div>
							<p class="text-bone/55">Телефон</p>
							<a href={site.phoneHref} class="font-medium hover:text-sand">{site.phone}</a>
						</div>
						<div>
							<p class="text-bone/55">Почта</p>
							<a href="mailto:{site.email}" class="font-medium hover:text-sand">{site.email}</a>
						</div>
						<div class="sm:col-span-2">
							<p class="text-bone/55">{site.hours}</p>
							<p class="font-medium">{site.address}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
