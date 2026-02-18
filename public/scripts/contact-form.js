const form = document.querySelector('#contact-form');
const statusMessage = document.querySelector('#form-status');
const submitButton = form instanceof HTMLFormElement ? form.querySelector('button[type="submit"]') : null;

if (form instanceof HTMLFormElement) {
	const searchParams = new URLSearchParams(window.location.search);
	const website = searchParams.get('website') || '';
	const score = searchParams.get('score') || '';
	const issue = searchParams.get('issue') || '';
	const source = searchParams.get('source') || '';

	const websiteInput = form.querySelector('input[name="website"]');
	const messageInput = form.querySelector('textarea[name="message"]');

	if (websiteInput instanceof HTMLInputElement && website && !websiteInput.value) {
		websiteInput.value = website;
	}

	if (messageInput instanceof HTMLTextAreaElement && source === 'quick-preview' && !messageInput.value) {
		messageInput.value = [
			'I came from the quick AI visibility preview.',
			score ? `Preview score: ${score}/100` : '',
			website ? `Website: ${website}` : '',
			issue ? `Top issue surfaced: ${issue}` : '',
			'',
			'Please send me the simple improvement notes first.',
		]
			.filter(Boolean)
			.join('\n');
	}
}

form?.addEventListener('submit', async (event) => {
	event.preventDefault();

	if (!(form instanceof HTMLFormElement) || !(statusMessage instanceof HTMLElement)) {
		return;
	}

	statusMessage.textContent = '';

	if (submitButton instanceof HTMLButtonElement) {
		submitButton.disabled = true;
	}

	try {
		const response = await fetch('/api/contact', {
			method: 'POST',
			body: new FormData(form),
		});

		const result = await response.json().catch(() => ({}));
		if (!response.ok) {
			throw new Error(typeof result.message === 'string' ? result.message : 'Something went wrong.');
		}

		statusMessage.textContent = 'Inquiry sent.';
		form.reset();
	} catch (error) {
		console.error(error);
		statusMessage.textContent = 'Inquiry not sent.';
	} finally {
		if (submitButton instanceof HTMLButtonElement) {
			submitButton.disabled = false;
		}
	}
});