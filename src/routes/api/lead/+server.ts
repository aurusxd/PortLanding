import { json } from '@sveltejs/kit';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '$app/env/private';
import { estimate, rub } from '#lib/pricing.ts';
import { MAX_FILE_MB } from '#lib/lead.ts';
import type { RequestHandler } from './$types';

const ALLOWED_EXT = ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'dwg', 'dxf', 'zip'];

// Простая защита от флуда: не больше 5 заявок за 10 минут с одного IP (в пределах инстанса функции)
const hits = new Map<string, number[]>();
function limited(ip: string) {
	const now = Date.now();
	const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
	list.push(now);
	hits.set(ip, list);
	return list.length > 5;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const str = (v: FormDataEntryValue | null, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function tg(method: string, body: FormData | Record<string, unknown>) {
	const isForm = body instanceof FormData;
	const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`, {
		method: 'POST',
		headers: isForm ? undefined : { 'content-type': 'application/json' },
		body: isForm ? body : JSON.stringify(body),
		signal: AbortSignal.timeout(15_000)
	});
	const data = (await res.json().catch(() => ({}))) as { ok?: boolean; description?: string };
	if (!res.ok || !data.ok) throw new Error(`Telegram ${method}: ${data.description ?? res.status}`);
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
		console.error('[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы');
		return json({ error: 'Форма временно не настроена. Напишите нам в Telegram или позвоните.' }, { status: 503 });
	}

	let ip = 'unknown';
	try {
		ip = getClientAddress();
	} catch {
		/* локально адрес может быть недоступен */
	}
	if (limited(ip)) return json({ error: 'Слишком много заявок. Попробуйте через несколько минут.' }, { status: 429 });

	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return json({ error: 'Некорректный запрос или слишком большой файл.' }, { status: 400 });
	}

	// Ловушки для ботов: скрытое поле и слишком быстрая отправка. Отвечаем «успехом», чтобы бот не подбирал обход.
	const elapsed = Number(form.get('t'));
	if (str(form.get('website'), 200) || (Number.isFinite(elapsed) && elapsed < 2500)) {
		return json({ ok: true });
	}

	const kind = str(form.get('kind'), 20);
	const name = str(form.get('name'), 80);
	const phone = str(form.get('phone'), 30);
	const message = str(form.get('message'), 1500);
	const digits = phone.replace(/\D/g, '');

	if (kind !== 'calc' && kind !== 'contact') return json({ error: 'Неизвестный тип заявки.' }, { status: 400 });
	if (name.length < 2) return json({ error: 'Укажите имя.' }, { status: 400 });
	if (!/^7\d{10}$/.test(digits)) return json({ error: 'Укажите телефон в формате +7 (999) 999-99-99.' }, { status: 400 });

	const lines: string[] = [];
	if (kind === 'calc') {
		// Цену считаем на сервере заново — значению из браузера не доверяем
		const e = estimate(str(form.get('room'), 20), Number(form.get('area')), str(form.get('urgency'), 20));
		if (!e) return json({ error: 'Некорректные параметры расчёта.' }, { status: 400 });
		lines.push(
			'🧮 <b>Заявка из калькулятора</b>',
			'',
			`<b>Помещение:</b> ${esc(e.room.label)}`,
			`<b>Площадь:</b> ${e.area} м²`,
			`<b>Срочность:</b> ${esc(e.urgency.label)} (${esc(e.urgency.days)})`,
			`<b>Ракурсов:</b> ≈ ${e.views}`,
			`<b>Ориентир:</b> ${rub(e.price)}`
		);
	} else {
		lines.push('✉️ <b>Заявка с сайта</b>');
		if (message) lines.push('', `<b>Комментарий:</b>\n${esc(message)}`);
	}

	let file: File | null = null;
	const raw = form.get('file');
	if (raw instanceof File && raw.size > 0) {
		const ext = raw.name.split('.').pop()?.toLowerCase() ?? '';
		if (!ALLOWED_EXT.includes(ext)) return json({ error: 'Этот тип файла не поддерживается.' }, { status: 400 });
		if (raw.size > MAX_FILE_MB * 1024 * 1024) return json({ error: `Файл больше ${MAX_FILE_MB} МБ.` }, { status: 413 });
		file = raw;
	}

	lines.push(
		'',
		`👤 ${esc(name)}`,
		`📞 <a href="tel:+${digits}">${esc(phone)}</a>`,
		file ? `📎 Файл: ${esc(file.name)} — ниже` : '',
		`🕒 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} МСК`
	);

	try {
		await tg('sendMessage', {
			chat_id: TELEGRAM_CHAT_ID,
			text: lines.filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n'),
			parse_mode: 'HTML',
			link_preview_options: { is_disabled: true }
		});
		if (file) {
			const fd = new FormData();
			fd.set('chat_id', TELEGRAM_CHAT_ID);
			fd.set('caption', `План от ${name}, ${phone}`.slice(0, 1000));
			fd.set('document', file, file.name);
			await tg('sendDocument', fd);
		}
	} catch (err) {
		console.error('[lead]', err);
		return json({ error: 'Не удалось отправить заявку. Напишите нам в Telegram или позвоните.' }, { status: 502 });
	}

	return json({ ok: true });
};
