export const prerender = false;

import type { APIRoute } from 'astro';
import { receiveWebhookEvent } from '../../features/contact/server/receiveWebhookEvent.ts';

export const POST: APIRoute = async ({ request }) => {
	try {
		await receiveWebhookEvent(request);

		return new Response('OK', { status: 200 });
	} catch (error) {
		console.error('Webhook error:', error);
		return new Response('Error', { status: 500 });
	}
};