export type ContactSubmission = {
	name: string;
	email: string;
	business: string;
	inquiry: string;
};

export type ContactSubmissionValidationResult =
	| {
		ok: true;
		contactSubmission: ContactSubmission;
	}
	| {
		ok: false;
		message: string;
		reason: 'validation';
	};

function normalizeFormValue(formValue: FormDataEntryValue | null): string {
	return String(formValue || '').trim();
}

export function createContactSubmission(formData: FormData): ContactSubmission {
	return {
		name: normalizeFormValue(formData.get('name')),
		email: normalizeFormValue(formData.get('email')),
		business: normalizeFormValue(formData.get('business')),
		inquiry: normalizeFormValue(formData.get('message')),
	};
}

export function validateContactSubmission(
	contactSubmission: ContactSubmission,
): ContactSubmissionValidationResult {
	if (!contactSubmission.name || !contactSubmission.email) {
		return {
			ok: false,
			message: 'Please fill out name and email.',
			reason: 'validation',
		};
	}

	return {
		ok: true,
		contactSubmission,
	};
}