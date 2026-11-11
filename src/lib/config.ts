/** Общие данные студии. Поменяйте SITE_URL на свой домен перед деплоем. */
export const SITE_URL = 'https://lumenrender.ru';

export const site = {
	name: 'Lumen Render',
	legalName: 'ИП Лумен Рендер',
	title: 'Lumen Render — фотореалистичные 3D-визуализации интерьеров',
	description:
		'Студия 3D-визуализации Lumen Render: фотореалистичные рендеры интерьеров и экстерьеров, 360°-панорамы, планировки и анимация. Первые ракурсы — от 3 дней. Рассчитайте стоимость онлайн.',
	phone: '+7 (495) 120-48-36',
	phoneHref: 'tel:+74951204836',
	email: 'hello@lumenrender.ru',
	telegram: 'https://t.me/lumenrender',
	telegramHandle: '@lumenrender',
	whatsapp: 'https://wa.me/74951204836',
	address: 'Москва, Берсеневская наб., 6, стр. 3',
	hours: 'Пн–Пт, 10:00–19:00',
	socials: [
		{ label: 'Telegram', href: 'https://t.me/lumenrender' },
		{ label: 'Behance', href: 'https://www.behance.net/' },
		{ label: 'Pinterest', href: 'https://www.pinterest.com/' },
		{ label: 'VK', href: 'https://vk.com/' }
	]
} as const;

export const nav = [
	{ href: '#portfolio', label: 'Портфолио' },
	{ href: '#services', label: 'Услуги' },
	{ href: '#pricing', label: 'Цены' },
	{ href: '#process', label: 'Процесс' },
	{ href: '#faq', label: 'FAQ' },
	{ href: '#contacts', label: 'Контакты' }
] as const;
