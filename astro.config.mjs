// @ts-check
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.aiwisespaces.com',
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
