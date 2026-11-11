<script lang="ts">
	import { site } from '#lib/config.ts';
	import Seo from '#lib/components/Seo.svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';

	const updated = '11 ноября 2026 г.';
</script>

<Seo
	title="Политика конфиденциальности — {site.name}"
	description="Политика конфиденциальности сайта студии 3D-визуализации {site.name}: сайт не собирает персональные данные."
	path="/privacy"
/>

<Header home={false} />

<main class="relative z-10 bg-ink pb-24 pt-32 sm:pt-40">
	<article class="container-x">
		<div class="mx-auto max-w-3xl">
			<p class="eyebrow text-bone/60">Документы</p>
			<h1 class="h-display mt-6">Политика <span class="lc">конфиденциальности</span></h1>
			<p class="mt-6 text-sm text-mute">Редакция от {updated}</p>

			<div class="policy mt-12 rounded-[var(--radius-shell)] bg-coal p-6 text-[15px] leading-relaxed text-bone/75 sm:p-10">
				<h2>1. Общие положения</h2>
				<p>
					Настоящая политика описывает, как сайт {site.name} (далее — Сайт) обращается с информацией о посетителях. Владелец Сайта —
					{site.legalName}, адрес: {site.address}, e-mail: <a href="mailto:{site.email}">{site.email}</a>.
				</p>

				<h2>2. Сайт не собирает персональные данные</h2>
				<p>
					На Сайте нет форм заявок, регистрации и подписок. Калькулятор стоимости работает прямо в браузере — введённые в него
					параметры никуда не отправляются и не сохраняются.
				</p>
				<p>
					Чтобы связаться с нами, вы сами переходите в Telegram ({site.telegramHandle}) или звоните по телефону {site.phone}. Кнопки
					Сайта лишь открывают чат с заранее набранным текстом — сообщение отправляете вы, и только если захотите.
				</p>

				<h2>3. Переписка и звонки</h2>
				<p>
					Если вы напишете или позвоните нам, мы используем ваше имя, контакт и присланные материалы (планы, эскизы) только для ответа на
					обращение, расчёта стоимости и выполнения заказа. Мы не передаём эти сведения третьим лицам, кроме случаев, предусмотренных
					законодательством РФ. Переписка в Telegram регулируется также правилами самого мессенджера.
				</p>

				<h2>4. Cookie и аналитика</h2>
				<p>
					Сайт не использует рекламные cookie и системы веб-аналитики. Хостинг может вести технические журналы (IP-адрес, тип браузера,
					время запроса), необходимые для работы и защиты Сайта.
				</p>

				<h2>5. Ваши права</h2>
				<p>
					Вы можете попросить удалить нашу переписку и присланные материалы, написав на <a href="mailto:{site.email}">{site.email}</a>
					или в Telegram. Запрос рассматривается в течение 10 рабочих дней.
				</p>

				<h2>6. Изменение политики</h2>
				<p>Политика может обновляться. Актуальная редакция всегда доступна на этой странице.</p>
			</div>

			<a href="/" class="btn btn-ghost mt-10">← Вернуться на главную</a>
		</div>
	</article>
</main>

<Footer home={false} />

<style>
	.policy :global(h2) {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.05rem;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		color: var(--color-bone);
		margin-top: 2.25rem;
		margin-bottom: 0.75rem;
	}
	.policy :global(h2:first-child) {
		margin-top: 0;
	}
	.policy :global(p + p) {
		margin-top: 0.75rem;
	}
	.policy :global(ul) {
		list-style: disc;
		padding-left: 1.25rem;
		display: grid;
		gap: 0.35rem;
	}
	.policy :global(a) {
		color: var(--color-sand-light);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
