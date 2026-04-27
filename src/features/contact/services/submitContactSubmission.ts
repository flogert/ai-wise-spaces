export type SubmitContactSubmissionResult = {
	message: string;
	resendId?: string;
};

export async function submitContactSubmission(
	contactSubmission: FormData,
): Promise<SubmitContactSubmissionResult> {
	const response = await fetch('/api/contact', {
		method: 'POST',
		body: contactSubmission,
	});

	const result = (await response.json().catch(() => ({}))) as Partial<SubmitContactSubmissionResult>;

	if (!response.ok) {
		throw new Error(
			typeof result.message === 'string' ? result.message : 'Something went wrong.',
		);
	}

	return {
		message:
			typeof result.message === 'string'
				? result.message
				: 'Inquiry submitted successfully.',
		resendId: result.resendId,
	};
}