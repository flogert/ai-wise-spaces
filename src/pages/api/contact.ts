export const prerender = false;
import type { APIRoute } from 'astro';
import {
	createContactSubmission,
	validateContactSubmission,
} from '../../features/contact/domain/contactSubmission.ts';
import {
	contactRejectedResponse,
	contactSubmissionServerErrorResponse,
	emailRejectedResponse,
	inquirySubmittedResponse,
	methodNotAllowedResponse,
	missingEmailSettingsResponse,
} from '../../features/contact/server/contactRouteResponses.ts';
import { sendLeadNotification } from '../../features/contact/server/sendLeadNotification.ts';

export const POST: APIRoute = async ({ request }) => {
	try {
		const apiKey = import.meta.env.RESEND_API_KEY;
		const toEmail = import.meta.env.CONTACT_TO_EMAIL;

		if (!apiKey || !toEmail) {
			console.error('Missing env variables');
			return missingEmailSettingsResponse();
		}

		const formData = await request.formData();
		const contactSubmission = createContactSubmission(formData);
		const validationResult = validateContactSubmission(contactSubmission);

		if (!validationResult.ok) {
			console.error('ContactRejected', {
				reason: validationResult.reason,
				email: contactSubmission.email,
			});
			return contactRejectedResponse(validationResult.message);
		}

		console.log('ContactValidated', {
			email: contactSubmission.email,
			business: contactSubmission.business,
		});
		console.log('EmailQueued', {
			email: contactSubmission.email,
			business: contactSubmission.business,
		});

		const notificationResult = await sendLeadNotification({
			apiKey,
			toEmail,
			contactSubmission: validationResult.contactSubmission,
		});

		if (!notificationResult.ok) {
			console.error('EmailRejected', notificationResult.error);
			return emailRejectedResponse(notificationResult.message);
		}

		console.log('LeadCaptured', {
			email: validationResult.contactSubmission.email,
			business: validationResult.contactSubmission.business,
		});
		console.log('EmailSent', { resendId: notificationResult.resendId });

		return inquirySubmittedResponse(notificationResult.resendId);
	} catch (error) {
		console.error('ContactSubmissionCrashed', error);

		return contactSubmissionServerErrorResponse();
	}
};

export const GET: APIRoute = async () => {
	return methodNotAllowedResponse();
};