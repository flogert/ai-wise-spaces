export function missingEmailSettingsResponse(): Response {
	return Response.json(
		{ message: 'Server email settings are missing.' },
		{ status: 500 },
	);
}

export function contactRejectedResponse(message: string): Response {
	return Response.json({ message }, { status: 400 });
}

export function emailRejectedResponse(message: string): Response {
	return Response.json({ message }, { status: 500 });
}

export function inquirySubmittedResponse(resendId?: string): Response {
	return Response.json({
		message: 'Inquiry submitted successfully.',
		resendId,
	});
}

export function contactSubmissionServerErrorResponse(): Response {
	return Response.json(
		{ message: 'Contact submission server error.' },
		{ status: 500 },
	);
}

export function methodNotAllowedResponse(): Response {
	return Response.json({ message: 'Method not allowed.' }, { status: 405 });
}