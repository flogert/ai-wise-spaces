import { submitContactSubmission } from './submitContactSubmission.ts';

export function enhanceContactForm(): void {
	const form = document.querySelector('#contact-form');
	const status = document.querySelector('#form-status');
	const submitButton = form instanceof HTMLFormElement ? form.querySelector('button[type="submit"]') : null;

	form?.addEventListener('submit', async (event) => {
		event.preventDefault();

		if (!(form instanceof HTMLFormElement) || !(status instanceof HTMLElement)) {
			return;
		}

		status.textContent = '';

		if (submitButton instanceof HTMLButtonElement) {
			submitButton.disabled = true;
		}

		try {
			await submitContactSubmission(new FormData(form));
			status.textContent = 'Inquiry sent.';
			form.reset();
		} catch (error) {
			console.error(error);
			status.textContent = 'Inquiry not sent.';
		} finally {
			if (submitButton instanceof HTMLButtonElement) {
				submitButton.disabled = false;
			}
		}
	});
}