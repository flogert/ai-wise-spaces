// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

const isLocalWindowsBuild = process.platform === 'win32' && !process.env.VERCEL;

// https://astro.build/config
export default defineConfig({
	site: 'https://aiwisespaces.com',
	output: 'server',
	adapter: isLocalWindowsBuild ? node({ mode: 'standalone' }) : vercel(),
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
