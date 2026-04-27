import { beforeEach, describe, expect, it, vi } from 'vitest';

const sendMock = vi.fn();

vi.mock('resend', () => ({
	Resend: vi.fn().mockImplementation(() => ({
		emails: {
			send: sendMock,
		},
	})),
}));

describe('sendLeadNotification', () => {
	beforeEach(() => {
		sendMock.mockReset();
	});

	it('returns resend id when the provider accepts the lead notification', async () => {
		sendMock.mockResolvedValue({
			data: { id: 're_test_123' },
			error: null,
		});

		const { sendLeadNotification } = await import('./sendLeadNotification.ts');
		const result = await sendLeadNotification({
			apiKey: 're_test_key',
			toEmail: 'owner@example.com',
			contactSubmission: {
				name: 'Ada Lovelace',
				email: 'ada@example.com',
				business: 'Analytical Engines',
				inquiry: 'Improve AI visibility',
			},
		});

		expect(result).toEqual({
			ok: true,
			resendId: 're_test_123',
		});
	});

	it('returns a normalized error when the provider rejects the lead notification', async () => {
		const providerError = { name: 'provider_error', message: 'rejected' };
		sendMock.mockResolvedValue({
			data: null,
			error: providerError,
		});

		const { sendLeadNotification } = await import('./sendLeadNotification.ts');
		const result = await sendLeadNotification({
			apiKey: 're_test_key',
			toEmail: 'owner@example.com',
			contactSubmission: {
				name: 'Ada Lovelace',
				email: 'ada@example.com',
				business: 'Analytical Engines',
				inquiry: 'Improve AI visibility',
			},
		});

		expect(result).toEqual({
			ok: false,
			message: 'Email provider rejected the lead notification.',
			error: providerError,
		});
	});
});