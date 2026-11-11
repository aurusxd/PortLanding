/** Маска российского телефона: +7 (999) 123-45-67 */
export function formatPhone(raw: string): string {
	let d = raw.replace(/\D/g, '');
	if (!d) return '';
	if (d[0] === '8') d = '7' + d.slice(1);
	if (d[0] !== '7') d = '7' + d;
	d = d.slice(0, 11);
	const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
	let out = '+7';
	if (p[0]) out += ` (${p[0]}`;
	if (p[0].length === 3) out += ')';
	if (p[1]) out += ` ${p[1]}`;
	if (p[2]) out += `-${p[2]}`;
	if (p[3]) out += `-${p[3]}`;
	return out;
}

export const phoneDigits = (v: string) => v.replace(/\D/g, '');
export const isPhoneValid = (v: string) => /^7\d{10}$/.test(phoneDigits(v));

export const MAX_FILE_MB = 4;
export const ACCEPT = '.pdf,.jpg,.jpeg,.png,.webp,.dwg,.dxf,.zip';

export type LeadResult = { ok: true } | { ok: false; error: string };

export async function sendLead(data: FormData): Promise<LeadResult> {
	try {
		const res = await fetch('/api/lead', { method: 'POST', body: data });
		const json = (await res.json().catch(() => ({}))) as { error?: string };
		if (!res.ok) return { ok: false, error: json.error || 'Не удалось отправить заявку. Попробуйте ещё раз.' };
		return { ok: true };
	} catch {
		return { ok: false, error: 'Нет соединения с сервером. Проверьте интернет и попробуйте ещё раз.' };
	}
}
