import { beforeEach, describe, expect, it, vi } from 'vitest';
import { receiveWebhookEvent } from './receiveWebhookEvent.ts';

describe('receiveWebhookEvent', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it('returns the webhook event summary from the request payload', async () => {
		const request = new Request('http://localhost/api/webhook', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				type: 'email.delivered',
				data: { to: 'owner@example.com' },
			}),
		});

		const result = await receiveWebhookEvent(request);

		expect(result).toEqual({
			event: 'email.delivered',
			email: 'owner@example.com',
		});
	});

	it('logs the raw payload and summarized fields', async () => {
		const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
		const payload = {
			type: 'email.opened',
			data: { to: 'owner@example.com' },
		};
		const request = new Request('http://localhost/api/webhook', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(payload),
		});

		await receiveWebhookEvent(request);

		expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'Webhook received:', payload);
		expect(consoleLogSpy).toHaveBeenNthCalledWith(2, 'Event:', 'email.opened', 'Email:', 'owner@example.com');
	});
});