import { Resend } from 'resend';
import type { ContactSubmission } from '../domain/contactSubmission.ts';

type SendLeadNotificationParams = {
	apiKey: string;
	toEmail: string;
	contactSubmission: ContactSubmission;
};

const DEFAULT_CONTACT_FROM_EMAIL = 'contact@aiwisespaces.com';

type SendLeadNotificationResult =
	| {
		ok: true;
		resendId?: string;
	}
	| {
		ok: false;
		message: string;
		error: unknown;
	};

function buildLeadNotificationHtml(contactSubmission: ContactSubmission): string {
	return `
		<h2>New Lead Capture</h2>
		<p><strong>Name:</strong> ${contactSubmission.name}</p>
		<p><strong>Email:</strong> ${contactSubmission.email}</p>
		<p><strong>Business:</strong> ${contactSubmission.business}</p>
		<p><strong>Inquiry:</strong> ${contactSubmission.inquiry}</p>
	`;
}

export async function sendLeadNotification({
	apiKey,
	toEmail,
	contactSubmission,
}: SendLeadNotificationParams): Promise<SendLeadNotificationResult> {
	const resend = new Resend(apiKey);

	const { data, error } = await resend.emails.send({
		from: `AI Wise Spaces <${DEFAULT_CONTACT_FROM_EMAIL}>`,
		to: [toEmail],
		subject: `New AI Wise Spaces lead from ${contactSubmission.name}`,
		replyTo: contactSubmission.email,
		html: buildLeadNotificationHtml(contactSubmission),
	});

	if (error) {
		return {
			ok: false,
			message: 'Email provider rejected the lead notification.',
			error,
		};
	}

	return {
		ok: true,
		resendId: data?.id,
	};
}