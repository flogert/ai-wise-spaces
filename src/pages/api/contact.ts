import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData();

	const name = String(formData.get('name') || '').trim();
	const email = String(formData.get('email') || '').trim();
	const business = String(formData.get('business') || '').trim();
	const website = String(formData.get('website') || '').trim();
	const message = String(formData.get('message') || '').trim();
	const contactToEmail = import.meta.env.CONTACT_TO_EMAIL?.trim() ?? '';

	if (!contactToEmail || !import.meta.env.RESEND_API_KEY) {
		return Response.json({ message: 'Contact form is not configured yet.' }, { status: 500 });
	}

	const resend = new Resend(import.meta.env.RESEND_API_KEY);

	if (!name || !email || !message) {
		return Response.json({ message: 'Missing required fields.' }, { status: 400 });
	}

	const safeName = escapeHtml(name);
	const safeEmail = escapeHtml(email);
	const safeBusiness = business ? escapeHtml(business) : 'Not provided';
	const safeWebsite = website ? escapeHtml(website) : 'Not provided';
	const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

	const { error } = await resend.emails.send({
		from: 'AI Wise Spaces <contact@stolese.resend.app>',
		to: [contactToEmail],
		subject: `New contact from ${name}`,
		replyTo: email,
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
		return Response.json({ message: 'Email delivery failed.' }, { status: 502 });
	}

	return Response.json({ message: 'Message sent successfully!' });
};

export const GET: APIRoute = async () => {
	return Response.json({ message: 'Method not allowed.' }, { status: 405 });
};