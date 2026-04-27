const form = document.querySelector('#contact-form');
const statusMessage = document.querySelector('#form-status');
const submitButton = form instanceof HTMLFormElement ? form.querySelector('button[type="submit"]') : null;

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