<script lang="ts">
	import photo from '#lib/assets/img/contact.jpg?enhanced&w=1800;1280;860;560';
	import { site, tgLink } from '#lib/config.ts';
	import { reveal } from '#lib/actions/reveal.ts';
	import Heading from './Heading.svelte';
	import Icon from './Icon.svelte';

	const steps = [
		{ title: 'Напишите в Telegram', text: 'Пришлите план, эскиз или просто опишите задачу.' },
		{ title: 'Оценим за 15 минут', text: 'Назовём стоимость, сроки и предложим ракурсы — бесплатно.' },
		{ title: 'Начнём с брифа', text: 'Фиксируем условия в договоре и приступаем к работе.' }
	];
</script>

<section id="contacts" class="cv pb-16 pt-8 sm:pb-24" aria-labelledby="contacts-title">
	<div class="container-x">
		<div class="grid overflow-hidden rounded-[var(--radius-shell)] bg-white lg:grid-cols-[1.1fr_0.9fr]">
			<div class="flex flex-col p-6 sm:p-10 lg:p-14">
				<p class="eyebrow text-ink/70" use:reveal>Контакты</p>
				<Heading id="contacts-title" lines={['Обсудим', 'ваш проект']} lower={[1]} class="mt-6" />
				<p class="mt-5 max-w-md text-[15px] leading-relaxed text-ink/70" use:reveal={100}>
					Без форм и ожидания звонка: напишите нам напрямую — отвечаем в рабочее время в течение 15 минут.
				</p>

				<ol class="mt-10 grid gap-3 sm:grid-cols-3">
					{#each steps as s, i (s.title)}
						<li class="rounded-[var(--radius-card)] bg-bone p-5" use:reveal={150 + i * 80}>
							<span class="font-display text-sm text-sand-dark">0{i + 1}</span>
							<p class="mt-3 font-semibold leading-snug">{s.title}</p>
							<p class="mt-1.5 text-sm leading-relaxed text-ink/70">{s.text}</p>
						</li>
					{/each}
				</ol>

				<div class="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-10" use:reveal={300}>
					<a
						href={tgLink('Здравствуйте! Хочу обсудить 3D-визуализацию.')}
						target="_blank"
						rel="noopener"
						class="btn btn-dark h-14 sm:px-8"
						style="--tg-cut: var(--color-ink)"
					>
						<Icon name="telegram" class="size-5" /> Написать в Telegram
					</a>
					<a href={site.phoneHref} class="btn h-14 border border-ink/15 text-ink hover:bg-bone sm:px-8">Позвонить</a>
				</div>
			</div>

			<div class="relative min-h-[26rem] lg:min-h-[36rem]">
				<enhanced:img src={photo} alt="Визуализация светлой кухни-гостиной" sizes="(min-width:1024px) 45vw, 100vw" loading="lazy" class="absolute inset-0 size-full object-cover" />
				<div class="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"></div>
				<div class="absolute inset-x-0 bottom-0 p-4 sm:p-6">
					<div class="grid gap-3 rounded-2xl bg-ink/60 p-5 text-sm text-bone backdrop-blur-md sm:grid-cols-2">
						<div>
							<p class="text-bone/60">Telegram</p>
							<a href={site.telegram} target="_blank" rel="noopener" class="font-medium hover:text-sand">{site.telegramHandle}</a>
						</div>
						<div>
							<p class="text-bone/60">Телефон</p>
							<a href={site.phoneHref} class="font-medium hover:text-sand">{site.phone}</a>
						</div>
						<div>
							<p class="text-bone/60">Почта</p>
							<a href="mailto:{site.email}" class="font-medium hover:text-sand">{site.email}</a>
						</div>
						<div>
							<p class="text-bone/60">{site.hours}</p>
							<p class="font-medium">{site.address}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
