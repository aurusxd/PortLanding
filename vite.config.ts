/// <reference types="node" />
import tailwindcss from '@tailwindcss/vite';
import vercel from '@sveltejs/adapter-vercel';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import type { Adapter } from '@sveltejs/kit';
import { defineConfig } from 'vite';

/**
 * adapter-vercel создаёт симлинки, а Windows без режима разработчика их запрещает.
 * На Vercel (Linux, переменная VERCEL=1) всегда используется настоящий адаптер;
 * при локальной сборке на Windows — «пустой», чтобы работали `npm run build` и `npm run preview`.
 */
const localWindows = process.platform === 'win32' && !process.env.VERCEL;
const noop: Adapter = { name: 'local-preview', adapt: () => {} };

export default defineConfig({
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// CSS (~14 КБ gzip) встраивается в HTML — без отдельного блокирующего запроса
			inlineStyleThreshold: 120_000,
			adapter: localWindows ? noop : vercel({ maxDuration: 20 })
		})
	]
});
