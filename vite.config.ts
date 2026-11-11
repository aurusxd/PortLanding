import tailwindcss from '@tailwindcss/vite';
import vercel from '@sveltejs/adapter-vercel';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

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
			// Все страницы пре-рендерятся в статику, серверных функций нет
			adapter: vercel()
		})
	]
});
