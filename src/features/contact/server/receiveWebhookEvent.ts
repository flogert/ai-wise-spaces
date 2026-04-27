type WebhookEventSummary = {
	event: unknown;
	email: unknown;
};

export async function receiveWebhookEvent(request: Request): Promise<WebhookEventSummary> {
	const payload = await request.json();

	console.log('Webhook received:', payload);

	const event = payload.type;
	const email = payload.data?.to;

	console.log('Event:', event, 'Email:', email);

	return {
		event,
		email,
	};
}