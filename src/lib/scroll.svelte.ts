import type Lenis from 'lenis';

/** Общий экземпляр плавного скролла (Lenis). Создаётся в +layout.svelte, если пользователь не просил reduce-motion. */
export const scroll: { lenis: Lenis | null } = { lenis: null };

export function lockScroll(lock: boolean) {
	if (scroll.lenis) {
		if (lock) scroll.lenis.stop();
		else scroll.lenis.start();
	}
	document.documentElement.style.overflow = lock ? 'hidden' : '';
}

// Отступ под шапку задаётся в CSS (`scroll-padding-top` у html) — Lenis и браузер учитывают его сами
const padTop = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

/**
 * Плавный переход к секции. Секции ниже первого экрана используют `content-visibility: auto`,
 * поэтому их высота до первого показа приблизительная и цель может «уехать», пока мы скроллим.
 * После анимации доводим позицию заново по уже отрисованной странице.
 */
export function scrollToId(hash: string) {
	const el = document.querySelector<HTMLElement>(hash);
	if (!el) return;
	const lenis = scroll.lenis;
	if (!lenis) {
		el.scrollIntoView({ behavior: 'smooth' });
		return;
	}
	const settle = (tries: number) => {
		const delta = el.getBoundingClientRect().top - padTop();
		if (Math.abs(delta) < 2 || tries <= 0) return;
		lenis.scrollTo(el, { duration: 0.5, force: true, onComplete: () => settle(tries - 1) });
	};
	lenis.scrollTo(el, { duration: 1.4, force: true, onComplete: () => settle(3) });
}

/**
 * Прямой заход по ссылке с якорем (`/#contacts`). Браузер прокручивает один раз по оценочным
 * высотам секций с `content-visibility`, поэтому доводим позицию: прокрутка → даём ближайшим
 * секциям отрисоваться (два кадра) → проверка, пока секция не встанет под шапку.
 */
export function settleToHash() {
	const hash = location.hash;
	if (!hash || hash === '#') return;
	let el: HTMLElement | null = null;
	try {
		el = document.querySelector<HTMLElement>(hash);
	} catch {
		return; // невалидный селектор в адресе
	}
	if (!el) return;
	let tries = 12;
	const step = () => {
		const delta = el!.getBoundingClientRect().top - padTop();
		if (Math.abs(delta) < 2 || tries-- <= 0) return;
		window.scrollTo({ top: window.scrollY + delta, behavior: 'instant' });
		requestAnimationFrame(() => requestAnimationFrame(step));
	};
	step();
}

/** Перехватывает клики по ссылкам вида `#id` (и `/#id` на главной) и ведёт через scrollToId. */
export function handleAnchorClicks(e: MouseEvent) {
	if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
	const a = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
	if (!a || a.target === '_blank') return;
	const url = new URL(a.href, location.href);
	if (url.pathname !== location.pathname || !url.hash || url.hash === '#') return;
	if (!document.querySelector(url.hash)) return;
	e.preventDefault();
	scrollToId(url.hash);
	history.replaceState(history.state, '', url.hash);
}

/** Выбранный тариф/расчёт, который подставляется в форму контактов. */
export const leadPrefill = $state({ topic: '' });
