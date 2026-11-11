import type { Action } from 'svelte/action';

let io: IntersectionObserver | undefined;

function observer() {
	if (io) return io;
	io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					e.target.classList.add('in');
					io!.unobserve(e.target);
				}
			}
		},
		{ rootMargin: '0px 0px -12% 0px', threshold: 0.01 }
	);
	return io;
}

/** Добавляет класс `.in`, когда элемент входит во вьюпорт. Анимация — в CSS ([data-reveal], [data-split]). */
export const reveal: Action<HTMLElement, number | undefined> = (node, delay) => {
	if (delay) node.style.setProperty('--d', `${delay}ms`);
	if (!node.hasAttribute('data-reveal') && !node.hasAttribute('data-split')) {
		node.setAttribute('data-reveal', '');
	}
	if (!('IntersectionObserver' in window)) {
		node.classList.add('in');
		return;
	}
	observer().observe(node);
	return {
		destroy() {
			io?.unobserve(node);
		}
	};
};

let viewIo: IntersectionObserver | undefined;

/**
 * Ставит атрибут `data-inview`, пока элемент на экране. Бесконечные CSS-анимации внутри
 * (бегущая строка, Ken Burns, пульсация) замирают вне экрана — см. [data-anim-scope] в layout.css.
 */
export const inview: Action<HTMLElement> = (node) => {
	node.setAttribute('data-anim-scope', '');
	if (!('IntersectionObserver' in window)) {
		node.setAttribute('data-inview', '');
		return;
	}
	viewIo ??= new IntersectionObserver((entries) => {
		for (const e of entries) e.target.toggleAttribute('data-inview', e.isIntersecting);
	});
	viewIo.observe(node);
	return {
		destroy() {
			viewIo?.unobserve(node);
		}
	};
};
