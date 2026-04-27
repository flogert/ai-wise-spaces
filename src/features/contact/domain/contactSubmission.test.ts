import { describe, expect, it } from 'vitest';
import {
	createContactSubmission,
	validateContactSubmission,
} from './contactSubmission.ts';

describe('contactSubmission domain', () => {
	it('normalizes a contact submission from form data', () => {
		const formData = new FormData();
		formData.set('name', '  Ada Lovelace  ');
		formData.set('email', '  ada@example.com  ');
		formData.set('business', '  Analytical Engines  ');
		formData.set('message', '  Improve AI visibility  ');

		expect(createContactSubmission(formData)).toEqual({
			name: 'Ada Lovelace',
			email: 'ada@example.com',
			business: 'Analytical Engines',
			inquiry: 'Improve AI visibility',
		});
	});

	it('rejects a contact submission missing required fields', () => {
		const result = validateContactSubmission({
			name: 'Ada Lovelace',
			email: '',
			business: 'Analytical Engines',
			inquiry: '',
		});

		expect(result).toEqual({
			ok: false,
			message: 'Please fill out name and email.',
			reason: 'validation',
		});
	});

	it('accepts an otherwise valid submission when inquiry is omitted', () => {
		const contactSubmission = {
			name: 'Ada Lovelace',
			email: 'ada@example.com',
			business: '',
			inquiry: '',
		};

		expect(validateContactSubmission(contactSubmission)).toEqual({
			ok: true,
			contactSubmission,
		});
	});

	it('accepts a valid contact submission', () => {
		const contactSubmission = {
			name: 'Ada Lovelace',
			email: 'ada@example.com',
			business: 'Analytical Engines',
			inquiry: 'Improve AI visibility',
		};

		expect(validateContactSubmission(contactSubmission)).toEqual({
			ok: true,
			contactSubmission,
		});
	});
});