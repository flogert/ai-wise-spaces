import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY?.trim() ?? '';
const contactToEmail = process.env.CONTACT_TO_EMAIL?.trim() ?? '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const requiredFields = ['name', 'email', 'business', 'message'];

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

async function readPayload(request: Request): Promise<Record<string, unknown>> {
	const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';

	if (contentType.includes('application/json')) {
		return await request.json();
	}

	if (
		contentType.includes('application/x-www-form-urlencoded')
		|| contentType.includes('multipart/form-data')
	) {
		const formData = await request.formData();
		return Object.fromEntries(formData.entries());
	}

	throw new Error('Unsupported form payload.');
}

export default async function handler(request: Request): Promise<Response> {
	if (request.method !== 'POST') {
		return Response.json({ error: 'Method not allowed.' }, { status: 405 });
	}

	if (!resend || !contactToEmail) {
		return Response.json(
			{ error: 'Contact form is not configured yet. Add RESEND_API_KEY and CONTACT_TO_EMAIL in Vercel.' },
			{ status: 500 },
		);
	}

	let payload: Record<string, unknown>;

	try {
		payload = await readPayload(request);
	} catch {
		return Response.json({ error: 'Invalid form submission.' }, { status: 400 });
	}

	for (const field of requiredFields) {
		const value = payload[field];

		if (typeof value !== 'string' || !value.trim()) {
			return Response.json({ error: 'Please complete all required fields.' }, { status: 400 });
		}
	}

	const normalizedPayload = {
		name: String(payload.name).trim(),
		email: String(payload.email).trim(),
		business: String(payload.business).trim(),
		website: typeof payload.website === 'string' ? payload.website.trim() : '',
		message: String(payload.message).trim(),
	};

	const safeName = escapeHtml(normalizedPayload.name);
	const safeEmail = escapeHtml(normalizedPayload.email);
	const safeBusiness = escapeHtml(normalizedPayload.business);
	const safeWebsite = normalizedPayload.website ? escapeHtml(normalizedPayload.website) : 'Not provided';
	const safeMessage = escapeHtml(normalizedPayload.message).replaceAll('\n', '<br />');

	try {
		const { error } = await resend.emails.send({
			from: 'AI Wise Spaces <contact@stolese.resend.app>',
			to: [contactToEmail],
			subject: `New AI Wise Spaces lead from ${normalizedPayload.name}`,
			replyTo: normalizedPayload.email,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${safeName}</p>
				<p><strong>Email:</strong> ${safeEmail}</p>
				<p><strong>Business:</strong> ${safeBusiness}</p>
				<p><strong>Website:</strong> ${safeWebsite}</p>
				<p><strong>Message:</strong><br />${safeMessage}</p>
			`,
		});

		if (error) {
			return Response.json({ error: 'Email delivery failed.' }, { status: 502 });
		}

		return Response.json({ ok: true });
	} catch {
		return Response.json({ error: 'The contact service is temporarily unavailable.' }, { status: 502 });
	}
}