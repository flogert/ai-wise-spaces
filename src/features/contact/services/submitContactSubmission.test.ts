import { afterEach, describe, expect, it, vi } from 'vitest';
import { submitContactSubmission } from './submitContactSubmission.ts';

describe('submitContactSubmission', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it('returns the normalized success message and resend id for a successful submission', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: true,
				json: vi.fn().mockResolvedValue({
					message: 'Inquiry submitted successfully.',
					resendId: 're_test_123',
				}),
			}),
		);

		const formData = new FormData();
		formData.set('name', 'Ada Lovelace');

		await expect(submitContactSubmission(formData)).resolves.toEqual({
			message: 'Inquiry submitted successfully.',
			resendId: 're_test_123',
		});
	});

	it('falls back to the default success message when the API omits it', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: true,
				json: vi.fn().mockResolvedValue({}),
			}),
		);

		await expect(submitContactSubmission(new FormData())).resolves.toEqual({
			message: 'Inquiry submitted successfully.',
			resendId: undefined,
		});
	});

	it('throws the normalized API message for failed submissions', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: false,
				json: vi.fn().mockResolvedValue({
					message: 'Please fill out name and email.',
				}),
			}),
		);

		await expect(submitContactSubmission(new FormData())).rejects.toThrow(
			'Please fill out name and email.',
		);
	});

	it('throws the fallback error when the API response body cannot be parsed', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: false,
				json: vi.fn().mockRejectedValue(new Error('invalid json')),
			}),
		);

		await expect(submitContactSubmission(new FormData())).rejects.toThrow(
			'Something went wrong.',
		);
	});
});