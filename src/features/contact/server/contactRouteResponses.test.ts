import { describe, expect, it } from 'vitest';
import {
	contactRejectedResponse,
	contactSubmissionServerErrorResponse,
	emailRejectedResponse,
	inquirySubmittedResponse,
	methodNotAllowedResponse,
	missingEmailSettingsResponse,
} from './contactRouteResponses.ts';

describe('contactRouteResponses', () => {
	it('returns a 500 response when email settings are missing', async () => {
		const response = missingEmailSettingsResponse();

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({
			message: 'Server email settings are missing.',
		});
	});

	it('returns a 400 response when a contact submission is rejected', async () => {
		const response = contactRejectedResponse('Please fill out name and email.');

		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({
			message: 'Please fill out name and email.',
		});
	});

	it('returns a 500 response when the email provider rejects the lead notification', async () => {
		const response = emailRejectedResponse('Email provider rejected the lead notification.');

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({
			message: 'Email provider rejected the lead notification.',
		});
	});

	it('returns a success response with the resend id when inquiry submission succeeds', async () => {
		const response = inquirySubmittedResponse('re_test_123');

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			message: 'Inquiry submitted successfully.',
			resendId: 're_test_123',
		});
	});

	it('returns a 500 response for contact submission server errors', async () => {
		const response = contactSubmissionServerErrorResponse();

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({
			message: 'Contact submission server error.',
		});
	});

	it('returns a 405 response for unsupported methods', async () => {
		const response = methodNotAllowedResponse();

		expect(response.status).toBe(405);
		expect(await response.json()).toEqual({
			message: 'Method not allowed.',
		});
	});
});