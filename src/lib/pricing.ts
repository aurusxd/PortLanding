/**
 * Логика калькулятора. Используется и в браузере, и на сервере:
 * сервер пересчитывает цену сам и не доверяет числу, пришедшему из формы.
 */

export const roomTypes = [
	{ id: 'living', label: 'Гостиная', rate: 900, min: 12000 },
	{ id: 'kitchen', label: 'Кухня', rate: 1000, min: 12000 },
	{ id: 'bedroom', label: 'Спальня', rate: 850, min: 10000 },
	{ id: 'bath', label: 'Санузел', rate: 1500, min: 9000 },
	{ id: 'flat', label: 'Вся квартира', rate: 750, min: 35000 },
	{ id: 'facade', label: 'Фасад дома', rate: 450, min: 25000 }
] as const;

export const urgencies = [
	{ id: 'standard', label: 'Стандарт', days: '7–10 дней', k: 1 },
	{ id: 'fast', label: 'Быстро', days: '5 дней', k: 1.3 },
	{ id: 'express', label: 'Экспресс', days: '3 дня', k: 1.6 }
] as const;

export type RoomTypeId = (typeof roomTypes)[number]['id'];
export type UrgencyId = (typeof urgencies)[number]['id'];

export const AREA_MIN = 5;
export const AREA_MAX = 400;

export interface Estimate {
	room: (typeof roomTypes)[number];
	urgency: (typeof urgencies)[number];
	area: number;
	price: number;
	views: number;
}

export function clampArea(area: number) {
	if (!Number.isFinite(area)) return AREA_MIN;
	return Math.min(AREA_MAX, Math.max(AREA_MIN, Math.round(area)));
}

export function estimate(roomId: string, areaInput: number, urgencyId: string): Estimate | null {
	const room = roomTypes.find((r) => r.id === roomId);
	const urgency = urgencies.find((u) => u.id === urgencyId);
	if (!room || !urgency) return null;
	const area = clampArea(areaInput);
	const base = Math.max(room.min, area * room.rate);
	const price = Math.round((base * urgency.k) / 500) * 500;
	// Примерное число ракурсов: ~1 на 6 м², но не меньше 2 и не больше 24
	const views = Math.min(24, Math.max(2, Math.round(area / (room.id === 'facade' ? 40 : 6))));
	return { room, urgency, area, price, views };
}

export const rub = (n: number) => new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
