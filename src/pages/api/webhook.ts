export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
	try {
		const payload = await request.json();

		console.log('Webhook received:', payload);

		const event = payload.type;
		const email = payload.data?.to;

		console.log('Event:', event, 'Email:', email);

		return new Response('OK', { status: 200 });
	} catch (error) {
		console.error('Webhook error:', error);
		return new Response('Error', { status: 500 });
	}
};