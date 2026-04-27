export const prerender = false;
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
	try {
		const apiKey = import.meta.env.RESEND_API_KEY;
		const toEmail = import.meta.env.CONTACT_TO_EMAIL;

		if (!apiKey || !toEmail) {
			console.error('Missing env variables');
			return Response.json(
				{ message: 'Server email settings are missing.' },
				{ status: 500 },
			);
		}

		const resend = new Resend(apiKey);
		const formData = await request.formData();

		const name = String(formData.get('name') || '').trim();
		const email = String(formData.get('email') || '').trim();
		const business = String(formData.get('business') || '').trim();
		const message = String(formData.get('message') || '').trim();

		if (!name || !email || !message) {
			return Response.json(
				{ message: 'Please fill out name, email, and message.' },
				{ status: 400 },
			);
		}

		const result = await resend.emails.send({
			from: 'AI Wise Spaces <contact@stolese.resend.app>',
			to: [toEmail],
			subject: `New AI Wise Spaces lead from ${name}`,
			replyTo: email,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Business:</strong> ${business}</p>
				<p><strong>Message:</strong> ${message}</p>
			`,
		});

		console.log('Resend result:', result);

		return Response.json({ message: 'Message sent successfully.' });
	} catch (error) {
		console.error('Contact API crashed:', error);

		return Response.json(
			{ message: 'Contact form server error.' },
			{ status: 500 },
		);
	}
};

export const GET: APIRoute = async () => {
	return Response.json({ message: 'Method not allowed.' }, { status: 405 });
};